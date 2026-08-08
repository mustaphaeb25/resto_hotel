import prisma, { Prisma } from '../../config/database.js';
import { AppError } from '../../middleware/errorHandler.js';
import { parseUuidId } from '../../utils/ids.js';
import { getPagination } from '../../utils/pagination.js';
import { RESERVATION_STATUSES } from '../../validators/reservation.validator.js';

const DAY_MS = 1000 * 60 * 60 * 24;
const ACTIVE_STATUSES = ['PENDING', 'CONFIRMED'];

export async function create(req, res) {
  const { roomId, guestName, guestPhone, guestEmail, checkIn, checkOut, guests, specialRequests } = req.validatedBody;

  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) throw new AppError('Room not found', 404);
  if (guests > room.maxGuests) {
    throw new AppError(`Max ${room.maxGuests} guests allowed for this room`, 400);
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (checkInDate < today) {
    throw new AppError('Check-in date cannot be in the past', 400);
  }
  if (checkInDate >= checkOutDate) {
    throw new AppError('Check-out must be after check-in', 400);
  }

  const days = Math.ceil((checkOutDate - checkInDate) / DAY_MS);
  const totalPrice = days * room.price;

  let reservation;
  try {
    reservation = await prisma.$transaction(
      async (tx) => {
        const overlap = await tx.roomReservation.findFirst({
          where: {
            roomId,
            status: { in: ACTIVE_STATUSES },
            checkIn: { lt: checkOutDate },
            checkOut: { gt: checkInDate },
          },
        });
        if (overlap) {
          throw new AppError('This room is already booked for the selected dates', 409);
        }

        return tx.roomReservation.create({
          data: {
            userId: req.user?.id,
            guestName,
            guestPhone: guestPhone || null,
            guestEmail: guestEmail || null,
            roomId,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests,
            totalPrice,
            specialRequests,
          },
          include: { room: true },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: 5000, timeout: 10000 },
    );
  } catch (error) {
    if (error.code === 'P2034') {
      throw new AppError('This room is already booked for the selected dates', 409);
    }
    throw error;
  }

  res.status(201).json(reservation);
}

export async function getMyReservations(req, res) {
  const reservations = await prisma.roomReservation.findMany({
    where: { userId: req.user.id },
    include: { room: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(reservations);
}

export async function getById(req, res) {
  const id = parseUuidId(req.params.id, 'Reservation');
  const reservation = await prisma.roomReservation.findUnique({
    where: { id },
    include: { room: true },
  });
  if (!reservation) throw new AppError('Reservation not found', 404);
  if (reservation.userId !== req.user.id && req.user.role !== 'ADMIN') {
    throw new AppError('Not authorized', 403);
  }
  res.json(reservation);
}

export async function update(req, res) {
  const id = parseUuidId(req.params.id, 'Reservation');
  const reservation = await prisma.roomReservation.findUnique({
    where: { id },
  });
  if (!reservation) throw new AppError('Reservation not found', 404);
  if (reservation.userId !== req.user.id && req.user.role !== 'ADMIN') {
    throw new AppError('Not authorized', 403);
  }

  const { status, checkIn, checkOut, guests } = req.validatedBody;
  const isAdmin = req.user.role === 'ADMIN';
  const data = {};

  if (status !== undefined) {
    if (!isAdmin) throw new AppError('Only admins can change reservation status', 403);
    if (!RESERVATION_STATUSES.includes(status)) throw new AppError('Invalid status', 400);
    data.status = status;
  }
  if (checkIn !== undefined) data.checkIn = new Date(checkIn);
  if (checkOut !== undefined) data.checkOut = new Date(checkOut);
  if (guests !== undefined) {
    const room = await prisma.room.findUnique({ where: { id: reservation.roomId } });
    if (guests > room.maxGuests) throw new AppError(`Max ${room.maxGuests} guests allowed for this room`, 400);
    data.guests = guests;
  }

  if (data.checkIn || data.checkOut) {
    const ci = data.checkIn || reservation.checkIn;
    const co = data.checkOut || reservation.checkOut;
    if (ci >= co) throw new AppError('Check-out must be after check-in', 400);
    const room = await prisma.room.findUnique({ where: { id: reservation.roomId } });
    const days = Math.ceil((co - ci) / DAY_MS);
    data.totalPrice = days * room.price;
  }

  const updated = await prisma.roomReservation.update({
    where: { id },
    data,
    include: { room: true },
  });
  res.json(updated);
}

export async function getAllAdmin(req, res) {
  const { page, limit, skip, take } = getPagination(req.query);
  const where = {};
  const [reservations, total] = await Promise.all([
    prisma.roomReservation.findMany({
      where,
      include: { room: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.roomReservation.count({ where }),
  ]);
  res.json({ page, limit, total, data: reservations });
}

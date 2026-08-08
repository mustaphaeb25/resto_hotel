import prisma from '../../config/database.js';
import { AppError } from '../../middleware/errorHandler.js';
import { parseUuidId } from '../../utils/ids.js';
import { getPagination } from '../../utils/pagination.js';
import { parseLocalDate } from '../../utils/date.js';
import { RESERVATION_STATUSES } from '../../validators/reservation.validator.js';

const VALID_TIMES = {
  Breakfast: ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'],
  Lunch: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'],
  Dinner: ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'],
};
const ALL_VALID_TIMES = [...VALID_TIMES.Breakfast, ...VALID_TIMES.Lunch, ...VALID_TIMES.Dinner];

export async function create(req, res) {
  const { name, phone, date, time, guests, seating } = req.validatedBody;

  const normalizedTime = time.toUpperCase();
  if (!ALL_VALID_TIMES.includes(normalizedTime)) {
    throw new AppError('Invalid reservation time', 400);
  }

  const reservationDate = parseLocalDate(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (reservationDate < today) {
    throw new AppError('Reservation date cannot be in the past', 400);
  }

  const reservation = await prisma.diningReservation.create({
    data: {
      userId: req.user?.id,
      name,
      phone,
      date: reservationDate,
      time: normalizedTime,
      guests,
      seating,
    },
  });

  res.status(201).json(reservation);
}

export async function getMyReservations(req, res) {
  const reservations = await prisma.diningReservation.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
  });
  res.json(reservations);
}

export async function update(req, res) {
  const id = parseUuidId(req.params.id, 'Reservation');
  const reservation = await prisma.diningReservation.findUnique({
    where: { id },
  });
  if (!reservation) throw new AppError('Reservation not found', 404);
  if (reservation.userId !== req.user.id && req.user.role !== 'ADMIN') {
    throw new AppError('Not authorized', 403);
  }

  const { status, date, time, guests } = req.validatedBody;
  const isAdmin = req.user.role === 'ADMIN';
  const data = {};

  if (status !== undefined) {
    if (!isAdmin) throw new AppError('Only admins can change reservation status', 403);
    if (!RESERVATION_STATUSES.includes(status)) throw new AppError('Invalid status', 400);
    data.status = status;
  }
  if (date !== undefined) data.date = parseLocalDate(date);
  if (time !== undefined) {
    const normalizedTime = time.toUpperCase();
    if (!ALL_VALID_TIMES.includes(normalizedTime)) {
      throw new AppError('Invalid reservation time', 400);
    }
    data.time = normalizedTime;
  }
  if (guests !== undefined) data.guests = guests;

  const updated = await prisma.diningReservation.update({
    where: { id },
    data,
  });
  res.json(updated);
}

export async function getAllAdmin(req, res) {
  const { page, limit, skip, take } = getPagination(req.query);
  const where = {};
  const [reservations, total] = await Promise.all([
    prisma.diningReservation.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.diningReservation.count({ where }),
  ]);
  res.json({ page, limit, total, data: reservations });
}

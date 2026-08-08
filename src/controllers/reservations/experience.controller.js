import prisma from '../../config/database.js';
import { AppError } from '../../middleware/errorHandler.js';
import { parseUuidId } from '../../utils/ids.js';
import { getPagination } from '../../utils/pagination.js';
import { RESERVATION_STATUSES } from '../../validators/reservation.validator.js';

export async function create(req, res) {
  const { experienceId, name, email, phone, date, guests } = req.validatedBody;

  const experience = await prisma.experience.findUnique({ where: { id: experienceId } });
  if (!experience) throw new AppError('Experience not found', 404);

  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (bookingDate < today) {
    throw new AppError('Booking date cannot be in the past', 400);
  }

  const totalPrice = experience.price * guests;

  const booking = await prisma.experienceBooking.create({
    data: {
      userId: req.user?.id,
      name,
      email,
      phone,
      experienceId,
      date: bookingDate,
      guests,
      totalPrice,
    },
    include: { experience: true },
  });

  res.status(201).json(booking);
}

export async function getMyBookings(req, res) {
  const bookings = await prisma.experienceBooking.findMany({
    where: { userId: req.user.id },
    include: { experience: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(bookings);
}

export async function update(req, res) {
  const id = parseUuidId(req.params.id, 'Booking');
  const booking = await prisma.experienceBooking.findUnique({
    where: { id },
  });
  if (!booking) throw new AppError('Booking not found', 404);
  if (booking.userId !== req.user.id && req.user.role !== 'ADMIN') {
    throw new AppError('Not authorized', 403);
  }

  const { status, date, guests } = req.validatedBody;
  const isAdmin = req.user.role === 'ADMIN';
  const data = {};

  if (status !== undefined) {
    if (!isAdmin) throw new AppError('Only admins can change booking status', 403);
    if (!RESERVATION_STATUSES.includes(status)) throw new AppError('Invalid status', 400);
    data.status = status;
  }
  if (date !== undefined) data.date = new Date(date);
  if (guests !== undefined) {
    const experience = await prisma.experience.findUnique({ where: { id: booking.experienceId } });
    data.guests = guests;
    data.totalPrice = experience.price * guests;
  }

  const updated = await prisma.experienceBooking.update({
    where: { id },
    data,
    include: { experience: true },
  });
  res.json(updated);
}

export async function getAllAdmin(req, res) {
  const { page, limit, skip, take } = getPagination(req.query);
  const where = {};
  const [bookings, total] = await Promise.all([
    prisma.experienceBooking.findMany({
      where,
      include: { experience: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.experienceBooking.count({ where }),
  ]);
  res.json({ page, limit, total, data: bookings });
}

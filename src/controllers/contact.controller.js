import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { parseUuidId } from '../utils/ids.js';
import { getPagination } from '../utils/pagination.js';

export async function submit(req, res) {
  const inquiry = await prisma.contactInquiry.create({
    data: req.validatedBody,
  });
  res.status(201).json({ message: 'Thank you for your message! We will get back to you within 24 hours.' });
}

export async function listAll(req, res) {
  const { page, limit, skip, take } = getPagination(req.query);
  const where = {};
  const [inquiries, total] = await Promise.all([
    prisma.contactInquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.contactInquiry.count({ where }),
  ]);
  res.json({ page, limit, total, data: inquiries });
}

export async function markAsRead(req, res) {
  const id = parseUuidId(req.params.id, 'Inquiry');
  const inquiry = await prisma.contactInquiry.update({
    where: { id },
    data: { isRead: true },
  });
  res.json(inquiry);
}

export async function remove(req, res) {
  const id = parseUuidId(req.params.id, 'Inquiry');
  const inquiry = await prisma.contactInquiry.findUnique({
    where: { id },
  });
  if (!inquiry) throw new AppError('Inquiry not found', 404);

  await prisma.contactInquiry.delete({ where: { id } });
  res.status(204).end();
}

import prisma from '../config/database.js';
import { getPagination } from '../utils/pagination.js';

export async function subscribe(req, res) {
  const { email } = req.validatedBody;

  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (existing) {
    if (!existing.subscribed) {
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { subscribed: true },
      });
    }
    return res.json({ message: 'You are already subscribed!' });
  }

  await prisma.newsletterSubscriber.create({ data: { email } });
  res.status(201).json({ message: 'Thank you for subscribing to our newsletter!' });
}

export async function listAll(req, res) {
  const { page, limit, skip, take } = getPagination(req.query);
  const where = {};
  const [subscribers, total] = await Promise.all([
    prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.newsletterSubscriber.count({ where }),
  ]);
  res.json({ page, limit, total, data: subscribers });
}

export async function unsubscribe(req, res) {
  const { email } = req.validatedBody;

  await prisma.newsletterSubscriber.updateMany({
    where: { email },
    data: { subscribed: false },
  });

  res.json({ message: 'You have been unsubscribed.' });
}

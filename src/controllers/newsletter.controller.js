import prisma from '../config/database.js';

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
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(subscribers);
}

export async function unsubscribe(req, res) {
  const { email } = req.validatedBody;

  await prisma.newsletterSubscriber.updateMany({
    where: { email },
    data: { subscribed: false },
  });

  res.json({ message: 'You have been unsubscribed.' });
}

import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

const TARGET_MODELS = {
  DISH: prisma.menuItem,
  ROOM: prisma.room,
  EXPERIENCE: prisma.experience,
};

const TARGETS = ['DISH', 'ROOM', 'EXPERIENCE'];

export async function create(req, res) {
  const { target, itemId, rating, comment } = req.validatedBody;

  const model = TARGET_MODELS[target];
  const item = await model.findUnique({ where: { id: itemId } });
  if (!item) throw new AppError('Item not found', 404);

  const review = await prisma.review.upsert({
    where: { target_itemId_userId: { target, itemId, userId: req.user.id } },
    create: {
      target,
      itemId,
      rating,
      comment: comment || null,
      userId: req.user.id,
    },
    update: { rating, comment: comment || null },
  });

  res.status(201).json(review);
}

export async function list(req, res) {
  const target = String(req.params.target).toUpperCase();
  const itemId = parseInt(req.params.itemId, 10);

  if (!TARGETS.includes(target)) throw new AppError('Invalid review target', 400);
  if (!itemId) throw new AppError('Invalid item id', 400);

  const reviews = await prisma.review.findMany({
    where: { target, itemId },
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true } } },
  });

  const count = reviews.length;
  const average = count ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  res.json({
    average: Math.round(average * 10) / 10,
    count,
    reviews: reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      name: r.user?.name || 'Guest',
      createdAt: r.createdAt,
    })),
  });
}

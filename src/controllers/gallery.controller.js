import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { parseIntId } from '../utils/ids.js';

export async function list(req, res) {
  const { category } = req.query;
  const where = category && category !== 'all' ? { category } : {};
  const items = await prisma.galleryItem.findMany({ where, orderBy: { id: 'asc' } });
  res.json(items);
}

export async function create(req, res) {
  const galleryItem = await prisma.galleryItem.create({ data: req.validatedBody });
  res.status(201).json(galleryItem);
}

export async function update(req, res) {
  const id = parseIntId(req.params.id, 'Gallery item');
  const existing = await prisma.galleryItem.findUnique({ where: { id } });
  if (!existing) throw new AppError('Gallery item not found', 404);
  const galleryItem = await prisma.galleryItem.update({ where: { id }, data: req.validatedBody });
  res.json(galleryItem);
}

export async function remove(req, res) {
  const id = parseIntId(req.params.id, 'Gallery item');
  const existing = await prisma.galleryItem.findUnique({ where: { id } });
  if (!existing) throw new AppError('Gallery item not found', 404);
  await prisma.galleryItem.delete({ where: { id } });
  res.status(204).end();
}

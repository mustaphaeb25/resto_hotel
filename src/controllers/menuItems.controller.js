import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { parseIntId } from '../utils/ids.js';

export async function list(req, res) {
  const { category } = req.query;
  const where = category && category !== 'all' ? { category } : {};
  const items = await prisma.menuItem.findMany({ where, orderBy: { id: 'asc' } });
  res.json(items);
}

export async function getById(req, res) {
  const id = parseIntId(req.params.id, 'Menu item');
  const item = await prisma.menuItem.findUnique({ where: { id } });
  if (!item) throw new AppError('Menu item not found', 404);
  res.json(item);
}

export async function create(req, res) {
  const item = await prisma.menuItem.create({ data: req.validatedBody });
  res.status(201).json(item);
}

export async function update(req, res) {
  const id = parseIntId(req.params.id, 'Menu item');
  const item = await prisma.menuItem.update({ where: { id }, data: req.validatedBody });
  res.json(item);
}

export async function remove(req, res) {
  const id = parseIntId(req.params.id, 'Menu item');
  await prisma.menuItem.delete({ where: { id } });
  res.status(204).end();
}

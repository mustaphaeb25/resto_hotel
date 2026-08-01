import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { parseIntId } from '../utils/ids.js';

export async function list(req, res) {
  const { category } = req.query;
  const where = category && category !== 'all' ? { category } : {};
  const experiences = await prisma.experience.findMany({ where, orderBy: { id: 'asc' } });
  res.json(experiences);
}

export async function getById(req, res) {
  const id = parseIntId(req.params.id, 'Experience');
  const experience = await prisma.experience.findUnique({ where: { id } });
  if (!experience) throw new AppError('Experience not found', 404);
  res.json(experience);
}

export async function create(req, res) {
  const experience = await prisma.experience.create({ data: req.validatedBody });
  res.status(201).json(experience);
}

export async function update(req, res) {
  const id = parseIntId(req.params.id, 'Experience');
  const experience = await prisma.experience.update({ where: { id }, data: req.validatedBody });
  res.json(experience);
}

export async function remove(req, res) {
  const id = parseIntId(req.params.id, 'Experience');
  await prisma.experience.delete({ where: { id } });
  res.status(204).end();
}

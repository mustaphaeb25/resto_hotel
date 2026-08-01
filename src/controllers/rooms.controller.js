import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { parseIntId } from '../utils/ids.js';

export async function list(req, res) {
  const { category } = req.query;
  const where = category && category !== 'all' ? { category } : {};
  const rooms = await prisma.room.findMany({ where, orderBy: { id: 'asc' } });
  res.json(rooms);
}

export async function getById(req, res) {
  const id = parseIntId(req.params.id, 'Room');
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) throw new AppError('Room not found', 404);
  res.json(room);
}

export async function create(req, res) {
  const room = await prisma.room.create({ data: req.validatedBody });
  res.status(201).json(room);
}

export async function update(req, res) {
  const id = parseIntId(req.params.id, 'Room');
  const room = await prisma.room.update({ where: { id }, data: req.validatedBody });
  res.json(room);
}

export async function remove(req, res) {
  const id = parseIntId(req.params.id, 'Room');
  await prisma.room.delete({ where: { id } });
  res.status(204).end();
}

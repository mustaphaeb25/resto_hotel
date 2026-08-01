import prisma from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';
import { AppError } from '../middleware/errorHandler.js';

export async function register(req, res) {
  const { name, email, password, phone } = req.validatedBody;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError('Unable to create account. Please check your information and try again.', 400);
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, phone },
    select: { id: true, name: true, email: true, phone: true, role: true },
  });

  const token = signToken({ id: user.id, role: user.role });

  res.status(201).json({ user, token });
}

export async function login(req, res) {
  const { email, password } = req.validatedBody;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signToken({ id: user.id, role: user.role });

  res.json({
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    token,
  });
}

export async function getMe(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json(user);
}

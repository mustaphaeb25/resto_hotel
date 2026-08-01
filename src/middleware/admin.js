import { AppError } from './errorHandler.js';

export function requireAdmin(req, _res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    throw new AppError('Admin access required', 403);
  }
  next();
}

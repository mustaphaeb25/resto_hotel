import { verifyToken } from '../utils/jwt.js';
import { AppError } from './errorHandler.js';

export function authenticate(req, _res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new AppError('Authentication required', 401);
  }

  const token = header.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    throw new AppError('Invalid or expired token', 401);
  }
}

export function optionalAuth(req, _res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    const token = header.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
    } catch {
      // ignore invalid tokens for optional auth
    }
  }
  next();
}

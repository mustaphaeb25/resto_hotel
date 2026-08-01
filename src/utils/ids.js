import { AppError } from '../middleware/errorHandler.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function parseIntId(raw, label = 'Resource') {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(`${label} not found`, 404);
  }
  return id;
}

export function parseUuidId(raw, label = 'Resource') {
  if (typeof raw !== 'string' || !UUID_RE.test(raw)) {
    throw new AppError(`${label} not found`, 404);
  }
  return raw;
}

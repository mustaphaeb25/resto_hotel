import fs from 'fs/promises';
import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { getPagination } from '../utils/pagination.js';
import { verifyImageSignature } from '../utils/fileType.js';

export async function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename, originalname, mimetype, size } = req.file;

  const validSignature = await verifyImageSignature(req.file.path, mimetype);
  if (!validSignature) {
    await fs.unlink(req.file.path).catch(() => {});
    throw new AppError('File content does not match its image type', 400);
  }

  const url = `/uploads/${filename}`;

  const upload = await prisma.upload.create({
    data: { filename, originalName: originalname, mimeType: mimetype, size, url },
  });

  res.status(201).json(upload);
}

export async function listAll(req, res) {
  const { page, limit, skip, take } = getPagination(req.query);
  const where = {};
  const [uploads, total] = await Promise.all([
    prisma.upload.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.upload.count({ where }),
  ]);
  res.json({ page, limit, total, data: uploads });
}

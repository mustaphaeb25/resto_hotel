import fs from 'fs/promises';
import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
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
  const uploads = await prisma.upload.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(uploads);
}

import fs from 'fs/promises';

const DETECTORS = {
  'image/jpeg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  'image/png': (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  'image/webp': (b) =>
    b.slice(0, 4).toString('latin1') === 'RIFF' && b.slice(8, 12).toString('latin1') === 'WEBP',
  'image/avif': (b) =>
    b.slice(4, 8).toString('latin1') === 'ftyp' &&
    ['avif', 'avis'].includes(b.slice(8, 12).toString('latin1')),
};

const EXT_TO_MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
};

export const ALLOWED_EXTENSIONS = Object.keys(EXT_TO_MIME);

export function mimeForExtension(ext) {
  return EXT_TO_MIME[ext] || null;
}

export async function verifyImageSignature(filePath, declaredMime) {
  const detect = DETECTORS[declaredMime];
  if (!detect) return false;

  const fd = await fs.open(filePath, 'r');
  try {
    const buffer = Buffer.alloc(12);
    const { bytesRead } = await fd.read(buffer, 0, 12, 0);
    return detect(buffer.subarray(0, bytesRead));
  } finally {
    await fd.close();
  }
}

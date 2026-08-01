import { Router } from 'express';
import { uploadFile, listAll } from '../controllers/uploads.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', authenticate, requireAdmin, listAll);
router.post('/', authenticate, requireAdmin, upload.single('image'), uploadFile);

export default router;

import { Router } from 'express';
import { list, create, update, remove } from '../controllers/gallery.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';
import { galleryItemSchema, galleryItemUpdateSchema } from '../validators/content.validator.js';

const router = Router();

router.get('/', list);
router.post('/', authenticate, requireAdmin, validate(galleryItemSchema), create);
router.put('/:id', authenticate, requireAdmin, validate(galleryItemUpdateSchema), update);
router.delete('/:id', authenticate, requireAdmin, remove);

export default router;

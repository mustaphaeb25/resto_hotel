import { Router } from 'express';
import { submit, listAll, markAsRead, remove } from '../controllers/contact.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';
import { contactSchema } from '../validators/contact.validator.js';

const router = Router();

router.post('/', validate(contactSchema), submit);
router.get('/', authenticate, requireAdmin, listAll);
router.put('/:id/read', authenticate, requireAdmin, markAsRead);
router.delete('/:id', authenticate, requireAdmin, remove);

export default router;

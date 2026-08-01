import { Router } from 'express';
import { list, getById, create, update, remove } from '../controllers/experiences.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';
import { experienceSchema, experienceUpdateSchema } from '../validators/content.validator.js';

const router = Router();

router.get('/', list);
router.get('/:id', getById);
router.post('/', authenticate, requireAdmin, validate(experienceSchema), create);
router.put('/:id', authenticate, requireAdmin, validate(experienceUpdateSchema), update);
router.delete('/:id', authenticate, requireAdmin, remove);

export default router;

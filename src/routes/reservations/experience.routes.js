import { Router } from 'express';
import { create, getMyBookings, update, getAllAdmin } from '../../controllers/reservations/experience.controller.js';
import { authenticate, optionalAuth } from '../../middleware/auth.js';
import { requireAdmin } from '../../middleware/admin.js';
import { validate } from '../../middleware/validate.js';
import { experienceBookingSchema, experienceBookingUpdateSchema } from '../../validators/reservation.validator.js';

const router = Router();

router.post('/', authenticate, validate(experienceBookingSchema), create);
router.get('/', authenticate, getMyBookings);
router.get('/admin/all', authenticate, requireAdmin, getAllAdmin);
router.put('/:id', authenticate, validate(experienceBookingUpdateSchema), update);

export default router;

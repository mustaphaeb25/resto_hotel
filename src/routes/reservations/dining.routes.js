import { Router } from 'express';
import { create, getMyReservations, update, getAllAdmin } from '../../controllers/reservations/dining.controller.js';
import { authenticate, optionalAuth } from '../../middleware/auth.js';
import { requireAdmin } from '../../middleware/admin.js';
import { validate } from '../../middleware/validate.js';
import { diningReservationSchema, diningReservationUpdateSchema } from '../../validators/reservation.validator.js';

const router = Router();

router.post('/', optionalAuth, validate(diningReservationSchema), create);
router.get('/', authenticate, getMyReservations);
router.get('/admin/all', authenticate, requireAdmin, getAllAdmin);
router.put('/:id', authenticate, validate(diningReservationUpdateSchema), update);

export default router;

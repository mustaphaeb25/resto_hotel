import { Router } from 'express';
import { create, getMyReservations, getById, update, getAllAdmin } from '../../controllers/reservations/room.controller.js';
import { authenticate, optionalAuth } from '../../middleware/auth.js';
import { requireAdmin } from '../../middleware/admin.js';
import { validate } from '../../middleware/validate.js';
import { roomReservationSchema, roomReservationUpdateSchema } from '../../validators/reservation.validator.js';

const router = Router();

router.post('/', optionalAuth, validate(roomReservationSchema), create);
router.get('/', authenticate, getMyReservations);
router.get('/admin/all', authenticate, requireAdmin, getAllAdmin);
router.get('/:id', authenticate, getById);
router.put('/:id', authenticate, validate(roomReservationUpdateSchema), update);

export default router;

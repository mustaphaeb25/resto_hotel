import { Router } from 'express';
import { create, list } from '../controllers/reviews.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { reviewSchema } from '../validators/review.validator.js';

const router = Router();

router.post('/', authenticate, validate(reviewSchema), create);
router.get('/:target/:itemId', list);

export default router;

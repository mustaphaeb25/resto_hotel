import { Router } from 'express';
import { create, list } from '../controllers/reviews.controller.js';
import { optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { reviewSchema } from '../validators/review.validator.js';

const router = Router();

router.post('/', optionalAuth, validate(reviewSchema), create);
router.get('/:target/:itemId', list);

export default router;

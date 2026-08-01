import { Router } from 'express';
import { subscribe, unsubscribe, listAll } from '../controllers/newsletter.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';
import { newsletterSchema } from '../validators/contact.validator.js';

const router = Router();

router.post('/subscribe', validate(newsletterSchema), subscribe);
router.post('/unsubscribe', validate(newsletterSchema), unsubscribe);
router.get('/subscribers', authenticate, requireAdmin, listAll);

export default router;

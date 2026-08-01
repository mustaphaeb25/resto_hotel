import { Router } from 'express';
import { dashboard } from '../controllers/admin.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.get('/dashboard', authenticate, requireAdmin, dashboard);

export default router;

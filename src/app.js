import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter, authLimiter, writeLimiter } from './middleware/rateLimit.js';

import authRoutes from './routes/auth.routes.js';
import roomsRoutes from './routes/rooms.routes.js';
import menuItemsRoutes from './routes/menuItems.routes.js';
import experiencesRoutes from './routes/experiences.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import roomReservationRoutes from './routes/reservations/room.routes.js';
import diningReservationRoutes from './routes/reservations/dining.routes.js';
import experienceBookingRoutes from './routes/reservations/experience.routes.js';
import contactRoutes from './routes/contact.routes.js';
import newsletterRoutes from './routes/newsletter.routes.js';
import uploadsRoutes from './routes/uploads.routes.js';
import adminRoutes from './routes/admin.routes.js';
import reviewsRoutes from './routes/reviews.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('trust proxy', env.trustProxy);

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);
app.use('/api/reviews', writeLimiter);
app.use('/api/contact', writeLimiter);
app.use('/api/newsletter', writeLimiter);
app.use('/api/reservations', writeLimiter);
app.use('/api/uploads', writeLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/menu-items', menuItemsRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reservations/room', roomReservationRoutes);
app.use('/api/reservations/dining', diningReservationRoutes);
app.use('/api/reservations/experience', experienceBookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewsRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;

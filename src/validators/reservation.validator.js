import { z } from 'zod';

export const RESERVATION_STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];

const validDate = (val) => !isNaN(Date.parse(val));

export const roomReservationSchema = z.object({
  roomId: z.number().int().positive(),
  guestName: z.string().min(2, 'Name is required'),
  guestPhone: z.string().optional(),
  guestEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  checkIn: z.string().refine(validDate, 'Invalid check-in date'),
  checkOut: z.string().refine(validDate, 'Invalid check-out date'),
  guests: z.number().int().positive().max(10),
  specialRequests: z.string().optional(),
});

export const roomReservationUpdateSchema = z.object({
  status: z.enum(RESERVATION_STATUSES, 'Invalid status').optional(),
  checkIn: z.string().refine(validDate, 'Invalid check-in date').optional(),
  checkOut: z.string().refine(validDate, 'Invalid check-out date').optional(),
  guests: z.number().int().positive().max(10).optional(),
});

export const diningReservationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(6, 'Valid phone number is required'),
  date: z.string().refine(validDate, 'Invalid date'),
  time: z.string().regex(/^\d{1,2}:\d{2}\s*(AM|PM)$/i, 'Invalid time format (e.g. 7:00 PM)'),
  guests: z.number().int().positive().max(20),
  seating: z.enum(['Indoor', 'Outdoor', 'Rooftop', 'Private']),
});

export const diningReservationUpdateSchema = z.object({
  status: z.enum(RESERVATION_STATUSES, 'Invalid status').optional(),
  date: z.string().refine(validDate, 'Invalid date').optional(),
  time: z.string().regex(/^\d{1,2}:\d{2}\s*(AM|PM)$/i, 'Invalid time format (e.g. 7:00 PM)').optional(),
  guests: z.number().int().positive().max(20).optional(),
});

export const experienceBookingSchema = z.object({
  experienceId: z.number().int().positive(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6, 'Valid phone number is required'),
  date: z.string().refine(validDate, 'Invalid date'),
  guests: z.number().int().positive().max(20),
});

export const experienceBookingUpdateSchema = z.object({
  status: z.enum(RESERVATION_STATUSES, 'Invalid status').optional(),
  date: z.string().refine(validDate, 'Invalid date').optional(),
  guests: z.number().int().positive().max(20).optional(),
});

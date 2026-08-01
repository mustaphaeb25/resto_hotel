import { z } from 'zod';

const email = z.string().email('Invalid email address').transform((e) => e.toLowerCase());

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email,
  phone: z.string().max(30).optional(),
  subject: z.string().min(2, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export const newsletterSchema = z.object({
  email,
});

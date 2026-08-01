import { z } from 'zod';

const email = z.string().email('Invalid email address').transform((e) => e.toLowerCase());

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email,
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});

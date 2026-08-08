import { z } from 'zod';

const email = z.string().email('Invalid email address').transform((e) => e.toLowerCase());

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email,
  password: z
    .string()
    .min(10, 'Password must be at least 10 characters')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});

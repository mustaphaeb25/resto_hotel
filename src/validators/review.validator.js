import { z } from 'zod';

export const reviewSchema = z.object({
  target: z.enum(['DISH', 'ROOM', 'EXPERIENCE'], 'Invalid review target'),
  itemId: z.number().int().positive('Invalid item id'),
  rating: z.number().int().min(1, 'Rating must be between 1 and 5').max(5, 'Rating must be between 1 and 5'),
  comment: z.string().max(500, 'Comment is too long (max 500 characters)').optional(),
});

import { z } from 'zod';

const positivePrice = z.number().positive('Price must be positive').finite('Price must be a number');

export const roomSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  category: z.string().min(1, 'Category is required').max(50),
  badge: z.string().max(50).optional(),
  price: positivePrice,
  size: z.string().min(1, 'Size is required'),
  bed: z.string().min(1, 'Bed is required'),
  maxGuests: z.number().int().positive().max(20),
  description: z.string().min(1, 'Description is required'),
  features: z.array(z.string()).max(50),
  image: z.string().min(1, 'Image is required'),
});

export const roomUpdateSchema = roomSchema.partial();

export const menuItemSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  price: positivePrice,
  category: z.string().min(1, 'Category is required').max(50),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'Image is required'),
  tags: z.any().optional(),
});

export const menuItemUpdateSchema = menuItemSchema.partial();

export const experienceSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  category: z.string().min(1, 'Category is required').max(50),
  duration: z.string().min(1, 'Duration is required'),
  groupSize: z.string().min(1, 'Group size is required'),
  price: positivePrice,
  unit: z.string().min(1, 'Unit is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'Image is required'),
});

export const experienceUpdateSchema = experienceSchema.partial();

export const galleryItemSchema = z.object({
  category: z.string().min(1, 'Category is required').max(50),
  label: z.string().min(1, 'Label is required').max(100),
  image: z.string().min(1, 'Image is required'),
});

export const galleryItemUpdateSchema = galleryItemSchema.partial();

import { z } from 'zod';

export { PaginationSchema } from './pagination.schema';
export type { Pagination } from './pagination.schema';

export const UUIDSchema = z.string().uuid();

// Base Entity Schema (Timestamp fields)
export const EntitySchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Re-export all schemas
export * from './auth.schema';
export * from './mission.schema';

import { z } from 'zod';
import { PaginationSchema } from './pagination.schema';

export const CreateMissionSchema = z.object({
  codeName: z.string().min(3).max(50),
  description: z.string().min(10),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
});

export const UpdateMissionSchema = z.object({
  codeName: z.string().min(3).max(50).optional(),
  description: z.string().min(10).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED', 'FAILED']).optional(),
  progress: z.number().min(0).max(100).optional(),
});

export const MissionQuerySchema = PaginationSchema.extend({
  status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED', 'FAILED']).optional(),
});

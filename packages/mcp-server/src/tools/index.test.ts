/**
 * MCP Tools Tests (CRUCIBLE Team Requirement)
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';

describe('MCP Tools - Input Validation', () => {
  describe('get_agents', () => {
    const getAgentsSchema = z.object({
      team: z.string().optional(),
      role: z.string().optional(),
    });

    it('should accept valid team filter', () => {
      const result = getAgentsSchema.parse({ team: 'NEURAL CORE' });
      expect(result).toEqual({ team: 'NEURAL CORE' });
    });

    it('should accept valid role filter', () => {
      const result = getAgentsSchema.parse({ role: 'Commander' });
      expect(result).toEqual({ role: 'Commander' });
    });

    it('should accept no filters', () => {
      const result = getAgentsSchema.parse({});
      expect(result).toEqual({});
    });

    it('should reject invalid data types', () => {
      expect(() => getAgentsSchema.parse({ team: 123 })).toThrow();
    });
  });

  describe('get_missions', () => {
    const getMissionsSchema = z.object({
      status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETE', 'FAILED']).optional(),
      priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    });

    it('should accept valid status filter', () => {
      const result = getMissionsSchema.parse({ status: 'IN_PROGRESS' });
      expect(result).toEqual({ status: 'IN_PROGRESS' });
    });

    it('should accept valid priority filter', () => {
      const result = getMissionsSchema.parse({ priority: 'HIGH' });
      expect(result).toEqual({ priority: 'HIGH' });
    });

    it('should reject invalid status', () => {
      expect(() => getMissionsSchema.parse({ status: 'INVALID' })).toThrow();
    });
  });

  describe('get_knowledge', () => {
    const getKnowledgeSchema = z.object({
      topic: z.string().optional(),
      category: z.string().optional(),
    });

    it('should accept valid topic filter', () => {
      const result = getKnowledgeSchema.parse({ topic: 'MCP' });
      expect(result).toEqual({ topic: 'MCP' });
    });
  });
});

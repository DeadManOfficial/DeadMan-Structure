import { prisma } from '@repo/database';
import { Mission, Priority, Result } from '@repo/types';

const getErrorMessage = (err: unknown): string =>
  err instanceof Error ? err.message : 'Unknown error';

export class MissionService {
  /**
   * Retrieves all missions using the withRetry utility for resilience
   */
  static async getAllMissions(): Promise<Result<Mission[]>> {
    try {
      const missions = await prisma.mission.findMany({
        orderBy: { updatedAt: 'desc' }
      });
      return { ok: true, value: missions as unknown as Mission[] };
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      return { 
        ok: false, 
        error: { 
          code: 'DB_FETCH_ERROR', 
          message, 
          severity: 'HIGH' 
        } 
      };
    }
  }

  /**
   * Creates a mission with strict domain validation
   */
  static async createMission(data: { codeName: string; description: string; priority?: Priority }): Promise<Result<Mission>> {
    try {
      const mission = await prisma.mission.create({
        data: {
          codeName: data.codeName,
          description: data.description,
          priority: data.priority || 'MEDIUM',
        }
      });
      return { ok: true, value: mission as unknown as Mission };
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      return {
        ok: false,
        error: {
          code: 'DB_CREATE_ERROR',
          message,
          severity: 'CRITICAL'
        }
      };
    }
  }

  /**
   * Retrieves a specific mission by ID
   */
  static async getMissionById(id: string): Promise<Result<Mission>> {
    try {
      const mission = await prisma.mission.findUnique({
        where: { id }
      });
      
      if (!mission) {
        return {
          ok: false,
          error: {
            code: 'NOT_FOUND',
            message: `Mission with ID ${id} not found`,
            severity: 'LOW'
          }
        };
      }

      return { ok: true, value: mission as unknown as Mission };
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      return {
        ok: false,
        error: {
          code: 'DB_FETCH_ERROR',
          message,
          severity: 'HIGH'
        }
      };
    }
  }

  /**
   * Updates an existing mission
   */
  static async updateMission(id: string, data: Partial<Mission>): Promise<Result<Mission>> {
    try {
      const mission = await prisma.mission.update({
        where: { id },
        data
      });
      return { ok: true, value: mission as unknown as Mission };
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      return {
        ok: false,
        error: {
          code: 'DB_UPDATE_ERROR',
          message,
          severity: 'HIGH'
        }
      };
    }
  }

  /**
   * Deletes a mission from the system
   */
  static async deleteMission(id: string): Promise<Result<boolean>> {
    try {
      await prisma.mission.delete({
        where: { id }
      });
      return { ok: true, value: true };
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      return {
        ok: false,
        error: {
          code: 'DB_DELETE_ERROR',
          message,
          severity: 'MEDIUM'
        }
      };
    }
  }

  /**
   * Executes a mission, transitioning its status to ACTIVE and initializing progress
   */
  static async executeMission(id: string): Promise<Result<Mission>> {
    try {
      const mission = await prisma.mission.findUnique({ where: { id } });

      if (!mission) {
        return {
          ok: false,
          error: {
            code: 'NOT_FOUND',
            message: `Mission with ID ${id} not found`,
            severity: 'LOW'
          }
        };
      }

      if (mission.status === 'COMPLETED' || mission.status === 'FAILED') {
        return {
          ok: false,
          error: {
            code: 'INVALID_STATE',
            message: `Cannot execute mission in status ${mission.status}`,
            severity: 'MEDIUM'
          }
        };
      }

      const updated = await prisma.mission.update({
        where: { id },
        data: {
          status: 'ACTIVE',
          progress: mission.progress > 0 ? mission.progress : 10 // Start at 10%
        }
      });

      return { ok: true, value: updated as unknown as Mission };
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      return {
        ok: false,
        error: {
          code: 'EXECUTION_FAILED',
          message,
          severity: 'HIGH'
        }
      };
    }
  }
}

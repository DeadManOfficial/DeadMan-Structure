import { Request, Response, NextFunction } from 'express';
import { MissionService } from '../services/mission.service';
import { CreateMissionSchema, UpdateMissionSchema } from '@repo/validation';
import { ApiResponse, ShieldaError } from '@repo/types';

const createResponse = <T>(req: Request, result: { ok: boolean; value?: T; error?: ShieldaError }, startTime: number): ApiResponse<T> => {
  return {
    success: result.ok,
    data: result.value,
    error: result.error,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: (req.headers['x-request-id'] as string) || 'unknown',
      runtime: `${Date.now() - startTime}ms`,
      version: '1.0.0'
    }
  };
};

export const getMissions = async (req: Request, res: Response, _next: NextFunction) => {
  const start = Date.now();
  const result = await MissionService.getAllMissions();
  res.status(result.ok ? 200 : 500).json(createResponse(req, result, start));
};

export const getMissionById = async (req: Request, res: Response, _next: NextFunction) => {
  const start = Date.now();
  const result = await MissionService.getMissionById(req.params.id);
  res.status(result.ok ? 200 : (result.error?.code === 'NOT_FOUND' ? 404 : 500)).json(createResponse(req, result, start));
};

export const createMission = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  try {
    const validated = CreateMissionSchema.parse(req.body);
    const result = await MissionService.createMission(validated);
    res.status(result.ok ? 201 : 500).json(createResponse(req, result, start));
  } catch (err: unknown) {
    next(err);
  }
};

export const updateMission = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  try {
    const validated = UpdateMissionSchema.parse(req.body);
    const result = await MissionService.updateMission(req.params.id, validated);
    res.status(result.ok ? 200 : 500).json(createResponse(req, result, start));
  } catch (err: unknown) {
    next(err);
  }
};

export const deleteMission = async (req: Request, res: Response, _next: NextFunction) => {
  const start = Date.now();
  const result = await MissionService.deleteMission(req.params.id);
  res.status(result.ok ? 204 : 500).json(createResponse(req, result, start));
};

export const executeMission = async (req: Request, res: Response, _next: NextFunction) => {
  const start = Date.now();
  const result = await MissionService.executeMission(req.params.id);
  res.status(result.ok ? 200 : (result.error?.code === 'NOT_FOUND' ? 404 : 400)).json(createResponse(req, result, start));
};

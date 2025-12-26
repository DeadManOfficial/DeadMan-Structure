import { Request, Response, NextFunction } from 'express';
import { AppError, ErrorCode } from '@repo/errors';
import { logger } from '@repo/logger';

export const errorMiddleware = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const isAppError = err instanceof AppError;
  const message = err instanceof Error ? err.message : 'Internal System Error';
  const statusCode = isAppError ? err.statusCode : 500;
  const errorCode = isAppError ? err.code : ErrorCode.INTERNAL_ERROR;
  
  // Log based on severity
  if (isAppError && err.statusCode < 500) {
    logger.warn({ err, reqId: req.headers['x-request-id'] }, `[${err.code}] ${err.message}`);
  } else {
    logger.error({ err, reqId: req.headers['x-request-id'] }, 'Unhandled System Error');
  }

  const response = {
    success: false as const,
    error: message,
    errorCode,
    timestamp
  };

  res.status(statusCode).json(response);
};

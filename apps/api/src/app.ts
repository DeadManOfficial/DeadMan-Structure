import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './middleware/error.middleware';
import { requestIdMiddleware } from './middleware/request-id.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { logger } from '@repo/logger';
import missionRoutes from './routes/mission.routes';
import governanceRoutes from './modules/governance/controllers/governance.controller';
import councilRoutes from './routes/council.routes';
import { validateEnv, config } from '@repo/config';

/**
 * Build Express app (exported for testing)
 */
export function buildApp() {
  const app = express();

  // Security & Observability
  app.use(helmet());
  app.use(cors({
    origin: config.cors.origin,
  }));
  app.use(express.json());
  app.use(requestIdMiddleware);

  // Logging Middleware
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info({
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration: `${duration}ms`,
        requestId: req.headers['x-request-id']
      });
    });
    next();
  });

  // Internal Health & Metrics (always public)
  app.get('/health', (req, res) => {
    res.json({
      status: 'operational',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Create protected router with explicit auth guard
  const protectedRouter = express.Router();
  protectedRouter.use(authMiddleware);

  // Public routes (no auth required)
  app.use('/api/council', councilRoutes);

  // Protected routes (auth required)
  protectedRouter.use('/missions', missionRoutes);
  protectedRouter.use('/governance', governanceRoutes);

  // Mount protected router
  app.use('/api', protectedRouter);

  // SHIELDA Error Handler
  app.use(errorMiddleware);

  return app;
}

// Only start server if this file is run directly
if (require.main === module) {
  // Validate environment variables on startup
  validateEnv();

  const app = buildApp();
  const port = config.server.port;

  app.listen(port, () => {
    logger.info(`[GEMINI HQ] Intelligence Hub operational on port ${port}`);
  });
}

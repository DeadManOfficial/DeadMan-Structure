import { getEnv } from './env'

/**
 * Application configuration
 * Centralized configuration object validated against environment variables
 */
export const config = {
  env: getEnv(),

  // Server
  server: {
    port: getEnv().PORT,
    nodeEnv: getEnv().NODE_ENV,
  },

  // Database
  database: {
    url: getEnv().DATABASE_URL,
  },

  // Security
  security: {
    jwtSecret: getEnv().JWT_SECRET,
    apiKey: getEnv().API_KEY,
  },

  // Logging
  logging: {
    level: getEnv().LOG_LEVEL,
    format: getEnv().LOG_FORMAT,
  },

  // CORS
  cors: {
    origin: getEnv().CORS_ORIGIN,
  },

  // Features
  features: {
    swagger: getEnv().ENABLE_SWAGGER,
    metrics: getEnv().ENABLE_METRICS,
  },
} as const

export type Config = typeof config

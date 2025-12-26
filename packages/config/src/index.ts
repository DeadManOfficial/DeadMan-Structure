import { z } from 'zod'

/**
 * Environment variable validation schema
 * Validates all required environment variables on startup
 */
export const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // API Configuration
  PORT: z.string().transform(Number).default('3000'),
  API_URL: z.string().url().optional(),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // Security
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters').optional(),
  API_KEY: z.string().min(1).optional(),

  // Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  LOG_FORMAT: z.enum(['json', 'pretty']).default('json'),

  // CORS
  CORS_ORIGIN: z.string().default('*'),

  // Feature Flags
  ENABLE_SWAGGER: z.string().transform(val => val === 'true').default('false'),
  ENABLE_METRICS: z.string().transform(val => val === 'true').default('false'),
})

export type Env = z.infer<typeof envSchema>

/**
 * Validates and parses environment variables
 * Throws if validation fails
 */
export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n')
      console.error('❌ Invalid environment variables:\n' + missingVars)
      throw new Error(`Environment validation failed:\n${missingVars}`)
    }
    throw error
  }
}

/**
 * Cached validated environment variables
 * Call validateEnv() once at app startup
 */
let cachedEnv: Env | null = null

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = validateEnv()
  }
  return cachedEnv
}

/**
 * Check if we're in a specific environment
 */
export function isDevelopment(): boolean {
  return getEnv().NODE_ENV === 'development'
}

export function isProduction(): boolean {
  return getEnv().NODE_ENV === 'production'
}

export function isTest(): boolean {
  return getEnv().NODE_ENV === 'test'
}

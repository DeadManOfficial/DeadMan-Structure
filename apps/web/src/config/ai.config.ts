/**
 * AI Configuration
 * Externalized configuration for AI agents
 * Can be moved to environment variables or loaded from API in production
 */

export interface AIConfig {
  name: string;
  title: string;
  subtitle: string;
  color: string;
  model?: string;
  endpoint?: string;
}

export const AI_CONFIG: Record<'claude' | 'gemini' | 'codex', AIConfig> = {
  claude: {
    name: 'CLAUDE',
    title: 'THE GENERAL',
    subtitle: 'Operations Command',
    color: '#FF8700',
    model: process.env.VITE_CLAUDE_MODEL || 'claude-sonnet-4-5',
    endpoint: process.env.VITE_CLAUDE_ENDPOINT,
  },
  gemini: {
    name: 'GEMINI',
    title: 'THE ENGINEER',
    subtitle: 'Code Quality',
    color: '#005F00',
    model: process.env.VITE_GEMINI_MODEL || 'gemini-2.5',
    endpoint: process.env.VITE_GEMINI_ENDPOINT,
  },
  codex: {
    name: 'CODEX',
    title: 'THE ANALYST',
    subtitle: 'Deep Reasoning',
    color: '#00FFFF',
    model: process.env.VITE_CODEX_MODEL || 'codex-5.2',
    endpoint: process.env.VITE_CODEX_ENDPOINT,
  },
} as const;

/**
 * App Configuration
 */
export const APP_CONFIG = {
  title: 'DEAD MAN STRUCTURE',
  subtitle: 'Triple AI Council Interface',
  version: process.env.VITE_APP_VERSION || '1.0.0',
  apiBaseUrl: process.env.VITE_API_BASE_URL || 'http://localhost:4000',
  requestTimeout: parseInt(process.env.VITE_REQUEST_TIMEOUT || '30000', 10),
  maxRetries: parseInt(process.env.VITE_MAX_RETRIES || '3', 10),
} as const;

/**
 * Feature Flags
 */
export const FEATURE_FLAGS = {
  enableMetrics: process.env.VITE_ENABLE_METRICS === 'true',
  enableDebugMode: process.env.VITE_ENABLE_DEBUG === 'true',
  enableSwagger: process.env.VITE_ENABLE_SWAGGER === 'true',
} as const;

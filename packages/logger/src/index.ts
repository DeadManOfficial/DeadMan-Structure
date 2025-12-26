import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Secret scrubbing serializers
 * Redacts sensitive information from logs to prevent credential leakage
 */
const redactSerializer = {
  req: pino.stdSerializers.req,
  res: pino.stdSerializers.res,
  err: pino.stdSerializers.err,
  // Redact headers that commonly contain secrets
  headers: (headers: Record<string, string>) => {
    const redacted = { ...headers };
    const sensitiveKeys = [
      'authorization',
      'cookie',
      'x-api-key',
      'x-auth-token',
      'jwt',
      'secret',
      'password',
      'token',
    ];

    for (const key of Object.keys(redacted)) {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
        redacted[key] = '[REDACTED]';
      }
    }
    return redacted;
  },
  // Redact query parameters that might contain secrets
  queryParams: (params: Record<string, string>) => {
    const redacted = { ...params };
    const sensitiveKeys = ['token', 'key', 'secret', 'password', 'api_key', 'apikey'];

    for (const key of Object.keys(redacted)) {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
        redacted[key] = '[REDACTED]';
      }
    }
    return redacted;
  },
  // Redact body fields that contain secrets
  body: (body: unknown) => {
    if (!body || typeof body !== 'object') return body;

    const redacted = { ...(body as Record<string, unknown>) };
    const sensitiveKeys = ['password', 'token', 'secret', 'apiKey', 'api_key', 'jwt', 'auth'];

    const redactValue = (value: unknown): unknown => {
      if (!value || typeof value !== 'object') return value;

      if (Array.isArray(value)) {
        return value.map(item => redactValue(item));
      }

      const result: Record<string, unknown> = { ...(value as Record<string, unknown>) };

      for (const key of Object.keys(result)) {
        if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
          result[key] = '[REDACTED]';
        } else {
          result[key] = redactValue(result[key]);
        }
      }
      return result;
    };

    return redactValue(redacted);
  },
};

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'SYS:standard',
        },
      }
    : undefined,
  base: {
    env: process.env.NODE_ENV,
    service: process.env.SERVICE_NAME || 'gemini-core',
  },
  serializers: redactSerializer,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.headers["x-api-key"]',
      'body.password',
      'body.token',
      'body.secret',
      'body.apiKey',
      'query.token',
      'query.key',
      'query.secret',
    ],
    remove: true,
  },
});

export type Logger = typeof logger;

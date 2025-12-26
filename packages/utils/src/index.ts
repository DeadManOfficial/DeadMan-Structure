/**
 * Retries a function with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: { retries: number; delay: number } = { retries: 3, delay: 1000 }
): Promise<T> {
  let lastError: unknown;
  
  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < options.retries - 1) {
        await new Promise(resolve => setTimeout(resolve, options.delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
}

/**
 * Standardized UUID generator (simple version for utils)
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

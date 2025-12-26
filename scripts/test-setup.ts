// Test setup file for Vitest
// This runs before all tests

console.log('🧪 Test suite initializing...')

// Set test environment variables
process.env.NODE_ENV = 'test'
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./test.db'
process.env.LOG_LEVEL = 'error' // Reduce noise during tests

// Mock console methods to reduce test output
global.console = {
  ...console,
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
}

console.log('✅ Test environment ready')

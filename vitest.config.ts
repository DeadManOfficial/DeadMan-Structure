import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/types/',
        '**/config/',
      ],
    },
    setupFiles: ['./scripts/test-setup.ts'],
  },
  resolve: {
    alias: {
      '@repo/types': path.resolve(__dirname, './packages/types/src'),
      '@repo/logger': path.resolve(__dirname, './packages/logger/src'),
      '@repo/errors': path.resolve(__dirname, './packages/errors/src'),
      '@repo/database': path.resolve(__dirname, './packages/database/src'),
      '@repo/validation': path.resolve(__dirname, './packages/validation/src'),
      '@repo/utils': path.resolve(__dirname, './packages/utils/src'),
      '@repo/ui': path.resolve(__dirname, './packages/ui/src'),
      '@repo/config': path.resolve(__dirname, './packages/config/src'),
    },
  },
})

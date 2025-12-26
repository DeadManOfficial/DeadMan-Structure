import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import { buildApp } from './app' // We'll need to export the app builder

describe('API Smoke Tests', () => {
  let app: ReturnType<typeof buildApp>

  beforeAll(() => {
    // Build app with test configuration
    app = buildApp()
  })

  describe('Health Endpoint', () => {
    it('should return operational status', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body).toHaveProperty('status', 'operational')
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body).toHaveProperty('uptime')
    })
  })

  describe('Public Routes', () => {
    it('should access council routes without authentication', async () => {     
      const response = await request(app)
        .get('/api/council/status')
        .expect('Content-Type', /json/)
        .expect(200)

      // Response should be an object with data
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('Protected Routes', () => {
    it('should reject unauthenticated requests to missions', async () => {
      await request(app)
        .get('/api/missions')
        .expect(401)
    })

    it('should reject unauthenticated requests to governance', async () => {
      await request(app)
        .get('/api/governance')
        .expect(401)
    })

    it('should reject requests with invalid auth token', async () => {
      await request(app)
        .get('/api/missions')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401)
    })
  })

  describe('Security Headers', () => {
    it('should include security headers from Helmet', async () => {
      const response = await request(app)
        .get('/health')

      expect(response.headers).toHaveProperty('x-content-type-options')
      expect(response.headers['x-content-type-options']).toBe('nosniff')
    })
  })

  describe('CORS', () => {
    it('should include CORS headers', async () => {
      const response = await request(app)
        .get('/health')

      expect(response.headers).toHaveProperty('access-control-allow-origin')
    })
  })
})

# TESTING STRATEGY

**Document ID**: CRUCIBLE-TS-001
**Version**: 1.0.0
**Last Updated**: 2025-12-25
**Owner**: VALIDATOR (CRUCIBLE Team)
**Status**: ACTIVE

---

## Executive Summary

This document defines the comprehensive testing strategy for Dead Man Structure, establishing quality gates, coverage requirements, and testing practices to ensure system reliability and maintainability. Based on codex analysis, we leverage existing Vitest infrastructure while identifying gaps and recommending strategic additions.

---

## 1. Current State Analysis

### 1.1 Existing Infrastructure

**Test Framework**: Vitest v1.0.0 with coverage-v8
- Configured at workspace root
- Modern, fast, ESM-native test runner
- Built-in coverage reporting with V8 provider

**Turbo Pipeline Integration**:
- `test` task: Runs all tests across workspace
- `test:coverage` task: Generates coverage reports
- Parallel execution enabled for performance

**Existing Test Coverage**:
```
packages/types/src/index.test.ts
  - Type validation and schema tests

apps/api/src/modules/missions/services/mission.service.test.ts
  - Mission service business logic tests
```

**CI/CD Integration**:
- GitHub Actions workflow: `.github/workflows/ci.yml`
- Automated test execution on PR and push events

### 1.2 Identified Gaps

1. **Missing Test Scripts**: `apps/api` package lacks dedicated test script
2. **E2E Testing**: No end-to-end testing framework configured
3. **Coverage Enforcement**: No automated coverage thresholds in CI
4. **Integration Tests**: Limited cross-module integration test coverage
5. **Test Documentation**: Missing test writing guidelines and patterns

---

## 2. Test Framework: Vitest

### 2.1 Why Vitest

- **Performance**: Native ESM support, parallel test execution
- **Developer Experience**: Hot module reload, instant feedback
- **TypeScript**: First-class TypeScript support
- **Coverage**: Built-in coverage via c8/v8
- **Compatibility**: Jest-compatible API for easy migration
- **Monorepo**: Excellent workspace/monorepo support

### 2.2 Configuration Standards

**Workspace Root** (`vitest.config.ts`):
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.{js,ts}',
        '**/*.d.ts',
        '**/index.ts'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
});
```

**Package-Level** (inherit from root, override as needed):
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Package-specific configuration
  }
});
```

---

## 3. Coverage Requirements

### 3.1 Coverage Targets

**Minimum Thresholds** (Enforced in CI):
- Lines: 80%
- Functions: 80%
- Branches: 80%
- Statements: 80%

**Target Goals** (Team Objective):
- Lines: 88%
- Functions: 88%
- Branches: 85%
- Statements: 88%

### 3.2 Coverage Exclusions

The following are excluded from coverage requirements:
- Configuration files (`*.config.{js,ts}`)
- Type definitions (`*.d.ts`)
- Index/barrel files (`index.ts` - re-exports only)
- Build artifacts (`dist/`, `build/`)
- Development tools and scripts
- Mock data and fixtures

### 3.3 Coverage Reporting

**Format**: Multi-format output
- `text`: Console output for immediate feedback
- `json`: Machine-readable for CI/CD
- `html`: Detailed visual reports for local review
- `lcov`: Integration with coverage tools (Codecov, Coveralls)

**Location**: `coverage/` directory (gitignored)

---

## 4. Quality Gates for CI/CD

### 4.1 Pre-Commit Gates

**Local Development**:
- Run affected tests via Turbo cache
- Lint-staged integration for changed files
- Type checking must pass

### 4.2 CI Pipeline Gates

**Pull Request Checks** (Must Pass):
1. **Linting**: All code passes ESLint rules
2. **Type Safety**: TypeScript compilation succeeds
3. **Unit Tests**: All unit tests pass (zero failures)
4. **Coverage Threshold**: Minimum 80% coverage maintained
5. **Integration Tests**: Cross-module tests pass
6. **Build Verification**: Production build succeeds

**Failure Actions**:
- Block merge on any gate failure
- Report coverage delta in PR comments
- Generate detailed failure reports

### 4.3 Main Branch Gates

**Post-Merge**:
- Full test suite execution
- Coverage report generation and archival
- E2E test suite (when implemented)
- Performance regression tests (future)

### 4.4 Release Gates

**Pre-Release Checklist**:
- 100% CI pipeline success rate for last 10 commits
- Coverage meets target goals (88%)
- Zero high-severity test failures
- E2E tests pass in staging environment
- Load/performance tests pass (future)

---

## 5. Test Categories

### 5.1 Unit Tests

**Purpose**: Test individual functions, classes, and modules in isolation

**Characteristics**:
- Fast execution (< 5ms per test)
- No external dependencies (DB, API, filesystem)
- Use mocks/stubs for dependencies
- High coverage of edge cases

**Naming Convention**: `*.test.ts` or `*.spec.ts`

**Location**: Co-located with source files
```
src/
  services/
    user.service.ts
    user.service.test.ts
```

**Example Structure**:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { UserService } from './user.service';

describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', () => {
      // Arrange
      const userData = { name: 'Test', email: 'test@example.com' };

      // Act
      const result = UserService.createUser(userData);

      // Assert
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(userData.name);
    });

    it('should throw error for invalid email', () => {
      // Test edge case
    });
  });
});
```

### 5.2 Integration Tests

**Purpose**: Test interactions between modules, services, and external systems

**Characteristics**:
- Medium execution time (< 500ms per test)
- May use test databases or sandboxed environments
- Tests real integrations (DB queries, API calls)
- Validates data flow across boundaries

**Naming Convention**: `*.integration.test.ts`

**Location**: Dedicated `__tests__` directory or co-located
```
src/
  __tests__/
    integration/
      mission-workflow.integration.test.ts
```

**Scope**:
- Database operations (with test DB)
- Inter-service communication
- External API integrations (with mocks or test APIs)
- Event/message bus interactions

### 5.3 End-to-End (E2E) Tests

**Purpose**: Test complete user workflows and system behavior

**Characteristics**:
- Slow execution (seconds per test)
- Full system deployment (or close approximation)
- Tests from user perspective
- Validates critical paths

**Naming Convention**: `*.e2e.test.ts`

**Location**: Dedicated E2E directory
```
tests/
  e2e/
    user-registration.e2e.test.ts
    mission-lifecycle.e2e.test.ts
```

**Recommended Framework**: Playwright (see Section 7)

**Critical Workflows to Cover**:
- User authentication flow
- Mission creation and assignment
- Lead processing pipeline
- Report generation
- Error handling and recovery

---

## 6. Missing Test Scripts

### 6.1 Apps/API Package Issue

**Current State**: `apps/api` lacks a dedicated test script in `package.json`

**Impact**:
- Cannot run API tests in isolation
- Turbo pipeline may not correctly trigger API tests
- Local development workflow incomplete

**Required Action**:

Add to `apps/api/package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

**Verification**:
```bash
# From workspace root
turbo run test --filter=@deadman-structure/api

# From apps/api
npm run test
```

### 6.2 Recommended Package Scripts

**All Packages Should Include**:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage"
  }
}
```

**Optional but Recommended**:
```json
{
  "scripts": {
    "test:ui": "vitest --ui",
    "test:integration": "vitest run --config vitest.integration.config.ts"
  }
}
```

---

## 7. Recommended Additions

### 7.1 Playwright for E2E Testing

**Why Playwright**:
- Cross-browser testing (Chromium, Firefox, WebKit)
- Auto-wait for elements (reduces flaky tests)
- Excellent debugging tools
- Network interception and mocking
- Parallel execution
- Excellent TypeScript support

**Installation**:
```bash
npm install -D @playwright/test
npx playwright install
```

**Configuration** (`playwright.config.ts`):
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Integration with Turbo**:
```json
{
  "pipeline": {
    "test:e2e": {
      "dependsOn": ["build"],
      "outputs": ["playwright-report/**"]
    }
  }
}
```

### 7.2 Testing Utilities Library

**Create**: `packages/testing-utils`

**Purpose**: Shared test utilities, mocks, and helpers

**Contents**:
- Mock factories (users, missions, leads)
- Test data builders
- Custom matchers
- Database seeding utilities
- API client mocks

**Example Structure**:
```typescript
// packages/testing-utils/src/factories/user.factory.ts
export const createMockUser = (overrides = {}) => ({
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  createdAt: new Date(),
  ...overrides
});
```

### 7.3 Visual Regression Testing

**Future Consideration**: Percy, Chromatic, or Playwright's screenshot comparison

**Use Case**: Prevent unintended UI changes

**Priority**: Medium (implement after core testing is solid)

### 7.4 Performance Testing

**Tool**: k6 or Artillery

**Scope**: API endpoint performance, load testing

**Priority**: Low (implement after feature stability)

---

## 8. Test Writing Guidelines

### 8.1 General Principles

1. **AAA Pattern**: Arrange, Act, Assert
2. **Single Responsibility**: One assertion per test (when practical)
3. **Descriptive Names**: Test name should describe expected behavior
4. **Independence**: Tests should not depend on each other
5. **Deterministic**: Same input = same output (no random failures)

### 8.2 Naming Conventions

**Format**: `should [expected behavior] when [condition]`

```typescript
it('should return user when valid ID is provided', () => {});
it('should throw NotFoundError when user does not exist', () => {});
it('should validate email format before creating user', () => {});
```

### 8.3 Mock Strategy

**Rule**: Mock external dependencies, not internal logic

**Good**:
```typescript
const mockDb = vi.fn().mockResolvedValue({ id: 1, name: 'Test' });
```

**Bad**:
```typescript
// Don't mock the function you're testing
const mockUserService = vi.fn();
```

### 8.4 Test Organization

**Group Related Tests**:
```typescript
describe('UserService', () => {
  describe('createUser', () => {
    // All createUser tests
  });

  describe('updateUser', () => {
    // All updateUser tests
  });
});
```

---

## 9. CI/CD Integration Details

### 9.1 GitHub Actions Workflow Enhancement

**File**: `.github/workflows/ci.yml`

**Add Coverage Enforcement**:
```yaml
- name: Run Tests with Coverage
  run: npm run test:coverage

- name: Check Coverage Thresholds
  run: |
    npm run test:coverage -- --reporter=json --outputFile=coverage.json
    # Parse and validate thresholds

- name: Upload Coverage Reports
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
    flags: unittests
    fail_ci_if_error: true
```

### 9.2 Turbo Remote Caching

**Leverage Turbo's caching** for faster CI:
- Cache test results
- Skip unchanged package tests
- Restore coverage reports from cache

**Configuration** (already in `turbo.json`):
```json
{
  "pipeline": {
    "test": {
      "cache": true,
      "outputs": ["coverage/**"]
    }
  }
}
```

---

## 10. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Add missing test scripts to `apps/api`
- [ ] Configure coverage thresholds in Vitest config
- [ ] Update CI workflow with coverage gates
- [ ] Document test writing guidelines
- [ ] Create `packages/testing-utils` with base factories

### Phase 2: Coverage Expansion (Week 3-4)
- [ ] Achieve 60% coverage baseline across all packages
- [ ] Write integration tests for critical paths
- [ ] Add unit tests for all service layers
- [ ] Implement mock strategies for external dependencies

### Phase 3: E2E Testing (Week 5-6)
- [ ] Install and configure Playwright
- [ ] Write E2E tests for top 5 critical workflows
- [ ] Integrate E2E tests into CI pipeline
- [ ] Document E2E test patterns

### Phase 4: Quality Hardening (Week 7-8)
- [ ] Achieve 80% minimum coverage threshold
- [ ] Target 88% coverage goal
- [ ] Implement pre-commit hooks with testing
- [ ] Add test performance monitoring

### Phase 5: Advanced Testing (Future)
- [ ] Visual regression testing setup
- [ ] Performance/load testing framework
- [ ] Mutation testing exploration
- [ ] Contract testing for APIs

---

## 11. Metrics and Monitoring

### 11.1 Key Metrics

**Coverage Metrics**:
- Line coverage percentage
- Branch coverage percentage
- Function coverage percentage
- Statement coverage percentage

**Quality Metrics**:
- Test execution time (per package, total)
- Test failure rate
- Flaky test count
- Code churn vs. test churn ratio

**CI/CD Metrics**:
- Average CI pipeline duration
- Test cache hit rate
- Coverage trend over time
- Test count growth rate

### 11.2 Reporting

**Daily**:
- CI pipeline status
- Test failure alerts

**Weekly**:
- Coverage trend report
- Flaky test identification
- Test performance analysis

**Monthly**:
- Overall quality dashboard
- Coverage goal progress
- Test suite health score

---

## 12. Team Responsibilities

### 12.1 CRUCIBLE Team

**VALIDATOR**:
- Enforce coverage requirements
- Review test quality in PRs
- Maintain testing infrastructure
- Generate test metrics reports

**ARCHITECT**:
- Define testability standards
- Review integration test strategies
- Approve testing architecture changes

### 12.2 Development Teams

**All Developers**:
- Write unit tests for new features
- Maintain 80% minimum coverage
- Fix failing tests immediately
- Follow testing guidelines

**Feature Leads**:
- Ensure integration tests for features
- Review test coverage in PRs
- Approve feature without adequate tests

---

## 13. Tools and Resources

### 13.1 Testing Stack

| Category | Tool | Version | Purpose |
|----------|------|---------|---------|
| Unit/Integration | Vitest | 1.0.0 | Primary test runner |
| Coverage | coverage-v8 | Latest | Code coverage analysis |
| E2E | Playwright | TBD | End-to-end testing |
| Mocking | Vitest (built-in) | 1.0.0 | Function/module mocks |
| CI/CD | GitHub Actions | N/A | Automated testing |
| Orchestration | Turbo | Latest | Monorepo test execution |

### 13.2 Documentation

- Vitest Documentation: https://vitest.dev
- Playwright Documentation: https://playwright.dev
- Testing Best Practices: Internal wiki (TBD)
- Code Coverage Reports: `coverage/index.html`

---

## 14. FAQ

**Q: Do I need to write tests for every file?**
A: Focus on business logic, services, and utilities. Simple re-export files and type definitions don't require tests.

**Q: What's the difference between 80% minimum and 88% target?**
A: 80% is enforced by CI and blocks merges. 88% is our team goal for high-quality code.

**Q: How do I run tests locally?**
A: `npm run test` (all tests) or `npm run test:watch` (watch mode).

**Q: Can I skip coverage for a specific file?**
A: Add to coverage.exclude in vitest.config.ts, but requires justification and approval.

**Q: How long should tests take?**
A: Unit tests: <5ms, Integration: <500ms, E2E: <10s per test.

**Q: What if a test is flaky?**
A: Mark it as `.skip()`, create a ticket, and fix immediately. Flaky tests erode trust.

---

## 15. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-12-25 | VALIDATOR | Initial testing strategy document |

---

## Appendix A: Example Test Templates

### Unit Test Template
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  describe('methodName', () => {
    it('should handle success case', () => {
      // Arrange
      const input = {};

      // Act
      const result = methodName(input);

      // Assert
      expect(result).toBeDefined();
    });

    it('should handle error case', () => {
      // Test error scenarios
    });
  });
});
```

### Integration Test Template
```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Feature Integration', () => {
  beforeAll(async () => {
    // Setup test database, services
  });

  afterAll(async () => {
    // Cleanup
  });

  it('should complete workflow end-to-end', async () => {
    // Test real integration
  });
});
```

---

**END OF DOCUMENT**

*For questions or updates, contact VALIDATOR at CRUCIBLE Team, Dead Man Structure*

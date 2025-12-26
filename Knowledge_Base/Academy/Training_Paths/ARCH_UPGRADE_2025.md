# ARCH_UPGRADE: Functional DDD & Router Orchestration

## 1. Monorepo Foundation (2025)
*   **Foundation:** Turborepo + pnpm.
*   **Incremental Builds:** Enforce `composite: true` in all `tsconfig.json`.
*   **Shared Truth:** All data crossing service boundaries MUST use **Zod Schemas** from `@repo/types`.

## 2. Functional Domain-Driven Design
*   **Immutability First:** Separate data structures from the functions that operate on them.
*   **Bounded Contexts:** Each library in `packages/*` must have a single responsibility and a clean barrel export.

## 3. Router Agent Orchestration
*   Complex tasks must not be handled by one agent. 
*   **The Pattern:** Router Agent receives intent -> Dispatches to specialized Domain Agents -> Aggregates results.

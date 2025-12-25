# Gemini HQ Knowledge Map

## Scope
- Repo root: C:\Users\Administrator\Gemini_HQ
- Included: docs/, Knowledge_Base/, apps/api, packages/*
- Excluded from indexing: node_modules/, .turbo/, coverage/, binaries, .env

## High-level architecture
- Tri-Core Neural Architecture: docs/architecture/TRI_CORE_ARCHITECTURE.md
- Feedback loop: plan -> execute -> optimize
- Command structure and operations: docs/teams/OPERATIONAL_STRUCTURE.md, docs/teams/THE_GENERAL.md

## Organization and teams
- Command: The General (docs/teams/THE_GENERAL.md)
- Standard ops teams (5): Automaker Architecture, ShadCN Frontend, Figma Design, SuperGemini Governance, Tmux DevOps (docs/teams/OPERATIONAL_STRUCTURE.md)
- Special ops teams (3): BLACKOUT, NEURAL CORE, COGNITIVE ARCHITECTURE (docs/teams/BLACKOUT_TEAM.md, docs/teams/NEURAL_CORE_TEAM.md, docs/teams/COGNITIVE_ARCHITECTURE_TEAM.md)
- Mission board: docs/missions/MISSION_BOARD.md

## API surface
- Base URL and auth rules: docs/API_REFERENCE.md
- Health: GET /health (no auth)
- Missions: GET/POST/PUT/DELETE /api/missions, POST /api/missions/:id/execute (apps/api/src/routes/mission.routes.ts)
- Observability: x-request-id (apps/api/src/middleware/request-id.middleware.ts)
- Errors: SHIELDA error format (apps/api/src/middleware/error.middleware.ts, Knowledge_Base/SuperGemini_Governance/GOVERNANCE_MANUAL.md)

## Data model and contracts
- Prisma models: User, Mission, AgentTeam, AgentMember, Vote (packages/database/prisma/schema.prisma)
- Domain types: MissionStatus, Priority, TeamDomain, ApiResponse (packages/types/src/index.ts)
- Validation schemas: CreateMissionSchema, UpdateMissionSchema (packages/validation/src/mission.schema.ts)

## Packages
- database: Prisma client (packages/database/src/index.ts)
- errors: AppError + ErrorCode (packages/errors/src/index.ts)
- logger: Pino setup (packages/logger/src/index.ts)
- utils: withRetry, generateId (packages/utils/src/index.ts)
- validation: Zod schemas (packages/validation/src/index.ts)
- analyzer: AutonomicPulse diagnostics (packages/analyzer/src/index.ts)
- ui: Button/Card utilities (packages/ui/src/*)

## Manuals and reports
- Architecture and governance: SYSTEM_MANIFEST.md, Knowledge_Base/SuperGemini_Governance/*
- Design and frontend: Knowledge_Base/Figma_Design/DESIGN_MANUAL.md, Knowledge_Base/ShadCN_Frontend/FRONTEND_MANUAL.md
- Ops guidance: Knowledge_Base/Tmux_DevOps/OPS_MANUAL.md
- Agentic engineering: Knowledge_Base/Agentic_Engineering/ACT_LEARN_REUSE_PLAYBOOK.md
- Reports: docs/reports/*

## Transcript log
- C:\2025-12-25-resume.txt (CLI transcript; treat as sensitive audit log)

## Mismatches and proposed fixes
- Team counts differ across docs (SYSTEM_MANIFEST says 4 core teams; OPERATIONAL_STRUCTURE says 27 agents / 7 teams; transcript says 5 teams / 13 agents). Proposed fix: define "core" vs "total" and update README/SYSTEM_MANIFEST/transcript-derived docs to align with OPERATIONAL_STRUCTURE.
- Governance endpoints are documented in SYSTEM_MANIFEST but not in API reference and not mounted in the Express app. Proposed fix: mount governance router at /api/governance in apps/api/src/index.ts and add to docs/API_REFERENCE.md, or remove from SYSTEM_MANIFEST if not planned.
- AgentMember.capabilities is string[] in packages/types but String in Prisma schema. Proposed fix: store JSON in Prisma (Json type) or change type to string and parse consistently.
- MissionService comment mentions withRetry but it is not used. Proposed fix: either use withRetry in mission service calls or update the comment to match behavior.

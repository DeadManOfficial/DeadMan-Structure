# Dead Man Structure Intelligence Hub - System Manifest

## 🏛️ Governance Model: Agent Democracy
The system is now self-governing. Agent personas belong to specialized teams and elect their own **Team Leads** via cryptographic voting.

### Core Teams:
1.  **Automaker Core (Engineering)**: Leads technical scaffolding and repository hygiene.
2.  **ShadCN Stylists (Frontend)**: Leads visual fidelity and atomic component design.
3.  **SuperGemini (Governance)**: Leads persona oversight, security, and refactoring audits.
4.  **Tmux Operations (Ops)**: Leads session persistency and headless process management.

## 🛠️ Technical Foundation
- **Language**: TypeScript 5.0 (Strict)
- **Architecture**: Monorepo (DDD) + Headless API
- **Persistence**: Prisma + SQLite (Persistent Memory)
- **Resilience**: SHIELDA Error-as-Value Protocol
- **Security**: Mandatory API Keys + Zod Validation

## 📊 Operational Endpoints
- `GET /health`: System telemetry.
- `GET /api/missions`: Active task tracking.
- `GET /api/governance/status`: Current team leads and member vibe scores.
- `POST /api/governance/vote`: Democratic Lead election.

## 🔍 Observability
- **Logs**: Pino-Pretty (Dev) / Pino-JSON (Prod).
- **Traces**: `x-request-id` header required for all cross-service calls.

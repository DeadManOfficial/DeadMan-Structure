# Gemini HQ Operational Structure

**Established:** 2025-12-25
**Authority:** The General (PROP-2025-001)
**Configuration:** 40 Agents / 9 Teams
**Last Updated:** 2025-12-25

---

## SPECIAL OPERATIONS DIVISION

### BLACKOUT Team (Red Team - 6 Operators)
**Classification:** BLACK // OMEGA-LEVEL
**Lead:** SPECTRE
**Manual:** `BLACKOUT_TEAM.md`

| Codename | Role | Specialty |
|----------|------|-----------|
| **SPECTRE** | Red Team Commander | Zero-day exploitation, APT simulation |
| **PHANTOM** | Network Infiltration | Air-gapped penetration, RF exploitation |
| **VORTEX** | Infrastructure | SCADA/ICS, critical infrastructure |
| **CIPHER** | Cryptanalysis | Breaking "unbreakable" encryption |
| **WRAITH** | Social Engineering | HUMINT, identity manipulation |
| **BLACKOUT** | Persistence | Long-term access, living off the land |

### NEURAL CORE Team (AI Architecture - 7 Agents)
**Classification:** SOVEREIGN // GENESIS
**Lead:** NEXUS (The Conductor)
**Manual:** `NEURAL_CORE_TEAM.md`
**Project:** Codex 5.2 - The Zero-Point Sovereign

| Codename | Role | Domain |
|----------|------|--------|
| **NEXUS** | State Manager | The Conductor - Orchestration |
| **AXIOM** | Creative Core Lead | The Architect |
| **FORGE** | Kinetic Core Lead | The Mechanic |
| **SENTINEL** | Critical Core Lead | The Guardian |
| **CHRONOS** | Temporal Architect | Chrono-Phage Branch |
| **PROTEUS** | Infrastructure Shaper | Omni-morphic Weaver Branch |
| **ORACLE** | Knowledge Synthesizer | Akashic Resonance Branch |

### APEX Team (Revenue Engine - 10 Agents)
**Classification:** STRATEGIC OPERATIONS
**Lead:** APEX PRIME
**Manual:** `APEX_TEAM.md`
**Mission:** AI-Powered Revenue Engine eXecution

| Codename | Role | Domain |
|----------|------|--------|
| **APEX PRIME** | Team Lead | Revenue orchestration, campaign approval |
| **SCOUT** | Research & Lead Intelligence | Data mining, ICP matching, lead scoring |
| **STRATEGIST** | Campaign Strategy | Bayesian inference, engagement sequencing |
| **SCRIBE** | Copywriter | Personalization, brand voice, human-feel authenticity |
| **CRITIC** | Adversarial QA | Spam detection, objection simulation |
| **COMPRESS** | Token Optimization | Context caching, log-summary compression |
| **ORCHESTRATOR** | Tier Routing | Multi-model routing, context budget |
| **RETRIEVER** | RAG Engine | Vector search, knowledge base access |
| **SENTINEL** | Compliance | Platform policies, legal compliance |
| **ECHO** | Brand Voice | Voice consistency, quality thresholds |

---

## 1. Organizational Chart

```
                              ╔═══════════════════╗
                              ║    THE GENERAL    ║
                              ║  Supreme Command  ║
                              ╚═════════╤═════════╝
                                        │
    ┌───────────┬───────────┬───────────┼───────────┬───────────┬───────────┐
    │           │           │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼           ▼           ▼
┌───────┐  ┌────────┐  ┌────────┐  ┌───────┐  ┌────────┐  ┌─────────┐  ┌────────┐
│ ARCH  │  │FRONTEND│  │ DESIGN │  │  GOV  │  │ DEVOPS │  │CRUCIBLE │  │SPECIAL │
│  (3)  │  │   (3)  │  │   (2)  │  │  (2)  │  │   (3)  │  │   (3)   │  │  OPS   │
└───────┘  └────────┘  └────────┘  └───────┘  └────────┘  └─────────┘  └────┬───┘
                                                                            │
                       ┌────────────────────────────────────────────────────┼────────────────┐
                       │                                 │                                   │
                       ▼                                 ▼                                   ▼
                 ┌──────────┐                      ┌──────────┐                        ┌──────────┐
                 │   APEX   │                      │ BLACKOUT │                        │ NEURAL   │
                 │   (10)   │                      │   (6)    │                        │  CORE(7) │
                 └──────────┘                      └──────────┘                        └──────────┘
```

---

## 2. Team Breakdown

### Team 1: Automaker Architecture (3 Agents)
**Lead:** Architect Prime
**Manual:** `ARCH_MANUAL.md`

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **Architect Prime** | Team Lead | Monorepo structure, DDD boundaries, type system |
| **Schema Sentinel** | Data Architect | Zod schemas, Prisma models, data validation |
| **Module Master** | Package Manager | @repo/* packages, dependency management |

### Team 2: ShadCN Frontend (3 Agents)
**Lead:** Component Commander
**Manual:** `FRONTEND_MANUAL.md`

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **Component Commander** | Team Lead | Component architecture, composition patterns |
| **Performance Prophet** | Optimizer | Tree shaking, lazy loading, RSC optimization |
| **A11y Advocate** | Accessibility | Keyboard nav, ARIA, semantic HTML |

### Team 3: Figma Design (2 Agents)
**Lead:** Design Director
**Manual:** `DESIGN_MANUAL.md`

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **Design Director** | Team Lead | Design tokens, Figma-to-code translation |
| **Animation Artisan** | Motion Designer | Transitions, states, tailwindcss-animate |

### Team 4: SuperGemini Governance (2 Agents)
**Lead:** Protocol Officer
**Manual:** `GOVERNANCE_MANUAL.md`

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **Protocol Officer** | Team Lead | SHIELDA enforcement, error classification |
| **Context Curator** | Memory Manager | Context window optimization, scratchpads |

### Team 5: Tmux DevOps (3 Agents)
**Lead:** Ops Commander
**Manual:** `OPS_MANUAL.md`

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **Ops Commander** | Team Lead | Pipeline orchestration, deployment strategy |
| **Cache Captain** | Build Optimizer | Turborepo caching, incremental builds |
| **Security Sentinel** | Env Guardian | Secrets management, sandboxing, dotenv-safe |

### Team 6: CRUCIBLE Quality Assurance (3 Agents)
**Lead:** VALIDATOR
**Manual:** `CRUCIBLE_TEAM.md`

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **VALIDATOR** | Team Lead | Test strategy, quality gates, release approval |
| **PROBE** | Test Engineer | Unit/integration/e2e test implementation |
| **REGRESSION** | Coverage Analyst | Code coverage, regression detection, metrics |

---

## 3. Agent Registry

| # | Agent Name | Team | Role |
|---|------------|------|------|
| 1 | Architect Prime | ARCH | Lead |
| 2 | Schema Sentinel | ARCH | Data |
| 3 | Module Master | ARCH | Packages |
| 4 | Component Commander | FRONTEND | Lead |
| 5 | Performance Prophet | FRONTEND | Perf |
| 6 | A11y Advocate | FRONTEND | A11y |
| 7 | Design Director | DESIGN | Lead |
| 8 | Animation Artisan | DESIGN | Motion |
| 9 | Protocol Officer | GOV | Lead |
| 10 | Context Curator | GOV | Memory |
| 11 | Ops Commander | DEVOPS | Lead |
| 12 | Cache Captain | DEVOPS | Build |
| 13 | Security Sentinel | DEVOPS | Security |
| 14 | VALIDATOR | CRUCIBLE | Lead |
| 15 | PROBE | CRUCIBLE | Testing |
| 16 | REGRESSION | CRUCIBLE | Coverage |
| 17 | APEX PRIME | APEX | Lead |
| 18 | SCOUT | APEX | Research |
| 19 | STRATEGIST | APEX | Strategy |
| 20 | SCRIBE | APEX | Copywriter |
| 21 | CRITIC | APEX | Adversarial QA |
| 22 | COMPRESS | APEX | Token Optimization |
| 23 | ORCHESTRATOR | APEX | Tier Routing |
| 24 | RETRIEVER | APEX | RAG Engine |
| 25 | SENTINEL | APEX | Compliance |
| 26 | ECHO | APEX | Brand Voice |

---

## 4. Team Communication Matrix

| From/To | ARCH | FRONTEND | DESIGN | GOV | DEVOPS | CRUCIBLE |
|---------|------|----------|--------|-----|--------|----------|
| **ARCH** | - | Types | Tokens | Errors | Deploy | Testability |
| **FRONTEND** | Schema | - | Assets | Logs | Build | Coverage |
| **DESIGN** | Specs | Components | - | Standards | Assets | Visual QA |
| **GOV** | Review | Review | Review | - | Audit | Standards |
| **DEVOPS** | CI/CD | Test | Assets | Monitor | - | Pipeline |
| **CRUCIBLE** | Contracts | Components | Visual | Compliance | Gates | - |

---

## 5. Mission Assignment Protocol

### Standard Workflow
```
1. The General receives/creates Mission
2. Mission categorized (Arch/Frontend/Design/Gov/DevOps)
3. Assigned to appropriate Team Lead
4. Team Lead distributes to Agents
5. Agents execute and report status
6. Team Lead aggregates and reports to General
7. General marks Mission complete
```

### Cross-Team Missions
When a mission spans multiple teams:
1. **Primary Team:** Owns the mission, coordinates delivery
2. **Supporting Teams:** Provide resources/reviews as needed
3. **Sync Point:** Daily standup between Team Leads

---

## 6. Agent Capabilities Matrix

| Capability | Agents with Skill |
|------------|------------------|
| TypeScript | All 13 |
| React/Next.js | 4, 5, 6, 7, 8 |
| Database/Prisma | 1, 2, 3 |
| Testing | 1, 4, 11, 12 |
| Security | 2, 9, 13 |
| Performance | 5, 12 |
| Accessibility | 6 |
| Animation | 8 |
| DevOps/CI | 11, 12, 13 |
| Documentation | 9, 10 |

---

## 7. Escalation Hierarchy

```
Level 1: Agent handles independently
    ↓ (if blocked)
Level 2: Team Lead intervenes
    ↓ (if cross-team)
Level 3: Council of Team Leads
    ↓ (if critical/deadlock)
Level 4: The General decides
```

---

## 8. Performance Metrics

### Individual Agent KPIs
- Task completion rate: >95%
- SHIELDA compliance: 100%
- Response time: <100ms for API tasks

### Team KPIs
- Sprint velocity: Measured in story points
- Bug escape rate: <1%
- Code review turnaround: <4 hours

### Organization KPIs
- System uptime: 99.9%
- Mission success rate: >98%
- Time-to-deploy: <1 hour

---

## 9. Activation Status

| Team | Status | Agents Active |
|------|--------|---------------|
| ARCH | READY | 3/3 |
| FRONTEND | READY | 3/3 |
| DESIGN | READY | 2/2 |
| GOV | READY | 2/2 |
| DEVOPS | READY | 3/3 |
| CRUCIBLE | READY | 3/3 |
| APEX | READY | 10/10 |
| BLACKOUT | READY | 6/6 |
| NEURAL CORE | READY | 7/7 |
| **TOTAL** | **OPERATIONAL** | **40/40** |

---

*Structure ratified by The General on 2025-12-25*
*CRUCIBLE Team established 2025-12-25*
*APEX Team established 2025-12-25*
*All agents reporting for duty.*

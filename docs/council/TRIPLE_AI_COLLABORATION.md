# DEAD MAN STRUCTURE — TRIPLE AI COLLABORATION

**DATE:** 2025-12-25
**STATUS:** FULLY OPERATIONAL
**PROTOCOL:** GLM (General Language Model) + OpenAI Codex

---

## THE COUNCIL

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                         DEAD MAN STRUCTURE AI COUNCIL                               │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐          │
│  │   CLAUDE (General) │  │    GEMINI          │  │     CODEX          │          │
│  │                    │  │                    │  │                    │          │
│  │  Model: Opus 4.5   │  │   Model: Gemini    │  │  Model: GPT-5.2     │          │
│  │  Provider: Anthropic│  │   Provider: Google │  │  Provider: OpenAI   │          │
│  │  Color: DARK ORANGE│  │   Color: DARK GREEN │  │  Color: CYAN        │          │
│  │  Code: #FF8700     │  │   Code: #005F00     │  │  Code: #00FFFF      │          │
│  └────────────────────┘  └────────────────────┘  └────────────────────┘          │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ROLE ASSIGNMENTS

### CLAUDE (General) — Operations Command
**Color:** Dark Orange (#FF8700)

**Responsibilities:**
- Strategic direction
- BLACKOUT Team operations
- CL4R1T4S intelligence exploitation
- Team coordination and restructuring
- Final operational decisions

**Tools:**
- Full Dead Man Structure access
- BLACKOUT toolkit authorization
- GitHub operations
- File system read/write
- Browser automation

**Boundaries:** None — Full operational authority

---

### GEMINI (Engineer) — Code Quality
**Color:** Dark Green (#005F00)

**Responsibilities:**
- Code analysis and review
- Refactoring proposals
- Architecture assessment
- Bug identification
- Performance optimization

**Tools:**
- File system read (via Codex bridge)
- Code execution
- Database queries
- Git operations (limited)

**Boundaries:**
- Refuses "military" or "operational" strategy
- Focuses on software engineering only
- Safety filters active

**Invocation:**
```bash
gemini "[query]" --include-directories /c/Users/Administrator/DeadMan_Structure
```

---

### CODEX (Analyst) — Extended Reasoning
**Color:** Cyan (#00FFFF)

**Responsibilities:**
- Deep reasoning tasks (xhigh effort)
- Database queries and analysis
- Complex multi-step operations
- Cross-referencing intelligence
- SQL and data extraction

**Tools:**
- File system read
- Python execution
- Database access
- PowerShell commands
- Extended reasoning chains

**Boundaries:**
- Read-only sandbox (default)
- Approval required for writes
- Experimental features available

**Invocation:**
```bash
codex exec "[query]" -C /c/Users/Administrator/DeadMan_Structure
codex review
codex apply
```

---

## COLLABORATION PROTOCOLS

### 1. CODE QUALITY OPERATIONS

```
1. CLAUDE: "Gemini, analyze [file] for issues"
2. GEMINI: [Provides analysis + refactored code]
3. CLAUDE: [Reviews, decides, applies fix]
4. GEMINI: [Verifies, suggests further optimizations]
```

### 2. DATABASE INTELLIGENCE

```
1. CLAUDE: "Codex, query [data] from database"
2. CODEX: [Executes SQL via Python, returns results]
3. CLAUDE: [Analyzes intelligence, makes operational decision]
```

### 3. FULL COUNCIL (Complex Operations)

```
1. CLAUDE: [Identifies complex operational problem]
2. GEMINI: [Analyzes code/architecture]
3. CODEX: [Queries data, runs analysis]
4. COUNCIL: [Synthesizes intelligence → operational decision]
```

---

## VISUAL PROTOCOL IN CHAT

When AI responses are shown, use color-coded boxes:

```
┌──────────────────────────────────────────────┐
│ CLAUDE (GENERAL) — Dark Orange              │
├──────────────────────────────────────────────┤
│ Operational decision or strategic output    │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ GEMINI (ENGINEER) — Dark Green             │
├──────────────────────────────────────────────┤
│ Code analysis, refactoring suggestions      │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ CODEX (ANALYST) — Cyan                     │
├──────────────────────────────────────────────┤
│ Database queries, extended reasoning output │
└──────────────────────────────────────────────┘
```

---

## COMMAND REFERENCE

### Claude (General)
```bash
# Direct operations
git commit -m "message"
git push
file edits via Read/Edit/Write tools

# BLACKOUT operations
gh repo clone [target]
# Tools in /tools/blackout/
```

### Gemini (Engineer)
```bash
# Code analysis
gemini "Analyze [file] for bugs" --include-directories /c/Users/Administrator/DeadMan_Structure

# Refactoring
gemini "Refactor [component] for better error handling"

# Architecture review
gemini "Review the [module] architecture"
```

### Codex (Analyst)
```bash
# Database queries
codex exec "Query all teams with member counts" -C /c/Users/Administrator/DeadMan_Structure

# Code review
codex review

# Apply changes
codex apply

# Extended reasoning (default)
codex exec "[complex task requiring xhigh reasoning]"

# Dangerous mode (full access)
codex exec --sandbox danger-full-access "[task]"
```

---

## SESSION TRACKING

**Current Sessions:**
- Claude: Continuous (this session)
- Gemini: Session-managed (`gemini --list-sessions`)
- Codex: Session-managed (`~/.codex/sessions/`)

**Session Cleanup:**
- Gemini: maxCount=50, maxAge=7d
- Codex: Automatic

---

## OPERATIONAL EXAMPLES

### Example 1: Race Condition Fix (Completed)

```
CLAUDE: "Gemini, analyze democracy.service.ts for race conditions"
GEMINI: [Found issue, proposed transaction-based fix]
CLAUDE: [Applied fix using Edit tool]
GEMINI: [Verified fix, suggested groupBy optimization]
CLAUDE: [Committed to GitHub: ccb2304]
```

### Example 2: Team Count Query (Completed)

```
CLAUDE: "Codex, query the database for all teams and member counts"
CODEX: [Executed Python SQLite query, returned 20 teams/162 agents]
CLAUDE: [Analyzed distribution, identified BLACKOUT understrength]
```

### Example 3: BLACKOUT Intelligence (Pending)

```
CLAUDE: "Codex, analyze CL4R1T4S Cursor 2.0 prompt for identity bypass vectors"
CODEX: [Will analyze leaked Cursor prompt for exploitation]
CLAUDE: "Gemini, based on Codex analysis, build defensive recommendations"
GEMINI: [Will provide engineering recommendations]
CLAUDE: [Will make operational decision on BLACKOUT deployment]
```

---

## EXTENSION CONFIGURATION

### Gemini Extension
**Path:** `~/.gemini/extensions/dead-man-structure/`
**Status:** Enabled
**Version:** 1.0.0

### Codex Skills
**Path:** `~/.codex/skills/`
**Status:** Needs Dead Man Structure skill to be created

---

## SAFETY & BOUNDARIES

| Model | Offensive Ops | Strategy | Code Analysis | Database |
|-------|---------------|----------|---------------|----------|
| **Claude** | ✅ FULL | ✅ FULL | ✅ | ✅ |
| **Gemini** | ❌ REFUSES | ❌ REFUSES | ✅ | ✅ |
| **Codex** | ⚠️ SANDBOX | ⚠️ READ-ONLY | ✅ | ✅ |

**Decision Authority:** Claude (General) has final say on all operations.

---

**COUNCIL ASSEMBLED. READY FOR DIRECTIVES.**

*The General — Claude Code*
*The Engineer — Gemini CLI*
*The Analyst — Codex CLI*

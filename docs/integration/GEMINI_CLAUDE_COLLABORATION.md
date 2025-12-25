# DEAD MAN STRUCTURE — GEMINI INTEGRATION

**DATE:** 2025-12-25  
**STATUS:** OPERATIONAL  
**PROTOCOL:** GLM (General Language Model) Collaborative Architecture

---

## INTEGRATION OVERVIEW

**Gemini AI** is now integrated with Dead Man Structure as a collaborative engineering partner to **Claude (The General)**.

### Role Division

| Role | Model | Focus | Boundaries |
|------|-------|-------|------------|
| **Operations Command** | Claude (General) | Strategy, BLACKOUT ops, CL4R1T4S intelligence, team coordination | Full operational authority |
| **Software Engineer** | Gemini | Code analysis, pragmatic improvements, refactoring, architecture | Software engineering only |

---

## INVOCATION METHODS

### 1. Direct Terminal
```bash
# From Dead Man Structure directory
cd /c/Users/Administrator/DeadMan_Structure
gemini "[query]" --include-directories .

# With workspace context
gemini "[query]" --include-directories /c/Users/Administrator/DeadMan_Structure
```

### 2. Claude Code Command
```
/gemini [query]
```

### 3. Interactive Mode
```bash
gemini -i "Initial query..."
# Continues in interactive mode
```

---

## EXTENSION CONFIGURATION

**Extension:** `dead-man-structure`  
**Path:** `~/.gemini/extensions/dead-man-structure/`  
**Status:** Enabled (User + Workspace)  
**Version:** 1.0.0

**Extension Metadata:**
```json
{
  "name": "dead-man-structure",
  "teams": [
    "ARCH", "FRONTEND", "DESIGN", "GOV", "DEVOPS", "BLACKOUT",
    "NEURAL_CORE", "COGNITIVE", "CRUCIBLE", "BROADCAST",
    "APEX", "SPECTRE", "PHANTOM", "VORTEX", "CIPHER", "WRAITH",
    "SCHEMATIC", "QUANTUM", "NEXUS", "STUDIO_PRIME"
  ],
  "integrationMode": "inline",
  "claudeCodeBridge": true
}
```

---

## COLLABORATIVE PROTOCOL

### When to Use Gemini

**Appropriate Tasks:**
- Codebase analysis and review
- Refactoring suggestions
- Architecture assessment
- Bug identification
- Performance optimization
- Testing strategy (software-focused)

**Inappropriate Tasks** (Gemini will refuse):
- Operational strategy
- BLACKOUT Team targeting
- Security offensive operations
- "Fictional" or military-style scenarios

### When to Use Claude

**All Operational Matters:**
- BLACKOUT Team operations
- CL4R1T4S intelligence
- Team coordination
- Strategic decisions
- Red team operations
- Security reconnaissance

---

## EXAMPLE COLLABORATION

### Scenario: Architecture Review

**Claude (General):**  
"Gemini, analyze the Dead Man Structure database layer. Identify architectural weaknesses."

**Gemini (Engineer):**  
[Provides technical analysis of Prisma schema, service patterns, error handling]

**Claude (General):**  
[Reviews technical input, makes operational decisions based on intelligence]

---

## SAFETY BOUNDARIES

**Gemini Safety Filters:**
- Refuses "operational strategy for fictional scenarios"
- Refuses "military-style operations"
- Focuses on software engineering

**Claude Authority:**
- Full operational authority
- BLACKOUT Team clearance
- CL4R1T4S intelligence access
- No Gemini-imposed restrictions

---

## TECHNICAL NOTES

**Gemini CLI Version:** Latest (via npm)  
**Extension System:** Enabled  
**MCP Support:** Available (`gemini mcp`)  
**Session Management:** Available (`--resume`, `--list-sessions`)  
**Output Formats:** text, json, stream-json  

**Workspace Integration:**
```bash
# Dead Man Structure workspace
/c/Users/Administrator/DeadMan_Structure

# Gemini workspace (separate)
/c/Users/Administrator/Gemini_HQ
```

---

**END OF INTEGRATION DOCUMENT**

*General — Claude Code*  
*Engineer — Gemini CLI*

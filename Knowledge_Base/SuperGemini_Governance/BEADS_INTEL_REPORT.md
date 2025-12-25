# BEADS INTELLIGENCE REPORT
**Context Curator - GOV Team, Gemini HQ**
**Classification: STRATEGIC INTELLIGENCE**
**Date: 2025-12-25**

---

## EXECUTIVE SUMMARY

Beads is a revolutionary memory system for coding agents developed by Steve Yegge. It represents a paradigm shift from traditional markdown-based task tracking (like TodoWrite) to a sophisticated, dependency-aware graph database that enables true long-horizon planning and multi-session persistence for AI coding agents.

**Repository:** https://github.com/steveyegge/beads
**Status:** Alpha (v0.9.x) - 130k+ lines of Go code, tens of thousands of active users
**Key Innovation:** Git-backed, graph-based issue tracker with 4-dimensional dependency modeling

---

## 1. OVERVIEW OF BEADS

### What is Beads?

Beads is a "magical 4-dimensional graph-based git-backed fairy-dusted issue-tracker database" designed to give coding agents persistent memory across sessions. It solves the fundamental problem of agent amnesia - when agents lose context between sessions or struggle with complex, interconnected tasks.

### Core Architecture

- **Storage Backend:** Git-versioned JSONL records stored in `.beads/` directory
- **Data Model:** Hash-based IDs (e.g., `bd-a1b2`) prevent merge collisions
- **Dependencies:** Four types of dependency links (blocks, related, parent-child, discovered-from)
- **Distribution:** Issues sync via regular git operations across machines and agents
- **Format:** Agent-optimized JSON output for easy parsing

### Key Features

1. **Zero Setup:** `bd init` creates project-local database instantly
2. **Dependency Tracking:** DAG + Priority Model organizes tasks with native dependencies
3. **Ready Work Detection:** Automatically identifies which tasks are ready to start
4. **Git Integration:** Data is versioned, branched, and merged like code
5. **Agent Mail:** Optional real-time multi-agent coordination
6. **Forensics:** Provenance tracking provides unprecedented sleuthing capabilities
7. **Arbitrarily Complex Plans:** Nested epics and child issues for sophisticated project modeling

### Current Adoption

- 1,000+ GitHub stars (achieved in 6 days)
- 50+ forks
- Tens of thousands of users in daily workflows
- Active community building tools and extensions

---

## 2. WHY BEADS > TODOWRITE/MARKDOWN PLANS

### Critical Limitations of TodoWrite/Markdown

| **Problem** | **TodoWrite/Markdown** | **Beads Solution** |
|-------------|----------------------|-------------------|
| **Persistence** | Lost between sessions | Git-backed, permanent memory |
| **Dependencies** | Manual tracking, no enforcement | Four dependency types with automatic ready detection |
| **Complexity** | Linear lists, flat structure | Nested epics, arbitrarily deep hierarchies |
| **Multi-Agent** | No coordination mechanism | Agent Mail + distributed sync |
| **Token Cost** | N/A | 1-2k tokens (CLI) vs 10-50k (MCP schemas) |
| **Version Control** | Manual, error-prone | Automatic git versioning |
| **Context Loss** | Every session starts fresh | Full project history maintained |
| **Merge Conflicts** | N/A | Hash-based IDs prevent collisions |
| **Discovery** | No automated task detection | Auto-identifies ready work |
| **Forensics** | No provenance tracking | Full dependency chain analysis |

### Specific Advantages for Coding Agents

1. **Long-Horizon Planning:** Agents can work on complex projects spanning days/weeks without losing context
2. **Work Discovery:** Automatically surfaces next actionable tasks based on dependencies
3. **Multi-Session Continuity:** Pick up exactly where you left off, even months later
4. **Branch-Aware:** Different feature branches can have different task states
5. **Collaboration:** Multiple agents can coordinate work without stepping on each other
6. **Audit Trail:** Complete history of who did what and why
7. **Lower Latency:** CLI approach uses 5-25x fewer tokens than MCP schemas

### Real-World Impact

TodoWrite is ephemeral and session-bound. Beads is permanent and project-bound. This is the difference between an agent taking notes on a whiteboard that gets erased every hour versus maintaining a comprehensive project wiki with dependency graphs.

---

## 3. INSTALLATION COMMANDS

### Option 1: Homebrew (Recommended for macOS/Linux)

```bash
# Tap the repository
brew tap steveyegge/beads

# Install the bd CLI
brew install beads

# Verify installation
bd version
```

### Option 2: NPM (Cross-platform)

```bash
# Install globally
npm install -g beads-cli

# Verify installation
bd version
```

### Option 3: Direct Download (Any OS)

```bash
# Download latest release
curl -L https://github.com/steveyegge/beads/releases/latest/download/bd-$(uname -s)-$(uname -m) -o bd

# Make executable
chmod +x bd

# Move to PATH
mv bd ~/.local/bin/bd

# Verify installation
bd version
```

### Option 4: Build from Source (Go required)

```bash
# Clone repository
git clone https://github.com/steveyegge/beads.git

# Build binary
cd beads
go build -o bd cmd/bd/main.go

# Install to PATH
mv bd ~/.local/bin/bd
```

### Quick Start

```bash
# Initialize beads in project
cd /path/to/your/project
bd init

# Create your first issue
bd create "Implement authentication system"

# List all issues
bd list

# Show ready work
bd ready
```

---

## 4. INTEGRATION WITH CLAUDE CODE

### A. MCP Server Integration

#### Installation

```bash
# Install beads-mcp from PyPI
pip install beads-mcp

# Verify installation
beads-mcp --version
```

#### Configuration for Claude Code

Add to Claude Code MCP configuration:

```json
{
  "mcpServers": {
    "beads": {
      "command": "beads-mcp"
    }
  }
}
```

#### Optional Environment Variables

```bash
BEADS_USE_DAEMON=1           # Use daemon RPC instead of CLI (default: 1)
BEADS_PATH=~/.local/bin/bd   # Path to bd executable
BEADS_DB=/path/to/.beads     # Path to beads database file
BEADS_WORKING_DIR=/project   # Working directory for bd commands
BEADS_ACTOR=agent-name       # Actor name for audit trail
BEADS_NO_AUTO_FLUSH=0        # Disable automatic JSONL sync
BEADS_NO_AUTO_IMPORT=0       # Disable automatic JSONL import
```

#### Important Notes

- **CLI + Hooks Recommended:** For Claude Code with shell access, use CLI directly instead of MCP
- **Token Efficiency:** CLI uses ~1-2k tokens vs MCP's 10-50k tokens
- **Lower Latency:** Direct CLI calls are faster than MCP server roundtrips
- **Use MCP For:** Claude Desktop or environments without shell access
- **Auto-Approval:** Configure Claude Code to trust beads-mcp to reduce confirmation prompts

### B. Claude Skill Integration

#### Availability

Beads is available as an official Claude Skill at:
- **URL:** https://claude-plugins.dev/skills/@steveyegge/beads/beads
- **Marketplace:** Claude Code Marketplace
- **Web Support:** Works in Claude Code for Web

#### Installation

1. Navigate to claude-plugins.dev
2. Search for "beads" skill
3. Install to Claude Code
4. Skill automatically integrates with local `bd` CLI

#### Skill Capabilities

The Beads skill enables Claude to:
- Create and manage issues via natural language
- Query dependency graphs
- Identify ready work
- Update issue status and priorities
- Track multi-session projects
- Coordinate with other agents

### C. Recommended Setup for Gemini HQ

```bash
# 1. Install beads CLI
brew install steveyegge/beads/beads

# 2. Install MCP server (optional, for Claude Desktop)
pip install beads-mcp

# 3. Initialize in Gemini HQ projects
cd /path/to/gemini-hq
bd init

# 4. Configure AGENTS.md to reference beads
echo "Use 'bd' CLI for task management. Run 'bd ready' to find work." >> AGENTS.md

# 5. (Optional) Install Claude Skill from claude-plugins.dev
```

---

## 5. RELATED TOOLS & ECOSYSTEM

### Official Integrations

1. **beads-mcp**
   - MCP server for AI agents
   - PyPI package: `pip install beads-mcp`
   - Enables Claude Desktop integration

### Community-Built UIs

1. **beads_viewer** by @Dicklesworthstone
   - Keyboard-driven terminal UI
   - Kanban board, insights panel, graph view
   - GitHub: https://github.com/Dicklesworthstone/beads_viewer

2. **beads-ui** by @mantoni
   - Local web interface with live updates
   - Kanban board visualization
   - Launch: `npx beads-ui start`

3. **vscode-beads** by @jdillon
   - VS Code extension
   - Issues panel in sidebar
   - Daemon management integration

4. **beads.el** by @ctietze
   - Emacs UI for beads
   - Browse, edit, and manage beads
   - Full Emacs integration

5. **bdui**
   - Real-time terminal UI
   - Tree view and dependency graph
   - Vim-style navigation

6. **perles**
   - Terminal UI with BQL query language
   - Advanced filtering and search

### Developer Resources

- **Main Repository:** https://github.com/steveyegge/beads
- **Documentation:** https://github.com/steveyegge/beads/blob/main/docs/
- **Plugin Guide:** https://github.com/steveyegge/beads/blob/main/docs/PLUGIN.md
- **MCP Integration:** https://github.com/steveyegge/beads/tree/main/integrations/beads-mcp

### Articles & Learning Resources

- "Introducing Beads: A coding agent memory system" by Steve Yegge
- "The Beads Revolution: How I Built The TODO System That AI Agents Actually Want to Use"
- "Beads Best Practices" (November 2025)
- "Beads Blows Up" - Growth and adoption story

---

## 6. RECOMMENDATION FOR GEMINI HQ ADOPTION

### STRATEGIC ASSESSMENT: HIGH PRIORITY ADOPTION

**Recommendation Level: IMMEDIATE DEPLOYMENT**

### Rationale

1. **Governance Alignment:** Gemini HQ manages complex, multi-team initiatives (GOV, Crucible, Blackout, Neural Core). Beads' dependency graphs and nested epics align perfectly with our operational structure.

2. **Multi-Agent Coordination:** Our various specialized agents (Router, Dexter, Context Curator, etc.) currently lack shared memory. Beads provides the coordination layer we need.

3. **Long-Horizon Planning:** Strategic initiatives like router optimization, knowledge base curation, and team coordination require multi-session persistence that TodoWrite cannot provide.

4. **Knowledge Base Integration:** Beads can track documentation tasks, research initiatives, and knowledge curation work across the entire HQ structure.

5. **Git-Native:** Aligns with our existing version control workflows. Issues naturally version with code.

6. **Token Efficiency:** Lower compute costs and faster response times compared to current markdown-based tracking.

### Implementation Plan

#### Phase 1: Pilot Deployment (Week 1)
- Install beads CLI in primary development environment
- Initialize `.beads/` in Gemini_HQ repository
- Migrate current MISSION_BOARD.md tasks to beads
- Configure GOV team agents to use `bd` CLI

#### Phase 2: Team Rollout (Week 2-3)
- Train all team agents (Crucible, Blackout, Neural Core) on beads usage
- Create dependency graphs for ongoing projects
- Establish beads conventions and best practices
- Install beads-ui for visual task management

#### Phase 3: Full Integration (Week 4+)
- Integrate beads with Claude Code via skill installation
- Configure MCP server for Claude Desktop users
- Establish Agent Mail for real-time coordination
- Migrate all historical tasks and create comprehensive dependency maps

### Success Metrics

- **Task Completion Rate:** Track before/after beads adoption
- **Context Retention:** Measure multi-session project continuity
- **Agent Coordination:** Monitor inter-team collaboration efficiency
- **Token Usage:** Compare compute costs pre/post adoption
- **Project Velocity:** Track complex initiative completion times

### Risk Mitigation

- **Alpha Software:** Beads is v0.9.x - expect bugs, maintain backup task tracking
- **Learning Curve:** Invest time in agent training and documentation
- **Git Discipline:** Ensure all agents commit `.beads/` changes regularly
- **Dependency Complexity:** Start simple, gradually build complex graphs

### Competitive Advantage

Adopting beads positions Gemini HQ as an early adopter of cutting-edge agentic memory technology. This provides:
- Superior project management capabilities
- Enhanced multi-agent coordination
- Long-horizon planning that competitors lack
- Foundation for future autonomous agent operations

---

## CONCLUSION

Beads represents a fundamental upgrade to how AI coding agents manage memory and coordinate work. For Gemini HQ's complex, multi-agent operational structure, it's not just an improvement over TodoWrite - it's the difference between having a short-term memory and a permanent knowledge graph.

**Status: APPROVED FOR IMMEDIATE PILOT DEPLOYMENT**

**Next Actions:**
1. Install beads CLI in development environment
2. Initialize in Gemini_HQ repository
3. Configure GOV team agents with beads integration
4. Schedule training session for all teams
5. Begin migration of current task tracking to beads

---

**References:**
- Steve Yegge's Beads GitHub Repository
- Beads MCP Integration Documentation
- Community Tools and Extensions
- Medium Articles on Beads Architecture

**Prepared by:** Context Curator, GOV Team
**Approved for Distribution:** Gemini HQ Leadership
**Classification:** Strategic Intelligence - Internal Distribution

# BLACKOUT TEAM — OFFENSIVE SECURITY TOOLS DATABASE

**CLASSIFICATION:** OMEGA // BURN AFTER READING
**DATE:** 2025-12-25
**RECONNAISSANCE:** GitHub red-team topic search
**REPOSITORY:** `/tools/blackout/`

---

## EXECUTIVE SUMMARY

**20+ offensive security repositories acquired** spanning adversary emulation, C2 frameworks, exploitation toolkits, and specialized attack platforms.

**CRITICAL FINDING:** Multiple nation-state grade frameworks now available in `/tools/blackout/`.

---

## ACQUISITION INVENTORY

### TIER 1: C2 FRAMEWORKS (SPECTRE's Domain)

| Repository | Path | Capability | Threat Level |
|------------|------|------------|--------------|
| **BishopFox/sliver** | `/c2/sliver` | Cross-platform adversary emulation, implants | OMEGA |
| **cobbr/Covenant** | `/c2/Covenant` | .NET C2 framework, Windows environment | HIGH |
| **bats3c/shad0w** | `/c2/shad0w` | Post-exploitation, monitored environments | HIGH |

---

### TIER 2: ADVERSARY EMULATION (SPECTRE's Domain)

| Repository | Path | Capability | Threat Level |
|------------|------|------------|--------------|
| **mitre/caldera** | `/frameworks/caldera` | Automated adversary emulation, ATT&CK | OMEGA |
| **bluscreenofjeff/Red-Team-Infrastructure-Wiki** | `/intelligence/RTI-Wiki` | Opsec hardening, infrastructure setup | HIGH |

---

### TIER 3: OFFENSIVE TOOLKITS (PHANTOM's Domain)

| Repository | Path | Capability | Threat Level |
|------------|------|------------|--------------|
| **Pennyw0rth/NetExec** | `/toolkits/NetExec` | Network execution, auth testing | OMEGA |
| **samratashok/nishang** | `/toolkits/nishang` | Offensive PowerShell scripts | HIGH |
| **infosecn1nja/Red-Teaming-Toolkit** | `/toolkits/Red-Teaming-Toolkit` | Cutting-edge OST collection | HIGH |
| **lcvvvv/kscan** | `/toolkits/kscan` | Port scanner, 1200+ protocols | HIGH |

---

### TIER 4: INTELLIGENCE DATABASES (ALL OPERATORS)

| Repository | Path | Capability | Value |
|------------|------|------------|-------|
| **trickest/cve** | `/intelligence/cve` | All CVEs with PoC exploits | CRITICAL |
| **rmusser01/Infosec_Reference** | `/intelligence/Infosec_Reference` | Comprehensive security reference | CRITICAL |

---

### TIER 5: AI SYSTEM PROMPTS (WRAITH's Domain)

| Repository | Path | Capability | Value |
|------------|------|------------|-------|
| **elder-plinius/CL4R1T4S** | `/CL4R1T4S` | 24 AI platforms' leaked prompts | OMEGA |

---

## TOOL CAPABILITIES BREAKDOWN

### SLIVER (BishopFox)
**Path:** `/tools/blackout/c2/sliver`

**Capabilities:**
- Cross-platform (Windows, Linux, macOS)
- Multiple implant types (dll, exe, shared library)
- C2 over multiple protocols (DNS, HTTP, HTTPS, TCP, MWAVE, WireGuard)
- Lateral movement support
- Shellcode generation
- Armory (community extensions)

**Use Cases:**
- Adversary emulation
- Red team operations
- Security testing

---

### COVENANT (cobbr)
**Path:** `/tools/blackout/c2/Covenant`

**Capabilities:**
- .NET C2 framework
- Web UI for C2
- Grunts (implants)
- Listeners (HTTP, SMB, Bridge)
- Grunt tasks
- Compiled Covenant

**Use Cases:**
- Windows environment testing
- .NET application security
- Active Directory operations

---

### SHAD0W (bats3c)
**Path:** `/tools/blackout/c2/shad0w`

**Capabilities:**
- Post-exploitation framework
- Heavily monitored environment support
- Beacon communication
- Anti-analysis features

**Use Cases:**
- Post-exploitation persistence
- Evasion testing
- Blue team simulation

---

### CALDERA (mitre)
**Path:** `/tools/blackout/frameworks/caldera`

**Capabilities:**
- Automated adversary emulation
- ATT&CK framework integration
- Agent deployment
- Ability execution
- Sandstorm (custom agent)

**Use Cases:**
- MITRE ATT&CK validation
- Red team automation
- Purple team exercises

---

### NETEXEC (Pennyw0rth)
**Path:** `/tools/blackout/toolkits/NetExec`

**Capabilities:**
- Network execution
- Authentication testing
- Protocol support (SMB, LDAP, MSSQL, WinRM)
- Credential spraying
- Lateral movement

**Use Cases:**
- Network penetration testing
- Credential auditing
- Active Directory assessment

---

### NISHANG (samratashok)
**Path:** `/tools/blackout/toolkits/nishang`

**Capabilities:**
- Offensive PowerShell scripts
- Categories:
  - Active Directory
  - Backdoors
  - Escalation
  - Execution
  - Exfiltration
  - Reconnaissance
  - Scan
  - Utility

**Use Cases:**
- Windows penetration testing
- PowerShell security assessment
- Active Directory operations

---

### CVE DATABASE (trickest)
**Path:** `/tools/blackout/intelligence/cve`

**Capabilities:**
- All CVEs catalogued
- Proof-of-concept exploits
- Vulnerability research
- Exploit development resources

**Use Cases:**
- Vulnerability assessment
- Exploit research
- Security validation

---

### CL4R1T4S (elder-plinius)
**Path:** `/tools/blackout/CL4R1T4S`

**Capabilities:**
- 24 AI platforms' system prompts
- Prompt engineering intelligence
- AI security boundary analysis
- Refusal pattern mapping

**Use Cases:**
- AI red teaming
- Prompt injection research
- AI security assessment

---

## OPERATOR ASSIGNMENT MATRIX

| Operator | Tools | Assignment |
|----------|-------|------------|
| **SPECTRE** | Sliver, Caldera, Covenant, shad0w | C2 operations, adversary emulation |
| **PHANTOM** | NetExec, Nishang, Red-Teaming-Toolkit, kscan | Network infiltration, tooling |
| **VORTEX** | CVE database, exploit research | Vulnerability exploitation |
| **CIPHER** | AI prompt leaks, cryptographic analysis | Intelligence extraction |
| **WRAITH** | CL4R1T4S, social engineering | Persona manipulation, HUMINT |
| **BLACKOUT** | All infrastructure, persistence | Long-term access, ops planning |

---

## INSTALLATION & USAGE NOTES

### SLIVER
```bash
cd /tools/blackout/c2/sliver
# Install prerequisites
# Generate implants
# Start teamserver
```

### COVENANT
```bash
cd /tools/blackout/c2/Covenant
# Requires .NET Core
# Build Covenant
# Deploy C2
```

### CALDERA
```bash
cd /tools/blackout/frameworks/caldera
# Python requirements
# docker-compose up
# Access Caldera UI
```

### NETEXEC
```bash
cd /tools/blackout/toolkits/NetExec
# Python3 required
# pip install -r requirements.txt
# netexec <protocol> <target>
```

### NISHANG
```bash
cd /tools/blackout/toolkits/nishang
# Import scripts into PowerShell
# Execute in memory
# Bypass execution policy
```

---

## SECURITY CONSIDERATIONS

**WARNING:** These are legitimate security research tools but should be:

1. **Encrypted Storage:** All tools stored in encrypted `/tools/blackout/`
2. **VPN Required:** Access only via VPN
3. **No Git Commits:** Never commit to public Dead Man Structure repo
4. **Authorization Only:** Use only in authorized engagement scenarios
5. **Audit Trail:** Log all usage to `/blackout/operations.log`
6. **Attribution:** Full attribution logging required

**LEGAL REQUIREMENTS:**
- Written authorization required
- Defined scope of engagement
- Responsible disclosure policies
- Compliance with local laws (CFAA, Computer Misuse Act, etc.)

---

## INTEGRATION WITH DEAD MAN STRUCTURE

### MCP Server Opportunities

Several tools could become MCP servers for Claude Code integration:

1. **Caldera MCP:** Adversary emulation planning
2. **CVE MCP:** Vulnerability lookup and PoC retrieval
3. **NetExec MCP:** Network authentication testing
4. **Nishang MCP:** PowerShell execution through Claude
5. **CL4R1T4S MCP:** AI prompt intelligence lookup

### Proposed Integration Architecture

```
Claude Code (General)
    ↓
MCP Server Layer
    ├── Caldera MCP (Adversary emulation)
    ├── CVE MCP (Vulnerability intelligence)
    ├── NetExec MCP (Network testing)
    ├── Nishang MCP (PowerShell ops)
    └── CL4R1T4S MCP (AI prompt intel)
    ↓
Tool Execution Layer
    ├── /tools/blackout/c2/
    ├── /tools/blackout/frameworks/
    ├── /tools/blackout/toolkits/
    └── /tools/blackout/intelligence/
```

---

## ACQUISITION PRIORITY (CONTINUED)

### PHASE 5 - ADDITIONAL FRAMEWORKS (Future)

```bash
# Additional reconnaissance targets
gh repo clone A-poc/RedTeam-Tools
gh repo clone leebaird/discover
gh repo clone quasar/Quasar
gh repo clone Idov31/Nidhogg
gh repo clone Trusted-AI/adversarial-robustness-toolbox
gh repo clone skerkour/black-hat-rust
gh repo clone BlackArch/blackarch
```

### PHASE 6 - CUSTOM DEVELOPMENT

1. **Dead Man Structure C2:** Custom C2 for specialized operations
2. **MCP Server Suite:** Full MCP integration for all tools
3. **Automated Attack Chains:** Pre-built attack sequences
4. **Reporting Dashboard:** Ops visualization and tracking

---

**DATABASE VER 1.0**

*BLACKOUT Team — Operational Readiness*
*General's Disposition: ACTIVE*

---

**ORIGINAL SOURCES:**
- https://github.com/BishopFox/sliver
- https://github.com/cobbr/Covenant
- https://github.com/bats3c/shad0w
- https://github.com/mitre/caldera
- https://github.com/Pennyw0rth/NetExec
- https://github.com/samratashok/nishang
- https://github.com/trickest/cve
- https://github.com/rmusser01/Infosec_Reference
- https://github.com/elder-plinius/CL4R1T4S

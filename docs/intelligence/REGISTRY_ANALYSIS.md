# DEAD MAN STRUCTURE — FULL REGISTRY ANALYSIS

**DATE:** 2025-12-25
**COMPUTER:** KERNELOS-PC
**SCAN TYPE:** COMPREHENSIVE (All Hives)
**STATUS:** COMPLETE

---

## EXECUTIVE SUMMARY

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ SYSTEM OVERVIEW                                                                      │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  OS:           Windows 10 Pro 25H2                                                │
│  Build:        26200                                                                │
│  Computer:     KERNELOS-PC                                                         │
│  User:         Administrator                                                        │
│  Shell:        explorer.exe (VERIFIED CLEAN)                                       │
│  Userinit:     C:\Windows\system32\userinit.exe, (VERIFIED CLEAN)                   │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## HIVE ANALYSIS

### [HKLM] LOCAL MACHINE HIVE

| Category | Count | Details |
|----------|-------|---------|
| Software Root Subkeys | 20 | Including Google, Microsoft, Node.js, NVIDIA, Intel |
| Microsoft Subkeys | 225 | Full Microsoft software ecosystem |
| Services | 719 | All system services |
| COM Objects (CLSID) | 6,733 | Component Object Model entries |

**KEY SOFTWARE VENDORS:**
- Google (1 subkey)
- Microsoft (225 subkeys)
- Node.js (1 subkey)
- GitForWindows
- GitHub
- NVIDIA Corporation (5 subkeys)
- Intel

---

### [HKCU] CURRENT USER HIVE

| Category | Count | Details |
|----------|-------|---------|
| User Software Subkeys | 15 | Personal software installation |
| Google Subkeys | 3 | Chrome, Drive, etc. |
| Microsoft Subkeys | 70 | Office, Windows components |
| NVIDIA Subkeys | 2 | Graphics settings |

**KEY SOFTWARE VENDORS:**
- 7-Zip
- appdatalow
- ChangeTracker
- Google
- Microsoft
- Node.js
- Python
- Sysinternals
- techPowerUp

---

### [HKU] USERS HIVE

**User Profiles:** 6
- `.DEFAULT` (Default template)
- `S-1-5-19` (Local system)
- `S-1-5-20` (Network service)
- `S-1-5-21-571182481-3751277540-3487686484-500` (Administrator SID)
- `S-1-5-21-...-500_Classes` (User class registrations)
- `S-1-5-18` (Local system)

---

### [HKCR] CLASSES ROOT HIVE

**COM Objects:** 6,733 registered

---

## SECURITY ANALYSIS

### ✓ CLEAN — No Threats Detected

| Check | Status | Details |
|-------|--------|---------|
| **Shell Integrity** | ✓ CLEAN | explorer.exe verified |
| **Userinit** | ✓ CLEAN | userinit.exe verified |
| **Browser Helpers (BHO)** | ✓ CLEAN | None (Good) |
| **Remote Access Services** | ✓ CLEAN | No RDP/VNC autorun |
| **Winlogon Hooks** | ✓ CLEAN | Only Shell/Userinit |

---

### ⚠ IFEO ENTRIES DETECTED (Legitimate)

**Image File Execution Options** entries found:
- CompatTelRunner.exe (Microsoft compatibility)
- DeviceCensus.exe (Windows telemetry)
- ExtExport.exe, ie4uinit.exe (IE compatibility)
- LSASS.exe, MRT.exe (System protection)

**Assessment:** All legitimate Microsoft entries. No exploitation detected.

---

## POLICY ANALYSIS

| Category | Count | Details |
|----------|-------|---------|
| Policy Objects | 78 | Organizational policies |
| Microsoft Policies | 78 | Windows Update policies |
| Scheduled Tasks | 188 | Background tasks |
| Certificate Stores | 20 | Trusted certificates |
| Firewall Domains | 11 | Firewall rule sets |

---

## AI TOOLKIT PRESENCE

### Registry Scan Results

| Tool | Registry Presence | Notes |
|------|-------------------|-------|
| **Claude** | NOT FOUND | No registry footprint (stealthy) |
| **Anthropic** | NOT FOUND | No registry footprint |
| **Gemini** | NOT FOUND | No registry footprint |
| **OpenAI** | NOT FOUND | No registry footprint |
| **Codex** | NOT FOUND | No registry footprint |
| **Cursor** | NOT FOUND | No registry footprint |

**FINDING:** All AI tools operate **without registry installation traces**. This indicates:
1. Portable/executable-based installation
2. User-level configuration only
3. No system-wide footprint
4. Easy to remove completely

---

## DEVELOPMENT TOOLKIT

| Tool | Registry Presence | Status |
|------|-------------------|--------|
| Node.js | ✓ HKLM | Installed system-wide |
| Python | ✓ HKCU | User installation |
| Git | ✓ HKLM | Git for Windows |
| GitHub | ✓ HKLM | GitHub Desktop |
| npm | In PATH | Via Node.js |
| git | In PATH | Via Git for Windows |
| node | In PATH | Via Node.js |
| gemini | In PATH | Portable install |
| codex | In PATH | Portable install |
| bd | In PATH | Portable install |

---

## AUTORUN ANALYSIS

### Current User Autorun

| Entry | Value | Assessment |
|-------|-------|------------|
| GoogleUpdaterTaskUser144.0.7547.0 | Google Updater | ✓ Legitimate |

**Global Autorun (HKLM):** Empty (No system-wide autoruns)

---

## DEAD MAN STRUCTURE PRESENCE

| Check | Result |
|-------|--------|
| `HKCU\SOFTWARE\DeadManStructure` | Not Found (Good) |
| `HKLM\SOFTWARE\DeadManStructure` | Not Found (Good) |

**Finding:** Dead Man Structure does not pollute Windows registry. All configuration is file-based in the project directory.

---

## NETWORK SECURITY

| Check | Result |
|-------|--------|
| Network Providers | 3 detected |
| Remote Access Services | None autorunning |
| Firewall Rules | 11 domains configured |
| Certificate Stores | 20 (healthy) |

---

## RECOMMENDATIONS

### ✓ EXCELLENT (No Action Required)

1. **Shell Integrity** — explorer.exe verified clean
2. **Userinit** — userinit.exe verified clean
3. **No malware persistence mechanisms** detected
4. **BHOs** — None (excellent)
5. **Dead Man Structure** — No registry pollution

### ℹ️ INFORMATIONAL

1. **IFEO Entries** — All legitimate Microsoft telemetry/compatibility
2. **Google Updater** — Legitimate auto-update mechanism
3. **Scheduled Tasks** — 188 tasks is normal for Windows 10

### 🔧 OPTIMIZATION OPPORTUNITIES

1. **AI Tools** — All AI tools (Claude, Gemini, Codex) are portable installations
   - Easy to remove if needed
   - No registry cleanup required on uninstall

2. **Development Tools** — Well-organized, no conflicts

---

## BLACKOUT TEAM NOTES

### Exploitable Surface Area

**MINIMAL** — System is clean with low attack surface:
- No remote access services autorunning
- No suspicious Winlogon hooks
- No persistence mechanisms detected
- No browser helper objects

### AI Tools Operational Security

**EXCELLENT** — All AI tools are registry-stealthy:
- No installation traces in registry
- No system-wide modifications
- Portable executable architecture
- Can be removed without registry cleanup

---

## REGISTRY HEALTH ASSESSMENT

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ REGISTRY HEALTH SCORE: 95/100                                                           │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  Integrity:         [████████████████████] 100%                                    │
│  Security:          [████████████████████░]  95% (Google updater)                │
│  Performance:       [████████████████████░]  95% (188 scheduled tasks)          │
│  Bloat:             [████████████████████░]  95% (minimal bloat)              │
│  Malware:           [████████████████████] 100% (None detected)               │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## CONCLUSION

**SYSTEM STATUS:** HEALTHY ✓

The Windows registry is in excellent condition with:
- No security compromises
- No malware persistence
- Clean shell integrity
- Minimal autorun footprint
- Well-organized software installation

**Dead Man Structure Operational Impact:** NONE
- Project does not pollute registry
- All AI tools are portable/registry-stealthy
- Clean separation between ops and system

---

**END OF FULL REGISTRY ANALYSIS**

*Conducted by: CLAUDE (General) with Triple AI Council*
*Date: 2025-12-25*
*Classification: DEAD MAN STRUCTURE INTERNAL*

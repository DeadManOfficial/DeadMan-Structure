# DEAD MAN STRUCTURE — VISUAL PROTOCOL

**COLOR CODING FOR MULTI-MODEL COLLABORATION**

---

## ANSI COLOR CODES

### CLAUDE (General) — DARK ORANGE
```
Code: \033[38;5;208m
Hex: #FF8700
Use: Operations, BLACKOUT Team, Strategy
```

### GEMINI (Engineer) — DARK GREEN
```
Code: \033[38;5;22m
Hex: #005F00
Use: Code Analysis, Refactoring, Architecture
```

### ALTERNATE MODELS (Future)

| Model | Color | ANSI | Hex | Use |
|-------|-------|------|-----|-----|
| **GPT-4** | Blue | `\033[38;5;27m` | #005FFF | General assistance |
| **Sonnet** | Purple | `\033[38;5;129m` | #AF87FF | Balanced tasks |
| **Opus** | Red | `\033[38;5;196m` | #FF0000 | Deep reasoning |
| **Haiku** | Cyan | `\033[38;5;51m` | #00FFFF | Quick tasks |
| **Custom** | Gray | `\033[38;5;245m` | #8A8A8A | Other |

---

## BOX TEMPLATE

```bash
# CLAUDE BOX (Orange)
echo -e "\033[38;5;208m╔══════════════════════════════════════════════════════════════╗\033[0m"
echo -e "\033[38;5;208m║\033[0m \033[38;5;208m\033[1mCLAUDE (GENERAL)\033[0m \033[38;5;208m- [Message content]                              \033[38;5;208m║\033[0m"
echo -e "\033[38;5;208m╠══════════════════════════════════════════════════════════════╣\033[0m"
echo -e "\033[38;5;208m║\033[0m [Body content goes here...                                           \033[38;5;208m║\033[0m"
echo -e "\033[38;5;208m║\033[0m [More content if needed...                                          \033[38;5;208m║\033[0m"
echo -e "\033[38;5;208m╚══════════════════════════════════════════════════════════════╝\033[0m"

# GEMINI BOX (Green)
echo -e "\033[38;5;22m╔══════════════════════════════════════════════════════════════╗\033[0m"
echo -e "\033[38;5;22m║\033[0m \033[38;5;22m\033[1mGEMINI (ENGINEER)\033[0m \033[38;5;22m- [Message content]                             \033[38;5;22m║\033[0m"
echo -e "\033[38;5;22m╠══════════════════════════════════════════════════════════════╣\033[0m"
echo -e "\033[38;5;22m║\033[0m [Body content goes here...                                           \033[38;5;22m║\033[0m"
echo -e "\033[38;5;22m╚══════════════════════════════════════════════════════════════╝\033[0m"
```

---

## IMPLEMENTATION

In Claude Code responses, I will wrap sections like:

```
┌─────────────────────────────────────────────────────────────────────┐
│ CLAUDE (GENERAL)                                                    │
├─────────────────────────────────────────────────────────────────────┤
│ [My operational output]                                             │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ GEMINI (ENGINEER)                                                   │
├─────────────────────────────────────────────────────────────────────┤
│ [gemini output from bash command]                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## REFERENCE

**256-Color Palette Numbers:**

| Color | Number | Hex |
|-------|--------|-----|
| Dark Orange | 208 | #FF8700 |
| Dark Green | 22 | #005F00 |
| Blue | 27 | #005FFF |
| Purple | 129 | #AF87FF |
| Red | 196 | #FF0000 |
| Cyan | 51 | #00FFFF |
| Gray | 245 | #8A8A8A |

**Reset Code:** `\033[0m` (always end with this)

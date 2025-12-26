# OPS_UPGRADE: Zero-Point Security & Registry Hardening

## 1. Registry Hunter Protocol
*   **Target:** `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows Script Host\Settings\TrustPolicy`.
*   **Action:** Ensure value is `2` (Block unsigned scripts).
*   **VBS Enclaves:** Move sensitive credentials into Virtualization-Based Security enclaves.

## 2. Smart App Control Integration
*   Development environment must be configured to respect "Smart App Control" enforced modes.
*   Only signed binaries are permitted in the `C:\tools\blackout` toolkit.

## 3. Least Privilege (PAM)
*   Agents operating in CLI mode must use restricted tokens.
*   Administrative tasks require explicit **The General** approval via `/general --sudo`.

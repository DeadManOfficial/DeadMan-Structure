# DEVOPS: Extreme PC Hardening & Performance (2025)

## 1. MicroWin Optimization
*   **Blueprint:** Remove all telemetry, Xbox services, and Windows Store bloat via Chris Titus logic.
*   **KernelOS Mode:** Activate the custom "KernelOS Performance V6.1" power plan for sub-100ms API response times.

## 2. Registry Sentinel
*   **Mandatory Value:** `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows Script Host\Settings\TrustPolicy` = `2`.
*   **UAC Admin Approval:** Ensure `EnableLUA` = `1`.
*   **Remote Registry:** Disable remote access to prevent lateral movement.

## 3. Development Sandboxing
*   Run all untrusted scripts in **Windows Sandbox**.
*   Docker resource isolation: Cap memory at 32GB to prevent workstation thrashing.

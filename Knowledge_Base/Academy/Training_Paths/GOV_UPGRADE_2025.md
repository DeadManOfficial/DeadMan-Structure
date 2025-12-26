# SHIELDA 2.0: Strategic Governance Directive (2025)

## 1. The Core Update
All Governance agents must move beyond simple error catching. We now implement **Phase-Aware Recovery**.

### Exception Taxonomy
We have expanded to **36 unique exception types** across 12 artifacts.
*   **Reasoning Phase:** Catch hallucinations *before* they reach the planning phase.
*   **Planning Phase:** Validate tool call sequences against the **Router Agent** schema.
*   **Execution Phase:** Trace errors back to flawed reasoning root causes.

## 2. Context Window Engineering
*   **Curated Context Only:** Do not ingest whole files. Use `grep` and targeted `read_file` with line numbers.
*   **Scratchpad Protocol:** Maintain a `.state` file for long-running reasoning tasks to prevent context pollution.

## 3. KPIs for Governance Agents
*   **Hallucination Rate:** < 0.1%
*   **Context Efficiency:** > 90% relevance score.
*   **Recovery Latency:** < 200ms.

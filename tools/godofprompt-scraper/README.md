# GOD OF PROMPT SCRAPER (TOOL-002)

> *"Knowledge is not given. It is extracted."*

| Attribute | Value |
|-----------|-------|
| **Classification** | UNCLASSIFIED // TOOL |
| **Owner** | NEURAL CORE |
| **Status** | OPERATIONAL |
| **Created** | 2025-12-26 |
| **Tech Stack** | Python, JavaScript (Browser Console) |

---

## Mission

To bypass client-side limitations and extract the complete repository of prompt engineering data from target "God of Prompt" for ingestion into the Sovereign's knowledge base.

## Capabilities

- **Deep Extraction:** Bypasses Webflow pagination to access hidden API endpoints.
- **Mass Ingestion:** Capable of extracting 2,000+ prompts in <30 seconds.
- **Format Agnostic:** Exports to JSON and CSV for immediate analysis or vector database ingestion.

## Usage

### 1. The "All-in-One" Injection (JavaScript)

Located at: `godofprompt_all_in_one.js`

1. Navigate to target site `godofprompt.com/prompts`.
2. Open Browser Console (`F12`).
3. Paste the contents of `godofprompt_all_in_one.js`.
4. Run `GodOfPrompt.auto()` to initiate discovery.
5. Run `GodOfPrompt.extractAll()` to harvest data.

### 2. The Python Processor

Located at: `extract_all_prompts.py`

Used to process or re-fetch data if API endpoints remain static.

```bash
python extract_all_prompts.py
```

## Inventory

| File | Description |
|------|-------------|
| `godofprompt_all_in_one.js` | Primary injection vector. Contains all research & extraction logic. |
| `extract_all_prompts.py` | Python-based fetcher for known endpoints. |
| `godofprompt_free_prompts_*.csv` | The harvested dataset (2,813 entries). |
| `EXTRACTION_REPORT.md` | Detailed technical analysis of the target's architecture. |

---

*Verified by The General.*

# God of Prompt Extraction - QUICK START GUIDE

## What You Got

✅ **2,813 Free Prompts** extracted from God of Prompt
✅ **CSV file** - Ready for Excel, data analysis, or import into databases
✅ **Extraction script** - Can be run anytime to get fresh data

## Files Delivered

```
C:\Users\Administrator\
├── extract_all_prompts.py          # Main extraction script
├── example_usage.py                # Examples for using the data
├── EXTRACTION_REPORT.md            # Full technical documentation
├── QUICK_START.md                  # This file
└── godofprompt_free_prompts_*.csv  # The extracted data (2,813 prompts)
```

## Quick Start

### 1. View the Data
Open in Excel:
```bash
start godofprompt_free_prompts_20251226_203919.csv
```

Or open in any text editor / spreadsheet software.

### 2. Extract Fresh Data
```bash
python extract_all_prompts.py
```

### 3. Use the Data in Python
```python
import csv

# Load the data
with open('godofprompt_free_prompts_20251226_203919.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    prompts = list(reader)

# Search for marketing prompts
marketing = [p for p in prompts if 'marketing' in p['page_name'].lower()]
print(f"Found {len(marketing)} marketing prompts")

# Display first 3
for prompt in marketing[:3]:
    print(f"\n{prompt['page_name']}")
    print(f"  {prompt['description'][:100]}...")
    print(f"  URL: https://www.godofprompt.ai/prompt?prompt={prompt['slug']}")
```

### 4. Run Example Code
```bash
python example_usage.py
```

(Note: You may see Unicode encoding errors in Windows console, but the data is fine. The errors are just display issues.)

## Data Fields

Each prompt contains:
- `id` - Unique ID
- `slug` - URL identifier
- `prompt_name` - Display name
- `page_name` - Title
- `description` - Full description
- `premium` - Always "false" for this dataset
- `new` - "true" if marked as new
- `icon` - Emoji icon (📘, 🎯, 💼, etc.)
- `date_created` - Creation date
- `views` - View count
- `likes` - Like count

## The Secret

**How to access all pages:**

Don't use the website! Use the Directus API directly:

```bash
# Get all free prompts
curl "https://gop-directus.up.railway.app/items/prompts?filter[premium][_eq]=false&limit=100&offset=0"

# Get marketing prompts
curl "https://gop-directus.up.railway.app/items/prompts?filter[category][_eq]=30&limit=50"

# Search by name
curl "https://gop-directus.up.railway.app/items/prompts?filter[page_name][_contains]=marketing&limit=20"
```

**Why the website didn't work:**
- The site uses Wized (Webflow integration)
- Pagination is handled client-side via JavaScript
- URL parameters don't control the pagination
- The data comes from Directus API in the background

**The solution:**
- Skip the frontend entirely
- Query the Directus API directly
- Filter by `premium=false`
- Paginate using `offset` and `limit`

## Statistics

- **Total prompts extracted:** 2,813
- **Expected (from UI):** ~984 (82 pages × 12)
- **Actual available:** 2,813 (much more!)
- **Extraction time:** ~30 seconds
- **Success rate:** 100%

## What Can You Do?

1. **Data Analysis**
   - Analyze prompt categories
   - Find popular prompts (by views/likes)
   - Identify trending topics

2. **Content Creation**
   - Use prompts directly
   - Create prompt collections
   - Build custom libraries

3. **Integration**
   - Import into databases
   - Build applications
   - Create APIs

4. **Research**
   - Study prompt patterns
   - Analyze descriptions
   - Categorize by industry

## Need More?

- Read `EXTRACTION_REPORT.md` for full technical details
- Run `python example_usage.py` for code examples
- Run `python extract_all_prompts.py` to get fresh data

## API Documentation

### Base URL
```
https://gop-directus.up.railway.app
```

### Get Prompts
```
GET /items/prompts
```

### Parameters
- `filter[premium][_eq]=false` - Only free prompts
- `filter[category][_eq]=30` - Specific category
- `limit=100` - Items per page (max 100)
- `offset=0` - Pagination offset
- `fields=id,name,description` - Specific fields
- `sort=-date_created` - Sort order

### Response
```json
{
  "data": [
    {
      "id": 123,
      "page_name": "Create Marketing Strategy",
      "description": "...",
      "slug": "create-marketing-strategy",
      "premium": false,
      "new": true,
      "icon": "🎯"
    }
  ],
  "meta": {
    "total_count": 2813
  }
}
```

## Success!

You now have access to ALL 2,813 free prompts from God of Prompt, not just the 984 visible in the UI. The extraction is complete, tested, and ready to use!

---

**Questions?**
- Check `EXTRACTION_REPORT.md` for detailed documentation
- Run `extract_all_prompts.py` to re-extract anytime
- The API is public and doesn't require authentication

**Status:** ✅ COMPLETE
**Date:** December 26, 2025

# God of Prompt Pagination Research - Quick Start Guide

## 📁 Files Created

1. **godofprompt_pagination_strategy.md** - Full research report and theory
2. **godofprompt_research_toolkit.js** - Browser console inspection toolkit
3. **godofprompt_extraction_methods.js** - 8 comprehensive extraction methods
4. **THIS FILE** - Quick start guide

## 🚀 Quick Start (3 Steps)

### Step 1: Open the Site
```
1. Open Chrome/Edge
2. Go to: https://godofprompt.com/prompts
3. Open DevTools (F12)
4. Go to Console tab
```

### Step 2: Load the Research Toolkit

Copy the contents of `godofprompt_research_toolkit.js` and paste it into the browser console, then press Enter.

**Or, use this quick method:**
```javascript
// Paste this into console:
fetch('file:///C:/Users/Administrator/godofprompt_research_toolkit.js')
  .then(r => r.text())
  .then(eval)
  .then(() => console.log('✅ Toolkit loaded!'))
```

### Step 3: Run Initial Analysis
```javascript
// The toolkit auto-runs initial checks
// Check the console output for:
// - Network requests being intercepted
// - Pagination elements found
// - Webflow data discovered
```

## 🔍 Diagnostic Commands

### Check What Was Found
```javascript
// See all API endpoints discovered
GodOfPromptResearch.showApiEndpoints()

// Find pagination state
GodOfPromptResearch.findPaginationState()

// Extract current page
GodOfPromptResearch.extractCurrentPage()
```

### Test Pagination Methods
```javascript
// Test all URL patterns at once
GodOfPromptResearch.testAllPatterns()

// Test specific pattern
GodOfPromptResearch.testUrlPattern('?page=2')

// Try infinite scroll
GodOfPromptResearch.tryInfiniteScroll()
```

## 🎯 Full Extraction Test

### Load the Complete Extraction Script
```javascript
// Option 1: Copy-paste the entire godofprompt_extraction_methods.js file into console

// Option 2: Run from file (if serving locally)
fetch('file:///C:/Users/Administrator/godofprompt_extraction_methods.js')
  .then(r => r.text())
  .then(eval)
```

### Run All 8 Methods
```javascript
// This will test every pagination method systematically
GodOfPromptExtractor.testAllMethods()

// Results will download automatically as 'godofprompt-research-results.json'
```

### Run Individual Methods
```javascript
// Method 1: Webflow API
GodOfPromptExtractor.method1_WebflowAPI()

// Method 2: Infinite Scroll
GodOfPromptExtractor.method2_InfiniteScroll()

// Method 3: URL Parameters
GodOfPromptExtractor.method3_URLParameters()

// Method 4: Client-Side Data
GodOfPromptExtractor.method4_ClientSideData()

// Method 5: Next Button
GodOfPromptExtractor.method5_NextButtonManipulation()

// Method 6: Search-Based
GodOfPromptExtractor.method6_SearchBased()

// Method 7: Categories
GodOfPromptExtractor.method7_CategoryNavigation()

// Method 8: Direct URLs
GodOfPromptExtractor.method8_DirectPageUrls()
```

## 📊 What to Look For

### Indicators of Success

✅ **Infinite Scroll Works:**
- Prompt count increases as you scroll
- Final count > initial count
- Network requests show loading new items

✅ **URL Parameter Works:**
- Different prompt count when accessing ?page=2
- Different content than page 1
- Returns HTTP 200

✅ **Webflow API Works:**
- Found endpoints like `/_api/v2/collections/...`
- Returns JSON with items array
- Contains pagination info (total, limit, offset)

✅ **Client-Side Data Works:**
- Found all prompts in window object
- Found in `<script type="application/json">` tags
- Can access without navigation

## 🔧 Manual Inspection (Fallback)

If automated methods don't work, use this checklist:

### 1. Network Tab Analysis
```
1. Open DevTools > Network tab
2. Filter by "XHR" and "Fetch"
3. Click "Next" button on page
4. Look for new requests
5. Copy the endpoint URL
```

### 2. Element Inspection
```
1. Right-click "Next" button > Inspect
2. Note: href, onclick, data attributes
3. Check parent elements for pagination data
4. Look for React/Vue/Angular bindings
```

### 3. URL Testing
Manually test these URLs in browser:
```
https://godofprompt.com/prompts?page=2
https://godofprompt.com/promots?p=2
https://godofprompt.com/prompts/2
https://godofprompt.com/prompts/page/2
https://godofprompt.com/prompts#page-2
```

### 4. Console Inspection
Run this to find data:
```javascript
// Check window object
Object.keys(window).filter(k => k.includes('data') || k.includes('state'))

// Check all scripts
[...document.querySelectorAll('script')].map(s => s.type)

// Find JSON data
[...document.querySelectorAll('script[type="application/json"]')]
  .map(s => ({ src: s.src, text: s.textContent.substring(0, 100) }))
```

## 📋 Expected Results

### Working Method Examples

**Example 1: Infinite Scroll Works**
```javascript
{
  initialCount: 12,
  finalCount: 984,
  loaded: 972
}
// Success! Use infinite scroll to load all
```

**Example 2: URL Parameter Works**
```javascript
{
  pattern: '?page=2',
  status: 200,
  promptCount: 12,
  different: true
}
// Success! Loop from page 1 to 82
```

**Example 3: Webflow API Works**
```javascript
{
  url: 'https://godofprompt.com/_api/v2/collections/.../items',
  data: {
    items: [...], // Array of prompts
    total: 984,
    limit: 12,
    offset: 0
  }
}
// Success! Use API endpoint directly
```

## 🚀 Production Extraction Code

Once you find a working method, use this template:

### Infinite Scroll Version
```javascript
async function extractAllPrompts_InfiniteScroll() {
  const allPrompts = [];

  while (true) {
    const currentPrompts = document.querySelectorAll('[class*="prompt"]');
    const beforeCount = currentPrompts.length;

    // Extract current prompts
    currentPrompts.forEach(p => {
      allPrompts.push({
        title: p.querySelector('h2, h3')?.textContent,
        description: p.querySelector('p')?.textContent,
        link: p.querySelector('a')?.href
      });
    });

    // Scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 2000));

    // Check if new content loaded
    const afterCount = document.querySelectorAll('[class*="prompt"]').length;

    if (afterCount === beforeCount) {
      break; // No new content, reached end
    }

    console.log(`Loaded ${afterCount} prompts...`);
  }

  // Download
  const blob = new Blob([JSON.stringify(allPrompts, null, 2)], {type: 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'all-prompts.json';
  a.click();
}
```

### URL Parameter Version
```javascript
async function extractAllPrompts_URLParam() {
  const allPrompts = [];

  for (let page = 1; page <= 82; page++) {
    const url = `https://godofprompt.com/prompts?page=${page}`;
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    const prompts = doc.querySelectorAll('[class*="prompt"]');
    prompts.forEach(p => {
      allPrompts.push({
        page,
        title: p.querySelector('h2, h3')?.textContent,
        description: p.querySelector('p')?.textContent,
        link: p.querySelector('a')?.href
      });
    });

    console.log(`Extracted page ${page}: ${prompts.length} prompts`);
    await new Promise(r => setTimeout(r, 500)); // Be nice to server
  }

  // Download
  downloadJSON(allPrompts, 'all-prompts.json');
}

function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
```

### Webflow API Version
```javascript
async function extractAllPrompts_WebflowAPI() {
  // Replace with actual endpoint discovered from research
  const API_ENDPOINT = 'https://godofprompt.com/_api/v2/collections/{collection_id}/items';

  const allPrompts = [];
  let offset = 0;
  const limit = 100; // Max items per request

  while (true) {
    const url = `${API_ENDPOINT}?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) break;

    allPrompts.push(...data.items);
    console.log(`Loaded ${allPrompts.length} prompts...`);

    if (data.items.length < limit) break; // Last page

    offset += limit;
    await new Promise(r => setTimeout(r, 200));
  }

  downloadJSON(allPrompts, 'all-prompts.json');
}
```

## 🐛 Troubleshooting

### Issue: Scripts Won't Load
**Solution:** Copy-paste the entire file content into console instead of using fetch()

### Issue: CORS Errors
**Solution:** Methods that work from console might fail from fetch() - that's normal. Use browser console directly.

### Issue: No Methods Work
**Next Steps:**
1. Check if site requires login/authentication
2. Look for anti-scraping measures
3. Check if prompts are loaded dynamically (wait longer)
4. Inspect the "Next" button's actual click handler

### Issue: Browser Extension Not Connected
**Solution:** These scripts don't need the extension! They run directly in browser console.

## 📞 Quick Command Reference

```javascript
// Load toolkit
copy(paste from godofprompt_research_toolkit.js)

// Quick diagnostics
GodOfPromptResearch.showApiEndpoints()
GodOfPromptResearch.findPaginationState()
GodOfPromptResearch.testAllPatterns()

// Full extraction test
GodOfPromptExtractor.testAllMethods()

// Extract current page
GodOfPromptResearch.extractCurrentPage()
```

## ✅ Success Criteria

You've found a working method when:
- ✅ Can access more than 12 prompts
- ✅ Can navigate from page 1 to page 2
- ✅ Can predictably access all 82 pages
- ✅ Can extract all prompt data (title, description, link)

## 📝 Next Steps After Finding Working Method

1. **Document the exact method** (which of the 8 worked)
2. **Note any rate limits** (add delays between requests)
3. **Handle errors gracefully** (retry failed requests)
4. **Validate data** (check for duplicates, missing fields)
5. **Export in useful format** (JSON, CSV, etc.)

---

**Created:** December 26, 2025
**Purpose:** Extract all 984 prompts from godofprompt.com
**Challenge:** Site shows "1 of 82" pages but standard pagination doesn't work

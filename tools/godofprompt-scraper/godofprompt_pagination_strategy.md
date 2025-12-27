# God of Prompt Pagination Strategy - Research Report

## Challenge Summary
- Site shows "1 of 82" pages
- Each page has 12 prompts (~984 total prompts)
- Standard URL parameters (?page=2, ?page=3) don't work
- Next button doesn't advance pages
- Tab ID: 1804204446

## Site Analysis
**Platform:** Webflow CMS
**URL:** https://godofprompt.com/prompts

## Webflow CMS Pagination Patterns

Webflow sites typically use one of these pagination methods:

### 1. **Client-Side Pagination (Most Likely)**
Webflow's native pagination uses hash-based routing or JavaScript state management.

**URL Patterns to Test:**
```
https://godofprompt.com/prompts?page=2
https://godofprompt.com/prompts#page-2
https://godofprompt.com/prompts?offset=12
https://godofprompt.com/prompts?limit=12&skip=12
https://godofprompt.com/prompts?p=2
```

### 2. **Webflow CMS API Endpoint**
Webflow sites often expose their CMS data via API endpoints.

**API Patterns to Test:**
```
https://godofprompt.com/_api/prompts
https://godofprompt.com/api/prompts
https://godofprompt.com/.netlify/functions/prompts
https://godofprompt.com/webflow/prompts
```

### 3. **Infinite Scroll / Lazy Loading**
Check if the site loads more items as you scroll.

## Research & Testing Strategy

### Step 1: Inspect Network Requests
**Using Browser DevTools or the MCP tool:**

```javascript
// Run in browser console to intercept XHR/Fetch requests
(function() {
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    console.log('Fetch request:', args[0]);
    return originalFetch.apply(this, args).then(response => {
      console.log('Fetch response:', response.url, response.status);
      return response;
    });
  };

  const originalXHR = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    console.log('XHR request:', method, url);
    return originalXHR.apply(this, arguments);
  };
})();
```

### Step 2: Test Infinite Scroll
**Using MCP Browser Automation:**

```python
# Scroll down gradually to trigger lazy loading
for i in range(100):
    browser.scroll(direction="down", scroll_amount=3)
    browser.wait(duration=1)
```

### Step 3: Inspect Webflow Data Attributes
Webflow stores CMS data in specific DOM elements:

```javascript
// Run in browser console
// Check for Webflow data
const wfElements = document.querySelectorAll('[data-wf-*]');
console.log('Webflow elements:', wfElements);

// Check for CMS collection data
const cmsItems = document.querySelectorAll('[wized="collection"]');
console.log('CMS items:', cmsItems);

// Check window object for Webflow data
console.log('Webflow data:', window.Webflow);
console.log('Window data keys:', Object.keys(window).filter(k => k.includes('data') || k.includes('collection')));

// Look for pagination data
const paginationData = {
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: document.querySelectorAll('.prompt-item, .prompt-card, [class*="prompt"]').length
};
console.log('Pagination data:', paginationData);
```

### Step 4: Direct URL Pattern Testing

**Test these URLs systematically:**

```
Pattern 1: /prompts/2
Pattern 2: /prompts?page=2
Pattern 3: /prompts#page=2
Pattern 4: /prompts?offset=12
Pattern 5: /prompts?skip=12
Pattern 6: /prompts?start=12
Pattern 7: /prompts?p=2
Pattern 8: /prompts/2
Pattern 9: /prompts/page/2
Pattern 10: /prompts/page-2
```

### Step 5: Search & Category Navigation

```javascript
// Check for category filters
const categoryButtons = document.querySelectorAll('[data-category], [class*="category"], [class*="filter"]');
console.log('Categories:', Array.from(categoryButtons).map(b => ({
  text: b.textContent,
  data: Object.entries(b.dataset)
})));

// Try search with pagination
const searchBox = document.querySelector('input[type="search"], input[name="search"], [placeholder*="search" i]');
if (searchBox) {
  searchBox.value = ''; // Empty search to show all
  searchBox.dispatchEvent(new Event('input', { bubbles: true }));
}
```

### Step 6: Webflow-Specific API Discovery

```javascript
// Check for Webflow CMS collection data
const collectionId = document.querySelector('[data-wf-collection]')?.dataset.wfCollection;
console.log('Collection ID:', collectionId);

// Try to find Webflow CMS items
const wizedElements = document.querySelectorAll('[wized]');
console.log('Wized elements:', wizedElements);

// Check for MemberStack or other authentication (might block pagination)
const memberstackData = window.$memberstack || window.Memberstack;
console.log('MemberStack:', memberstackData);
```

### Step 7: Pagination State Inspection

```javascript
// Find pagination state in window object
const possibleStateKeys = [
  'pagination', 'page', 'currentPage', 'items', 'collection',
  'cms', 'webflow', 'wized', 'state', 'store', 'data'
];

const foundState = {};
possibleStateKeys.forEach(key => {
  if (window[key]) {
    foundState[key] = window[key];
  }
});
console.log('Found state:', foundState);

// Check React/Vue state (if using frameworks)
const rootElement = document.querySelector('#root, [data-reactroot], [data-vue-app]');
console.log('Framework root:', rootElement);
```

## Most Likely Working Solutions

### Solution A: Webflow Collection API (Best Bet)

Webflow CMS collections often expose data at:
```
https://godofprompt.com/_api/v2/collections/{collection_id}/items
```

**Steps:**
1. Open DevTools Network tab
2. Navigate to prompts page
3. Look for requests to `/_api/` or `/api/`
4. Copy the API endpoint
5. Add pagination parameters: `?limit=100&offset=0`

### Solution B: Infinite Scroll with JavaScript

```javascript
// Auto-scroll script to load all pages
async function loadAllPrompts() {
  let lastHeight = 0;
  let sameCount = 0;
  const maxSameCount = 5; // Stop if height doesn't change after 5 scrolls

  while (sameCount < maxSameCount) {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 2000)); // Wait for content to load

    const newHeight = document.body.scrollHeight;
    if (newHeight === lastHeight) {
      sameCount++;
    } else {
      sameCount = 0;
      lastHeight = newHeight;
    }

    console.log(`Scrolled... Height: ${newHeight}, Same count: ${sameCount}`);
  }

  // Extract all prompts
  const prompts = document.querySelectorAll('.prompt-item, .prompt-card, [class*="prompt"]');
  console.log(`Total prompts loaded: ${prompts.length}`);

  return Array.from(prompts).map((p, i) => ({
    index: i,
    title: p.querySelector('h2, h3, [class*="title"]')?.textContent,
    description: p.querySelector('p, [class*="description"]')?.textContent,
    link: p.querySelector('a')?.href
  }));
}

// Run it
loadAllPrompts().then(console.log);
```

### Solution C: Reverse-Engineer Next Button

```javascript
// Find and analyze the Next button
const nextButton = document.querySelector('[class*="next"], [class*="arrow-right"], [aria-label*="next" i]');
console.log('Next button:', nextButton);
console.log('Next button HTML:', nextButton?.outerHTML);
console.log('Next button click handler:', nextButton?.onclick);

// Find all click handlers on the page
document.querySelectorAll('[onclick]').forEach(el => {
  console.log('Element with onclick:', el.textContent.trim(), el.onclick);
});
```

### Solution D: Check for URL Hash Changes

```javascript
// Monitor hash changes
window.addEventListener('hashchange', (e) => {
  console.log('Hash changed:', e.newURL);
});

// Try manually setting hash
window.location.hash = 'page-2';
```

## Extraction Code Template

Once pagination is working, use this template:

```javascript
async function extractAllPrompts() {
  const allPrompts = [];

  for (let page = 1; page <= 82; page++) {
    // Method 1: Direct URL navigation
    // window.location.href = `https://godofprompt.com/prompts?page=${page}`;

    // Method 2: Hash-based
    // window.location.hash = `page-${page}`;

    // Method 3: API call
    const response = await fetch(`https://godofprompt.com/_api/prompts?page=${page}&limit=12`);
    const data = await response.json();
    allPrompts.push(...data.items);

    console.log(`Extracted page ${page}: ${data.items.length} prompts`);

    // Wait between requests
    await new Promise(r => setTimeout(r, 1000));
  }

  // Save to file
  const blob = new Blob([JSON.stringify(allPrompts, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'all-prompts.json';
  a.click();

  return allPrompts;
}
```

## Action Plan

1. **First Priority:** Open DevTools Network tab and navigate the site manually
   - Look for ANY API calls
   - Check if content loads via XHR/Fetch
   - Note the exact endpoints

2. **Second Priority:** Run the JavaScript inspection scripts above
   - Find the pagination state
   - Identify the data source
   - Check Webflow-specific attributes

3. **Third Priority:** Test infinite scroll
   - Scroll down gradually
   - Monitor network for new requests
   - Check if new items appear

4. **Fourth Priority:** Try all URL patterns
   - Test each pattern manually
   - Note which ones return different content
   - Use the working pattern for extraction

## Expected Outcome

Based on Webflow CMS patterns, the most likely solution is one of:
- API endpoint: `/_api/v2/collections/{id}/items?limit=100&offset=0`
- Infinite scroll with state management
- Hash-based routing: `/#page-2`, `/#page-3`

## Next Steps (Requires Browser Access)

Once you reconnect the browser extension or provide manual access, I will:

1. Read the page structure and identify all pagination elements
2. Monitor network requests during pagination attempts
3. Test all URL patterns systematically
4. Develop and execute the extraction code

**Please ensure:**
- Browser extension is connected
- Tab 1804204446 is active on the prompts page
- DevTools Network tab is open (for monitoring)

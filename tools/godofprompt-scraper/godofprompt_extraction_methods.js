/**
 * God of Prompt - Pagination Extraction Methods
 * Run each method independently to test which one works
 */

const GodOfPromptExtractor = {

  /**
   * METHOD 1: Webflow CMS API (Most Likely)
   * Webflow sites often expose their CMS via API endpoints
   */
  async method1_WebflowAPI() {
    console.log('🔧 Method 1: Testing Webflow CMS API...');

    const apiPatterns = [
      '/_api/v2/collections',
      '/api/collections',
      '/.netlify/functions/collections',
      '/_api/prompts',
      '/api/prompts',
      '/webflow/prompts'
    ];

    const results = [];

    for (const pattern of apiPatterns) {
      const url = window.location.origin + pattern;
      console.log(`\n📡 Trying: ${url}`);

      try {
        const response = await fetch(url);
        console.log(`  Status: ${response.status}`);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Success! Data:', data);
          results.push({ pattern, url, status: response.status, data });
        }
      } catch(error) {
        console.log(`  ❌ Error: ${error.message}`);
      }
    }

    return results;
  },

  /**
   * METHOD 2: Infinite Scroll
   * Many modern sites use infinite scroll instead of pagination
   */
  async method2_InfiniteScroll() {
    console.log('🔧 Method 2: Testing Infinite Scroll...');

    const results = {
      initialCount: 0,
      finalCount: 0,
      prompts: []
    };

    // Get initial prompt count
    const getPromptCount = () => {
      const selectors = [
        '.prompt-item',
        '.prompt-card',
        '[class*="prompt"]',
        '[class*="card"]'
      ];

      let maxCount = 0;
      selectors.forEach(sel => {
        const count = document.querySelectorAll(sel).length;
        if (count > maxCount) maxCount = count;
      });

      return maxCount;
    };

    results.initialCount = getPromptCount();
    console.log(`📊 Initial prompt count: ${results.initialCount}`);

    // Scroll to bottom repeatedly
    let lastHeight = 0;
    let stuckCount = 0;
    const maxAttempts = 50;

    for (let i = 0; i < maxAttempts; i++) {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 1500)); // Wait for content

      const currentHeight = document.body.scrollHeight;
      const currentCount = getPromptCount();

      console.log(`📜 Scroll ${i+1}/${maxAttempts} - Prompts: ${currentCount}, Height: ${currentHeight}`);

      if (currentHeight === lastHeight) {
        stuckCount++;
        if (stuckCount >= 3) {
          console.log('✅ Reached bottom of page');
          break;
        }
      } else {
        stuckCount = 0;
        lastHeight = currentHeight;
      }
    }

    results.finalCount = getPromptCount();
    console.log(`\n📊 Results:`);
    console.log(`  Initial: ${results.initialCount}`);
    console.log(`  Final: ${results.finalCount}`);
    console.log(`  Loaded: ${results.finalCount - results.initialCount} more prompts`);

    return results;
  },

  /**
   * METHOD 3: URL Parameter Patterns
   * Test various pagination URL patterns
   */
  async method3_URLParameters() {
    console.log('🔧 Method 3: Testing URL Parameters...');

    const patterns = [
      '?page=2',
      '?p=2',
      '?pagenum=2',
      '?offset=12',
      '?skip=12',
      '?start=12',
      '?limit=12&offset=12',
      '?page=2&limit=12',
      '#page-2',
      '#page2',
      '#2'
    ];

    const results = [];

    for (const pattern of patterns) {
      const testUrl = window.location.origin + window.location.pathname + pattern;
      console.log(`\n🔗 Testing: ${testUrl}`);

      try {
        const response = await fetch(testUrl);
        const text = await response.text();

        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Count prompts
        const promptCount = doc.querySelectorAll('[class*="prompt"], [class*="card"]').length;

        results.push({
          pattern,
          url: testUrl,
          status: response.status,
          promptCount,
          different: promptCount !== 12
        });

        console.log(`  Status: ${response.status}`);
        console.log(`  Prompts found: ${promptCount}`);
        console.log(`  Likely working: ${promptCount > 0 && promptCount !== 12}`);

      } catch(error) {
        console.error(`  Error: ${error.message}`);
        results.push({ pattern, error: error.message });
      }

      await new Promise(r => setTimeout(r, 300));
    }

    console.log('\n📊 URL Parameter Test Results:');
    console.table(results);

    // Filter likely working patterns
    const workingPatterns = results.filter(r => r.different && r.promptCount > 0);
    console.log('\n✅ Working patterns:', workingPatterns);

    return results;
  },

  /**
   * METHOD 4: Direct Navigation via JavaScript
   * Some sites store all data client-side
   */
  method4_ClientSideData() {
    console.log('🔧 Method 4: Searching for Client-Side Data...');

    const results = {};

    // Check for embedded JSON data
    const scripts = document.querySelectorAll('script[type="application/json"], script[type="application/ld+json"]');
    scripts.forEach((script, i) => {
      try {
        const data = JSON.parse(script.textContent);
        if (data.items || data.collection || data.prompts || data.itemListElement) {
          results[`script_${i}`] = data;
          console.log(`✅ Found data in script ${i}:`, data);
        }
      } catch(e) {}
    });

    // Check window object for data
    const dataKeys = ['__INITIAL_STATE__', '__STATE__', '__DATA__', 'INITIAL_DATA', 'pageProps'];
    dataKeys.forEach(key => {
      if (window[key]) {
        results[key] = window[key];
        console.log(`✅ Found window.${key}:`, window[key]);
      }
    });

    // Check for Webflow data
    if (window.webflow || window.Webflow) {
      results.webflow = window.webflow || window.Webflow;
      console.log('✅ Found Webflow data:', results.webflow);
    }

    // Check data attributes on body
    const bodyData = document.body.dataset;
    if (Object.keys(bodyData).length > 0) {
      results.bodyData = bodyData;
      console.log('✅ Found body data attributes:', bodyData);
    }

    return results;
  },

  /**
   * METHOD 5: Pagination Button State Manipulation
   * Try to programmatically click next button
   */
  async method5_NextButtonManipulation() {
    console.log('🔧 Method 5: Testing Next Button Manipulation...');

    const nextSelectors = [
      '[class*="next"]',
      '[aria-label*="next" i]',
      'a[rel="next"]',
      'button[rel="next"]',
      '.pagination-next',
      '.next-page'
    ];

    const results = [];

    for (const selector of nextSelectors) {
      const buttons = document.querySelectorAll(selector);
      console.log(`\n🔍 Selector "${selector}": ${buttons.length} found`);

      buttons.forEach((btn, i) => {
        console.log(`  Button ${i}:`, {
          text: btn.textContent.trim(),
          tag: btn.tagName,
          href: btn.href,
          onclick: !!btn.onclick,
          disabled: btn.disabled
        });

        results.push({
          selector,
          index: i,
          text: btn.textContent.trim(),
          href: btn.href,
          tag: btn.tagName
        });

        // Try clicking
        if (!btn.disabled && (btn.tagName === 'BUTTON' || btn.tagName === 'A')) {
          console.log(`  🖱️ Attempting to click...`);

          // Store current URL to check if navigation happens
          const beforeUrl = window.location.href;

          setTimeout(() => {
            btn.click();

            setTimeout(() => {
              const afterUrl = window.location.href;
              const navigated = beforeUrl !== afterUrl;
              console.log(`  ${navigated ? '✅ Navigation successful!' : '❌ No navigation'}`);
              console.log(`  Before: ${beforeUrl}`);
              console.log(`  After: ${afterUrl}`);
            }, 1000);
          }, 100);
        }
      });
    }

    return results;
  },

  /**
   * METHOD 6: Search-Based Extraction
   * Use search with empty query to get all results
   */
  async method6_SearchBased() {
    console.log('🔧 Method 6: Testing Search-Based Method...');

    // Find search input
    const searchSelectors = [
      'input[type="search"]',
      'input[name="search"]',
      'input[name="q"]',
      '[placeholder*="search" i]',
      '[placeholder*="find" i]'
    ];

    let searchInput = null;

    for (const selector of searchSelectors) {
      searchInput = document.querySelector(selector);
      if (searchInput) {
        console.log(`✅ Found search input: ${selector}`);
        break;
      }
    }

    if (!searchInput) {
      console.log('❌ No search input found');
      return { success: false, reason: 'No search input' };
    }

    // Try searching with empty string
    console.log('🔍 Testing empty search...');

    const initialCount = document.querySelectorAll('[class*="prompt"]').length;

    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    searchInput.form?.dispatchEvent(new Event('submit', { bubbles: true }));

    // Wait for results
    await new Promise(r => setTimeout(r, 2000));

    const newCount = document.querySelectorAll('[class*="prompt"]').length;

    return {
      success: true,
      initialCount,
      newCount,
      difference: newCount - initialCount
    };
  },

  /**
   * METHOD 7: Category/Filter Navigation
   * Navigate through categories to find all prompts
   */
  method7_CategoryNavigation() {
    console.log('🔧 Method 7: Testing Category Navigation...');

    const categorySelectors = [
      '[data-category]',
      '[data-filter]',
      '[class*="category"]',
      '[class*="filter"]',
      'nav a',
      '.categories a',
      '.filters a'
    ];

    const categories = [];

    categorySelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const text = el.textContent.trim();
        const href = el.href;
        const dataAttr = el.dataset.category || el.dataset.filter;

        if (text && (href || dataAttr)) {
          categories.push({
            text,
            href,
            dataAttr,
            selector
          });
        }
      });
    });

    // Remove duplicates
    const uniqueCategories = categories.filter((cat, i, self) =>
      i === self.findIndex(c => c.text === cat.text)
    );

    console.log(`📊 Found ${uniqueCategories.length} unique categories:`);
    console.table(uniqueCategories);

    return uniqueCategories;
  },

  /**
   * METHOD 8: Manual URL Pattern Enumeration
   * Try direct page URLs
   */
  async method8_DirectPageUrls() {
    console.log('🔧 Method 8: Testing Direct Page URLs...');

    const urlPatterns = [
      '/prompts/2',
      '/prompts/2/',
      '/prompts/page-2',
      '/prompts/page/2',
      '/free-prompts/2',
      '/free-prompts/page-2',
      '/prompts?p=2',
      '/prompts?page=2'
    ];

    const results = [];

    for (const pattern of urlPatterns) {
      const testUrl = window.location.origin + pattern;
      console.log(`\n🔗 Testing: ${testUrl}`);

      try {
        const response = await fetch(testUrl);
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const promptCount = doc.querySelectorAll('[class*="prompt"], [class*="card"]').length;

        results.push({
          pattern,
          url: testUrl,
          status: response.status,
          promptCount,
          working: promptCount > 0
        });

        console.log(`  Status: ${response.status}, Prompts: ${promptCount}`);

        if (response.status === 200 && promptCount > 0) {
          console.log('  ✅ This URL pattern might work!');
        }

      } catch(error) {
        console.log(`  ❌ Error: ${error.message}`);
        results.push({ pattern, error: error.message });
      }

      await new Promise(r => setTimeout(r, 300));
    }

    return results;
  },

  /**
   * MASTER FUNCTION: Run all methods and report findings
   */
  async testAllMethods() {
    console.log('🚀 RUNNING ALL PAGINATION METHODS');
    console.log('==================================\n');

    const results = {
      method1_webflowAPI: null,
      method2_infiniteScroll: null,
      method3_urlParameters: null,
      method4_clientSideData: null,
      method5_nextButton: null,
      method6_searchBased: null,
      method7_categories: null,
      method8_directUrls: null
    };

    try {
      console.log('\n' + '='.repeat(60));
      results.method1_webflowAPI = await this.method1_WebflowAPI();
    } catch(e) { console.error('Method 1 error:', e); }

    try {
      console.log('\n' + '='.repeat(60));
      results.method2_infiniteScroll = await this.method2_InfiniteScroll();
    } catch(e) { console.error('Method 2 error:', e); }

    try {
      console.log('\n' + '='.repeat(60));
      results.method3_urlParameters = await this.method3_URLParameters();
    } catch(e) { console.error('Method 3 error:', e); }

    try {
      console.log('\n' + '='.repeat(60));
      results.method4_clientSideData = this.method4_ClientSideData();
    } catch(e) { console.error('Method 4 error:', e); }

    try {
      console.log('\n' + '='.repeat(60));
      results.method5_nextButton = await this.method5_NextButtonManipulation();
    } catch(e) { console.error('Method 5 error:', e); }

    try {
      console.log('\n' + '='.repeat(60));
      results.method6_searchBased = await this.method6_SearchBased();
    } catch(e) { console.error('Method 6 error:', e); }

    try {
      console.log('\n' + '='.repeat(60));
      results.method7_categories = this.method7_CategoryNavigation();
    } catch(e) { console.error('Method 7 error:', e); }

    try {
      console.log('\n' + '='.repeat(60));
      results.method8_directUrls = await this.method8_DirectPageUrls();
    } catch(e) { console.error('Method 8 error:', e); }

    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL RESULTS');
    console.log('=================================\n');

    // Analyze which methods worked
    const workingMethods = [];

    if (results.method1_webflowAPI && results.method1_webflowAPI.length > 0) {
      workingMethods.push('✅ Method 1: Webflow API');
    }

    if (results.method2_infiniteScroll && results.method2_infiniteScroll.finalCount > results.method2_infiniteScroll.initialCount) {
      workingMethods.push('✅ Method 2: Infinite Scroll');
    }

    if (results.method3_urlParameters && results.method3_urlParameters.some(r => r.different)) {
      workingMethods.push('✅ Method 3: URL Parameters');
    }

    if (results.method4_clientSideData && Object.keys(results.method4_clientSideData).length > 0) {
      workingMethods.push('✅ Method 4: Client-Side Data');
    }

    if (results.method5_nextButton && results.method5_nextButton.some(r => r.href)) {
      workingMethods.push('✅ Method 5: Next Button');
    }

    if (results.method6_searchBased && results.method6_searchBased.success) {
      workingMethods.push('✅ Method 6: Search-Based');
    }

    if (results.method7_categories && results.method7_categories.length > 0) {
      workingMethods.push('✅ Method 7: Category Navigation');
    }

    if (results.method8_directUrls && results.method8_directUrls.some(r => r.working)) {
      workingMethods.push('✅ Method 8: Direct Page URLs');
    }

    console.log('WORKING METHODS:');
    workingMethods.forEach(method => console.log(`  ${method}`));

    if (workingMethods.length === 0) {
      console.log('❌ No working methods found. Manual inspection needed.');
    }

    console.log('\n📥 Downloading full results...');
    const blob = new Blob([JSON.stringify(results, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'godofprompt-research-results.json';
    a.click();

    return results;
  }
};

// Make available globally
window.GodOfPromptExtractor = GodOfPromptExtractor;

console.log('✅ GodOfPromptExtractor loaded!');
console.log('📖 Usage: GodOfPromptExtractor.testAllMethods()');
console.log('📖 Or run individual methods: GodOfPromptExtractor.method1_WebflowAPI()');

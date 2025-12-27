/**
 * God of Prompt Pagination Research Toolkit
 * Run this script in the browser console on https://godofprompt.com/prompts
 *
 * This toolkit will:
 * 1. Intercept all network requests
 * 2. Inspect Webflow CMS data
 * 3. Test pagination methods
 * 4. Extract prompt data
 */

(function() {
  'use strict';

  const GodOfPromptResearch = {
    logs: [],
    apiEndpoints: [],
    paginationMethods: {},

    init() {
      console.log('🔍 God of Prompt Research Toolkit Initialized');
      console.log('==============================================');
      this.interceptNetwork();
      this.inspectPageStructure();
      this.findWebflowData();
      this.testPaginationMethods();
      this.createControlPanel();
    },

    // ============================================
    // 1. NETWORK INTERCEPTION
    // ============================================
    interceptNetwork() {
      console.log('\n📡 Setting up network interception...');

      // Intercept Fetch
      const originalFetch = window.fetch;
      window.fetch = (...args) => {
        const url = args[0];
        this.logNetworkRequest('FETCH', url);
        this.apiEndpoints.push(url);

        return originalFetch.apply(window, args)
          .then(response => {
            console.log(`✅ Fetch: ${response.status} ${response.statusText} - ${url}`);
            // Try to clone and inspect response
            response.clone().json().then(data => {
              if (data && typeof data === 'object') {
                console.log('📦 Response data:', data);
              }
            }).catch(() => {}); // Not JSON, ignore
            return response;
          })
          .catch(error => {
            console.error(`❌ Fetch error: ${url}`, error);
            throw error;
          });
      };

      // Intercept XMLHttpRequest
      const originalXHROpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url) {
        GodOfPromptResearch.logNetworkRequest('XHR', url);
        GodOfPromptResearch.apiEndpoints.push(url);

        this.addEventListener('load', function() {
          console.log(`✅ XHR: ${this.status} ${this.statusText} - ${method} ${url}`);
          try {
            const data = JSON.parse(this.responseText);
            console.log('📦 Response data:', data);
          } catch(e) {} // Not JSON, ignore
        });

        this.addEventListener('error', function() {
          console.error(`❌ XHR error: ${method} ${url}`);
        });

        return originalXHROpen.apply(this, arguments);
      };

      console.log('✅ Network interception active');
    },

    logNetworkRequest(type, url) {
      this.logs.push({ type, url, timestamp: Date.now() });
    },

    // ============================================
    // 2. PAGE STRUCTURE INSPECTION
    // ============================================
    inspectPageStructure() {
      console.log('\n🔍 Inspecting page structure...');

      // Find all prompt containers
      const promptSelectors = [
        '.prompt-item',
        '.prompt-card',
        '[class*="prompt"]',
        '[class*="card"]',
        '[class*="item"]'
      ];

      const promptElements = [];
      promptSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          promptElements.push({ selector, count: elements.length });
          console.log(`📋 Found ${elements.length} elements with selector: ${selector}`);
        }
      });

      // Find pagination elements
      const paginationSelectors = [
        '[class*="pagination"]',
        '[class*="next"]',
        '[class*="prev"]',
        '[class*="page"]',
        'button[aria-label*="next" i]',
        'button[aria-label*="previous" i]',
        'a[aria-label*="next" i]',
        'a[aria-label*="previous" i]'
      ];

      const paginationElements = [];
      paginationSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          elements.forEach(el => {
            paginationElements.push({
              selector,
              html: el.outerHTML.substring(0, 200),
              text: el.textContent,
              onclick: el.onclick?.toString(),
              dataAttrs: Object.entries(el.dataset)
            });
          });
        }
      });

      if (paginationElements.length > 0) {
        console.log('\n🔢 Pagination elements found:', paginationElements);
      } else {
        console.log('⚠️ No pagination elements found');
      }

      // Find search/filter elements
      const searchElements = {
        searchBox: document.querySelector('input[type="search"], input[name="search"], [placeholder*="search" i]'),
        filterButtons: document.querySelectorAll('[data-category], [data-filter], [class*="filter"]'),
        sortButtons: document.querySelectorAll('[data-sort], [class*="sort"]')
      };

      console.log('\n🔎 Search/Filter elements:', {
        searchBox: searchElements.searchBox?.outerHTML,
        filterCount: searchElements.filterButtons.length,
        sortCount: searchElements.sortButtons.length
      });
    },

    // ============================================
    // 3. WEBFLOW DATA INSPECTION
    // ============================================
    findWebflowData() {
      console.log('\n🎨 Inspecting Webflow CMS data...');

      // Check for Webflow in window object
      if (window.Webflow) {
        console.log('✅ Webflow object found:', window.Webflow);
      }

      // Check for Webflow collection data
      const wfCollection = document.querySelector('[data-wf-collection]');
      if (wfCollection) {
        console.log('✅ Webflow collection found:', {
          id: wfCollection.dataset.wfCollection,
          element: wfCollection.outerHTML.substring(0, 500)
        });
      }

      // Check all data-wf-* attributes
      const wfElements = document.querySelectorAll('[data-wf-]');
      console.log(`📋 Found ${wfElements.length} Webflow elements`);

      // Check for Wized (common Webflow enhancement)
      if (window.wized || document.querySelector('[wized]')) {
        console.log('✅ Wized detected');
        const wizedElements = document.querySelectorAll('[wized]');
        console.log('Wized elements:', Array.from(wizedElements).map(el => ({
          tag: el.tagName,
          wizedAttr: el.getAttribute('wized'),
          class: el.className
        })));
      }

      // Check for MemberStack (authentication)
      if (window.$memberstack || window.Memberstack) {
        console.log('⚠️ MemberStack detected - might require authentication');
      }

      // Look for JSON-LD or structured data
      const scripts = document.querySelectorAll('script[type="application/ld+json"], script[type="application/json"]');
      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent);
          if (data.itemListElement || data.items || data.collection) {
            console.log('📦 Structured data found:', data);
          }
        } catch(e) {}
      });
    },

    // ============================================
    // 4. TEST PAGINATION METHODS
    // ============================================
    testPaginationMethods() {
      console.log('\n🧪 Testing pagination methods...');

      const testPatterns = [
        '?page=2',
        '?p=2',
        '?offset=12',
        '?skip=12',
        '#page-2',
        '#page2',
        '/page/2',
        '/2'
      ];

      console.log('📝 URL patterns to test manually:');
      testPatterns.forEach(pattern => {
        const testUrl = window.location.origin + window.location.pathname + pattern;
        console.log(`  - ${testUrl}`);
      });

      // Test if there's a next page data attribute
      const nextPageBtn = document.querySelector('[class*="next"], [aria-label*="next" i]');
      if (nextPageBtn) {
        console.log('\n🔍 Next button analysis:');
        console.log('  HTML:', nextPageBtn.outerHTML);
        console.log('  Classes:', nextPageBtn.className);
        console.log('  Data attributes:', nextPageBtn.dataset);
        console.log('  Has onclick:', !!nextPageBtn.onclick);

        if (nextPageBtn.onclick) {
          console.log('  OnClick handler:', nextPageBtn.onclick.toString());
        }
      }

      // Check for pagination in URL
      console.log('\n🔍 Current URL analysis:');
      console.log('  Full URL:', window.location.href);
      console.log('  Pathname:', window.location.pathname);
      console.log('  Search:', window.location.search);
      console.log('  Hash:', window.location.hash);
    },

    // ============================================
    // 5. CONTROL PANEL
    // ============================================
    createControlPanel() {
      console.log('\n🎮 Control Panel');
      console.log('================================');
      console.log('Available commands:');
      console.log('  GodOfPromptResearch.showApiEndpoints()');
      console.log('  GodOfPromptResearch.testUrlPattern(pattern)');
      console.log('  GodOfPromptResearch.tryInfiniteScroll()');
      console.log('  GodOfPromptResearch.extractCurrentPage()');
      console.log('  GodOfPromptResearch.findPaginationState()');
      console.log('  GodOfPromptResearch.testAllPatterns()');
    },

    // ============================================
    // UTILITY METHODS
    // ============================================
    showApiEndpoints() {
      console.log('\n📡 API Endpoints discovered:');
      console.log(this.apiEndpoints);
      return this.apiEndpoints;
    },

    testUrlPattern(pattern) {
      const testUrl = window.location.origin + window.location.pathname + pattern;
      console.log(`\n🧪 Testing URL: ${testUrl}`);
      window.location.href = testUrl;
    },

    tryInfiniteScroll() {
      console.log('\n📜 Testing infinite scroll...');
      let scrollCount = 0;
      const maxScrolls = 20;

      const scrollInterval = setInterval(() => {
        window.scrollTo(0, document.body.scrollHeight);
        scrollCount++;
        console.log(`📜 Scroll ${scrollCount}/${maxScrolls}`);

        const promptCount = document.querySelectorAll('[class*="prompt"]').length;
        console.log(`   Current prompts: ${promptCount}`);

        if (scrollCount >= maxScrolls) {
          clearInterval(scrollInterval);
          console.log('✅ Infinite scroll test complete');
          console.log(`   Total prompts: ${promptCount}`);
        }
      }, 2000);
    },

    extractCurrentPage() {
      console.log('\n📤 Extracting current page prompts...');

      const prompts = [];
      const promptElements = document.querySelectorAll('[class*="prompt"], [class*="card"], [class*="item"]');

      promptElements.forEach((el, index) => {
        const title = el.querySelector('h1, h2, h3, h4, [class*="title"]')?.textContent?.trim();
        const description = el.querySelector('p, [class*="description"], [class*="excerpt"]')?.textContent?.trim();
        const link = el.querySelector('a')?.href;
        const image = el.querySelector('img')?.src;

        if (title || description) {
          prompts.push({
            index,
            title,
            description,
            link,
            image
          });
        }
      });

      console.log(`✅ Extracted ${prompts.length} prompts`);
      console.table(prompts);

      // Download as JSON
      const blob = new Blob([JSON.stringify(prompts, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'godofprompt-page-1.json';
      a.click();

      return prompts;
    },

    findPaginationState() {
      console.log('\n🔍 Searching for pagination state...');

      // Check common state locations
      const stateLocations = [
        'window.pagination',
        'window.page',
        'window.currentPage',
        'window.state',
        'window.store',
        'window.__STATE__',
        'window.__INITIAL_STATE__',
        'window.webflowData'
      ];

      stateLocations.forEach(loc => {
        const parts = loc.split('.');
        let value = window;
        parts.forEach(part => {
          value = value?.[part];
        });

        if (value !== undefined) {
          console.log(`✅ Found: ${loc} =`, value);
        }
      });

      // Check all window properties for pagination-related data
      const windowProps = Object.keys(window).filter(key =>
        key.toLowerCase().includes('page') ||
        key.toLowerCase().includes('pagination') ||
        key.toLowerCase().includes('collection') ||
        key.toLowerCase().includes('items')
      );

      console.log('\n📋 Potential pagination-related window properties:');
      windowProps.forEach(prop => {
        try {
          console.log(`  window.${prop}:`, typeof window[prop]);
        } catch(e) {
          console.log(`  window.${prop}: [access denied]`);
        }
      });
    },

    async testAllPatterns() {
      console.log('\n🧪 Testing all pagination patterns...');

      const patterns = [
        '?page=2',
        '?p=2',
        '?offset=12',
        '?skip=12',
        '#page-2',
        '#2'
      ];

      const results = [];

      for (const pattern of patterns) {
        const testUrl = window.location.origin + window.location.pathname + pattern;
        console.log(`\nTesting: ${testUrl}`);

        try {
          const response = await fetch(testUrl);
          const text = await response.text();

          // Check if content is different from current page
          const currentContent = document.body.innerHTML.length;
          const newContent = text.length;

          results.push({
            pattern,
            url: testUrl,
            status: response.status,
            contentLength: newContent,
            different: Math.abs(currentContent - newContent) > 1000
          });

          console.log(`  Status: ${response.status}`);
          console.log(`  Content length: ${newContent}`);
          console.log(`  Different from current: ${results[results.length - 1].different}`);

        } catch(error) {
          results.push({
            pattern,
            url: testUrl,
            error: error.message
          });
          console.error(`  Error: ${error.message}`);
        }

        // Wait between requests
        await new Promise(r => setTimeout(r, 500));
      }

      console.log('\n📊 Test Results:');
      console.table(results);

      return results;
    }
  };

  // Initialize
  GodOfPromptResearch.init();

  // Make available globally
  window.GodOfPromptResearch = GodOfPromptResearch;

  console.log('\n✅ Toolkit loaded!');
  console.log('Type "GodOfPromptResearch" to see all methods');
  console.log('==============================================\n');

})();

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║     GOD OF PROMPT - ALL-IN-ONE RESEARCH & EXTRACTION TOOL    ║
 * ║                                                              ║
 * ║  Version: 1.0                                               ║
 * ║  Date: December 26, 2025                                     ║
 * ║  Purpose: Systematically test all pagination methods and     ║
 * ║           extract all ~984 prompts from godofprompt.com      ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * QUICK START:
 * 1. Go to https://godofprompt.com/prompts
 * 2. Open DevTools (F12) > Console
 * 3. Paste this entire script and press Enter
 * 4. Type: GodOfPrompt.auto() to run automated discovery
 *
 * TABLE OF CONTENTS:
 * - Section 1: Network Interception
 * - Section 2: Page Inspection
 * - Section 3: Pagination Testing (8 methods)
 * - Section 4: Data Extraction
 * - Section 5: One-Command Automation
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // SECTION 1: NETWORK INTERCEPTION
  // ═══════════════════════════════════════════════════════════════

  const NetworkMonitor = {
    requests: [],
    apiEndpoints: [],

    init() {
      console.log('📡 Initializing network monitor...');

      // Intercept Fetch API
      const originalFetch = window.fetch;
      window.fetch = (...args) => {
        const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
        this.requests.push({ type: 'FETCH', url, timestamp: Date.now() });

        if (url?.includes('/api/') || url?.includes('/_api/')) {
          this.apiEndpoints.push(url);
          console.log(`🔍 API Call: ${url}`);
        }

        return originalFetch.apply(window, args)
          .then(response => {
            if (this.apiEndpoints.includes(url)) {
              response.clone().json().then(data => {
                console.log(`📦 API Response:`, data);
              }).catch(() => {});
            }
            return response;
          });
      };

      // Intercept XMLHttpRequest
      const originalXHROpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url) {
        NetworkMonitor.requests.push({ type: 'XHR', url, timestamp: Date.now() });

        if (url?.includes('/api/') || url?.includes('/_api/')) {
          NetworkMonitor.apiEndpoints.push(url);
          console.log(`🔍 API Call: ${method} ${url}`);

          this.addEventListener('load', function() {
            try {
              const data = JSON.parse(this.responseText);
              console.log(`📦 API Response:`, data);
            } catch(e) {}
          });
        }

        return originalXHROpen.apply(this, arguments);
      };

      console.log('✅ Network monitor active');
    },

    getApiEndpoints() {
      return [...new Set(this.apiEndpoints)]; // Unique endpoints only
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // SECTION 2: PAGE INSPECTION
  // ═══════════════════════════════════════════════════════════════

  const PageInspector = {
    inspect() {
      console.log('\n🔍 Inspecting page structure...');
      console.log('━'.repeat(60));

      const results = {};

      // Count prompts
      const promptSelectors = ['.prompt-item', '.prompt-card', '[class*="prompt"]'];
      promptSelectors.forEach(selector => {
        const count = document.querySelectorAll(selector).length;
        if (count > 0) {
          results[selector] = count;
          console.log(`📋 ${selector}: ${count} found`);
        }
      });

      // Find pagination elements
      const paginationEls = document.querySelectorAll(
        '[class*="pagination"], [class*="next"], [aria-label*="next" i], [class*="page"]'
      );

      if (paginationEls.length > 0) {
        console.log(`\n🔢 Pagination elements: ${paginationEls.length}`);
        results.paginationElements = Array.from(paginationEls).map(el => ({
          tag: el.tagName,
          text: el.textContent.trim(),
          href: el.href,
          onclick: !!el.onclick
        }));
      } else {
        console.log('⚠️ No pagination elements found');
      }

      // Check Webflow
      results.webflow = {
        hasWebflow: !!window.Webflow,
        hasWfCollection: !!document.querySelector('[data-wf-collection]'),
        hasWized: !!document.querySelector('[wized]')
      };

      console.log(`\n🎨 Webflow: ${results.webflow.hasWebflow ? '✅' : '❌'}`);
      console.log(`🎨 Wized: ${results.webflow.hasWized ? '✅' : '❌'}`);

      return results;
    },

    findDataAttributes() {
      console.log('\n🏷️ Searching for data attributes...');

      const dataAttrs = {};
      const allElements = document.querySelectorAll('[data-wf-], [wized], [data-*]');

      allElements.forEach(el => {
        Object.keys(el.dataset).forEach(key => {
          if (!dataAttrs[key]) dataAttrs[key] = [];
          dataAttrs[key].push(el.dataset[key]);
        });
      });

      console.log('Found data attributes:', Object.keys(dataAttrs));
      return dataAttrs;
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // SECTION 3: PAGINATION TESTING (8 Methods)
  // ═══════════════════════════════════════════════════════════════

  const PaginationTester = {
    results: {},

    async method1_InfiniteScroll() {
      console.log('\n🧪 Method 1: Testing Infinite Scroll...');
      console.log('━'.repeat(60));

      const getPromptCount = () => {
        const prompts = document.querySelectorAll('[class*="prompt"], [class*="card"]');
        return prompts.length;
      };

      const initialCount = getPromptCount();
      console.log(`📊 Initial count: ${initialCount}`);

      let lastHeight = 0;
      let stuckCount = 0;
      const maxScrolls = 30;

      for (let i = 0; i < maxScrolls; i++) {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 1500));

        const currentHeight = document.body.scrollHeight;
        const currentCount = getPromptCount();

        console.log(`📜 Scroll ${i+1}/${maxScrolls} | Prompts: ${currentCount} | Height: ${currentHeight}`);

        if (currentHeight === lastHeight) {
          stuckCount++;
          if (stuckCount >= 3) {
            console.log('✅ Reached bottom');
            break;
          }
        } else {
          stuckCount = 0;
          lastHeight = currentHeight;
        }
      }

      const finalCount = getPromptCount();
      const loaded = finalCount - initialCount;

      this.results.infiniteScroll = {
        works: loaded > 0,
        initialCount,
        finalCount,
        loaded
      };

      console.log(`\n📊 Results: ${loaded > 0 ? '✅ WORKS!' : '❌ No new content loaded'}`);
      console.log(`   Loaded: ${loaded} additional prompts`);

      return this.results.infiniteScroll;
    },

    async method2_URLParameters() {
      console.log('\n🧪 Method 2: Testing URL Parameters...');
      console.log('━'.repeat(60));

      const patterns = [
        '?page=2', '?p=2', '?offset=12', '?skip=12',
        '#page-2', '#2', '?pagenum=2'
      ];

      const results = [];

      for (const pattern of patterns) {
        const testUrl = window.location.origin + window.location.pathname + pattern;
        console.log(`\n🔗 Testing: ${testUrl}`);

        try {
          const response = await fetch(testUrl);
          const text = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');
          const promptCount = doc.querySelectorAll('[class*="prompt"]').length;

          results.push({
            pattern,
            status: response.status,
            promptCount,
            works: promptCount > 0 && promptCount !== 12
          });

          console.log(`  Status: ${response.status} | Prompts: ${promptCount} ${results[results.length-1].works ? '✅' : ''}`);

        } catch(error) {
          console.log(`  ❌ Error: ${error.message}`);
          results.push({ pattern, error: error.message, works: false });
        }

        await new Promise(r => setTimeout(r, 300));
      }

      const workingPattern = results.find(r => r.works);
      this.results.urlParameters = {
        works: !!workingPattern,
        workingPattern: workingPattern?.pattern,
        allResults: results
      };

      console.log(`\n📊 ${workingPattern ? '✅ WORKS!' : '❌ No working patterns'}`);
      if (workingPattern) {
        console.log(`   Working pattern: ${workingPattern.pattern}`);
      }

      return this.results.urlParameters;
    },

    method3_WebflowAPI() {
      console.log('\n🧪 Method 3: Checking Webflow API...');
      console.log('━'.repeat(60));

      const endpoints = NetworkMonitor.getApiEndpoints();

      if (endpoints.length > 0) {
        console.log('✅ API endpoints found:');
        endpoints.forEach(ep => console.log(`   - ${ep}`));

        this.results.webflowAPI = {
          works: true,
          endpoints
        };
      } else {
        console.log('⚠️ No API endpoints detected yet');
        console.log('   Try navigating the page to trigger API calls');

        this.results.webflowAPI = {
          works: false,
          hint: 'Navigate the page first, then run GodOfPrompt.discoverAPI()'
        };
      }

      return this.results.webflowAPI;
    },

    method4_ClientSideData() {
      console.log('\n🧪 Method 4: Searching for Client-Side Data...');
      console.log('━'.repeat(60));

      const found = {};

      // Check scripts
      const scripts = document.querySelectorAll('script[type="application/json"], script[type="application/ld+json"]');
      scripts.forEach((script, i) => {
        try {
          const data = JSON.parse(script.textContent);
          if (data.items || data.collection || data.prompts) {
            found[`script_${i}`] = data;
            console.log(`✅ Found data in script ${i}`);
          }
        } catch(e) {}
      });

      // Check window object
      ['__INITIAL_STATE__', '__STATE__', '__DATA__', 'pageProps'].forEach(key => {
        if (window[key]) {
          found[key] = window[key];
          console.log(`✅ Found window.${key}`);
        }
      });

      this.results.clientSideData = {
        works: Object.keys(found).length > 0,
        data: found
      };

      console.log(`\n📊 ${Object.keys(found).length > 0 ? '✅ WORKS!' : '❌ No client-side data found'}`);

      return this.results.clientSideData;
    },

    method5_NextButton() {
      console.log('\n🧪 Method 5: Analyzing Next Button...');
      console.log('━'.repeat(60));

      const nextButtons = document.querySelectorAll('[class*="next"], [aria-label*="next" i]');

      if (nextButtons.length === 0) {
        console.log('❌ No next button found');
        this.results.nextButton = { works: false };
        return this.results.nextButton;
      }

      console.log(`🔍 Found ${nextButtons.length} next button(s)`);

      const analysis = Array.from(nextButtons).map((btn, i) => ({
        index: i,
        text: btn.textContent.trim(),
        href: btn.href,
        hasClickHandler: !!btn.onclick,
        tag: btn.tagName,
        disabled: btn.disabled
      }));

      console.table(analysis);

      const workingButton = analysis.find(b => b.href && !b.disabled);

      this.results.nextButton = {
        works: !!workingButton,
        buttons: analysis,
        workingButton
      };

      console.log(`\n📊 ${workingButton ? '✅ WORKS!' : '❌ No working next button'}`);

      return this.results.nextButton;
    },

    method6_DirectURLs() {
      console.log('\n🧪 Method 6: Testing Direct URLs...');
      console.log('━'.repeat(60));

      const paths = ['/prompts/2', '/prompts/page/2', '/prompts/page-2'];
      const results = [];

      paths.forEach(async path => {
        const testUrl = window.location.origin + path;
        console.log(`🔗 Testing: ${testUrl}`);

        fetch(testUrl)
          .then(r => {
            console.log(`  Status: ${r.status} ${r.ok ? '✅' : ''}`);
            results.push({ path, status: r.status, works: r.ok });
          })
          .catch(e => {
            console.log(`  ❌ Error: ${e.message}`);
            results.push({ path, error: e.message, works: false });
          });
      });

      this.results.directURLs = {
        results,
        works: results.some(r => r.works)
      };

      return this.results.directURLs;
    },

    method7_SearchBased() {
      console.log('\n🧪 Method 7: Testing Search-Based...');
      console.log('━'.repeat(60));

      const searchInput = document.querySelector('input[type="search"], [placeholder*="search" i]');

      if (!searchInput) {
        console.log('❌ No search input found');
        this.results.searchBased = { works: false };
        return this.results.searchBased;
      }

      console.log('✅ Search input found');
      console.log('💡 Try clearing search to show all results');

      this.results.searchBased = {
        works: true,
        hasSearchInput: true
      };

      return this.results.searchBased;
    },

    method8_Categories() {
      console.log('\n🧪 Method 8: Checking Categories...');
      console.log('━'.repeat(60));

      const categoryLinks = document.querySelectorAll('[data-category], [class*="category"] a');

      if (categoryLinks.length === 0) {
        console.log('❌ No category links found');
        this.results.categories = { works: false };
        return this.results.categories;
      }

      console.log(`✅ Found ${categoryLinks.length} category links`);

      const categories = Array.from(categoryLinks).map(link => ({
        text: link.textContent.trim(),
        href: link.href
      }));

      this.results.categories = {
        works: true,
        categories
      };

      return this.results.categories;
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // SECTION 4: DATA EXTRACTION
  // ═══════════════════════════════════════════════════════════════

  const DataExtractor = {
    extractCurrentPage() {
      console.log('\n📤 Extracting current page...');

      const prompts = [];
      const promptElements = document.querySelectorAll('[class*="prompt"], [class*="card"]');

      promptElements.forEach((el, i) => {
        const title = el.querySelector('h1, h2, h3, h4, [class*="title"]')?.textContent?.trim();
        const description = el.querySelector('p, [class*="description"]')?.textContent?.trim();
        const link = el.querySelector('a')?.href;
        const image = el.querySelector('img')?.src;

        if (title || description) {
          prompts.push({ index: i + 1, title, description, link, image });
        }
      });

      console.log(`✅ Extracted ${prompts.length} prompts`);
      console.table(prompts.slice(0, 5)); // Show first 5

      this.downloadJSON(prompts, 'prompts-current-page.json');

      return prompts;
    },

    downloadJSON(data, filename) {
      const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      console.log(`📥 Downloaded: ${filename}`);
    },

    async extractViaInfiniteScroll() {
      console.log('\n🚀 Extracting all prompts via infinite scroll...');

      const allPrompts = [];
      const seenTitles = new Set();

      while (true) {
        const currentElements = document.querySelectorAll('[class*="prompt"], [class*="card"]');
        let newCount = 0;

        currentElements.forEach(el => {
          const title = el.querySelector('h1, h2, h3, h4, [class*="title"]')?.textContent?.trim();

          if (title && !seenTitles.has(title)) {
            seenTitles.add(title);
            newCount++;

            allPrompts.push({
              title,
              description: el.querySelector('p, [class*="description"]')?.textContent?.trim(),
              link: el.querySelector('a')?.href,
              image: el.querySelector('img')?.src
            });
          }
        });

        console.log(`📊 Progress: ${allPrompts.length} unique prompts`);

        // Scroll
        const beforeHeight = document.body.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 2000));

        const afterHeight = document.body.scrollHeight;

        if (beforeHeight === afterHeight && newCount === 0) {
          console.log('✅ Reached end!');
          break;
        }
      }

      this.downloadJSON(allPrompts, 'all-prompts-infinite-scroll.json');
      return allPrompts;
    },

    async extractViaURLParam(pattern) {
      console.log(`\n🚀 Extracting all prompts via URL pattern: ${pattern}`);

      const allPrompts = [];

      for (let page = 1; page <= 82; page++) {
        const url = `${window.location.origin}${window.location.pathname}${pattern.replace('2', page)}`;
        console.log(`📄 Page ${page}/82...`);

        try {
          const response = await fetch(url);
          const text = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');

          const promptElements = doc.querySelectorAll('[class*="prompt"], [class*="card"]');

          promptElements.forEach(el => {
            const title = el.querySelector('h1, h2, h3, h4, [class*="title"]')?.textContent?.trim();
            const description = el.querySelector('p, [class*="description"]')?.textContent?.trim();
            const link = el.querySelector('a')?.href;

            if (title || description) {
              allPrompts.push({ page, title, description, link });
            }
          });

          console.log(`  ✅ Extracted ${promptElements.length} prompts`);

        } catch(error) {
          console.error(`  ❌ Error on page ${page}:`, error);
        }

        await new Promise(r => setTimeout(r, 500)); // Rate limiting
      }

      this.downloadJSON(allPrompts, 'all-prompts-url-param.json');
      return allPrompts;
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // SECTION 5: ONE-COMMAND AUTOMATION
  // ═══════════════════════════════════════════════════════════════

  const GodOfPrompt = {
    version: '1.0',

    init() {
      console.clear();
      console.log(`
╔══════════════════════════════════════════════════════════════╗
║     GOD OF PROMPT - RESEARCH & EXTRACTION TOOL v${this.version}       ║
╚══════════════════════════════════════════════════════════════╝
      `);

      NetworkMonitor.init();
      PageInspector.inspect();
      PageInspector.findDataAttributes();

      this.showMenu();
    },

    showMenu() {
      console.log(`
📖 AVAILABLE COMMANDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 DISCOVERY:
  GodOfPrompt.auto()              - Run all tests automatically
  GodOfPrompt.testAll()           - Test all 8 pagination methods
  GodOfPrompt.discoverAPI()       - Show discovered API endpoints

🧪 INDIVIDUAL TESTS:
  GodOfPrompt.test(1)             - Test infinite scroll
  GodOfPrompt.test(2)             - Test URL parameters
  GodOfPrompt.test(3)             - Test Webflow API
  GodOfPrompt.test(4)             - Test client-side data
  GodOfPrompt.test(5)             - Test next button
  GodOfPrompt.test(6)             - Test direct URLs
  GodOfPrompt.test(7)             - Test search
  GodOfPrompt.test(8)             - Test categories

📤 EXTRACTION:
  GodOfPrompt.extractCurrent()    - Extract current page
  GodOfPrompt.extractAll(method)  - Extract all prompts using method

📊 RESULTS:
  GodOfPrompt.results             - Show all test results
  GodOfPrompt.summary()           - Show summary report

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
    },

    async auto() {
      console.log('\n🚀 RUNNING AUTOMATED DISCOVERY...\n');
      console.log('━'.repeat(60));

      await this.testAll();
      this.summary();

      console.log('\n✅ Automated discovery complete!');
      console.log('💡 Run GodOfPrompt.extractAll(methodNumber) to extract all prompts');
    },

    async testAll() {
      console.log('\n🧪 TESTING ALL PAGINATION METHODS\n');

      await PaginationTester.method1_InfiniteScroll();
      await PaginationTester.method2_URLParameters();
      PaginationTester.method3_WebflowAPI();
      PaginationTester.method4_ClientSideData();
      PaginationTester.method5_NextButton();
      PaginationTester.method6_DirectURLs();
      PaginationTester.method7_SearchBased();
      PaginationTester.method8_Categories();

      console.log('\n✅ All tests complete!');
    },

    test(methodNumber) {
      const methods = {
        1: () => PaginationTester.method1_InfiniteScroll(),
        2: () => PaginationTester.method2_URLParameters(),
        3: () => PaginationTester.method3_WebflowAPI(),
        4: () => PaginationTester.method4_ClientSideData(),
        5: () => PaginationTester.method5_NextButton(),
        6: () => PaginationTester.method6_DirectURLs(),
        7: () => PaginationTester.method7_SearchBased(),
        8: () => PaginationTester.method8_Categories()
      };

      if (methods[methodNumber]) {
        return methods[methodNumber]();
      } else {
        console.error(`❌ Invalid method number: ${methodNumber}`);
      }
    },

    discoverAPI() {
      const endpoints = NetworkMonitor.getApiEndpoints();
      console.log('\n📡 Discovered API Endpoints:');
      console.table(endpoints);
      return endpoints;
    },

    extractCurrent() {
      return DataExtractor.extractCurrentPage();
    },

    async extractAll(methodNumber) {
      const results = PaginationTester.results;

      // Auto-detect if method not specified
      if (!methodNumber) {
        console.log('\n🔍 Auto-detecting best extraction method...');

        if (results.infiniteScroll?.works) {
          methodNumber = 1;
          console.log('✅ Using: Infinite Scroll');
        } else if (results.urlParameters?.works) {
          methodNumber = 2;
          console.log('✅ Using: URL Parameters');
        } else if (results.webflowAPI?.works) {
          methodNumber = 3;
          console.log('✅ Using: Webflow API');
        } else {
          console.log('❌ No working method found. Run GodOfPrompt.testAll() first.');
          return;
        }
      }

      console.log(`\n🚀 Extracting all prompts using method ${methodNumber}...`);

      switch(methodNumber) {
        case 1:
          return await DataExtractor.extractViaInfiniteScroll();
        case 2:
          const pattern = results.urlParameters?.workingPattern || '?page=2';
          return await DataExtractor.extractViaURLParam(pattern);
        default:
          console.log(`❌ Method ${methodNumber} extraction not yet implemented`);
      }
    },

    get results() {
      return PaginationTester.results;
    },

    summary() {
      console.log('\n📊 SUMMARY REPORT');
      console.log('━'.repeat(60));

      const results = PaginationTester.results;

      const methods = [
        { name: 'Infinite Scroll', key: 'infiniteScroll' },
        { name: 'URL Parameters', key: 'urlParameters' },
        { name: 'Webflow API', key: 'webflowAPI' },
        { name: 'Client-Side Data', key: 'clientSideData' },
        { name: 'Next Button', key: 'nextButton' },
        { name: 'Direct URLs', key: 'directURLs' },
        { name: 'Search-Based', key: 'searchBased' },
        { name: 'Categories', key: 'categories' }
      ];

      const workingMethods = [];
      const notWorkingMethods = [];

      methods.forEach(method => {
        const result = results[method.key];
        const status = result?.works ? '✅' : '❌';
        console.log(`${status} ${method.name}`);

        if (result?.works) {
          workingMethods.push(method.name);
        } else {
          notWorkingMethods.push(method.name);
        }
      });

      console.log('\n' + '━'.repeat(60));
      console.log(`✅ Working Methods: ${workingMethods.length}`);
      workingMethods.forEach(m => console.log(`   • ${m}`));

      console.log(`\n❌ Not Working: ${notWorkingMethods.length}`);
      notWorkingMethods.forEach(m => console.log(`   • ${m}`));

      if (workingMethods.length > 0) {
        console.log('\n💡 Next step: Run GodOfPrompt.extractAll() to extract all prompts');
      } else {
        console.log('\n⚠️ No working methods found. Manual inspection may be needed.');
      }
    }
  };

  // Initialize and expose to window
  GodOfPrompt.init();

  // Make available globally
  window.GodOfPrompt = GodOfPrompt;
  window.NetworkMonitor = NetworkMonitor;
  window.PageInspector = PageInspector;
  window.PaginationTester = PaginationTester;
  window.DataExtractor = DataExtractor;

  console.log('\n✅ Tool loaded successfully!');
  console.log('💡 Type GodOfPrompt.auto() to begin automated discovery\n');

})();

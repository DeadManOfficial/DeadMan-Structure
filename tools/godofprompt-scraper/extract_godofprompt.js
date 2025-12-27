// ============================================================================
// GOD OF PROMPT - COMPLETE PROMPT EXTRACTION SCRIPT
// ============================================================================
// This script will extract ALL free prompts from godofprompt.ai
// Run this in your Chrome browser console (F12 → Console → Paste → Enter)
// ============================================================================

(async function GodOfPromptExtractor() {
  console.log('🚀 Starting God of Prompt Complete Extraction...');
  console.log('⏱️ Please wait - this may take several minutes...\n');

  const CONFIG = {
    baseUrl: 'https://www.godofprompt.ai/prompts?premium=false',
    maxPages: 82,
    delayBetweenPages: 2500, // 2.5 seconds between page loads
    delayBetweenClicks: 500,
    maxEmptyPages: 3 // Stop after 3 consecutive pages with no new prompts
  };

  const state = {
    allPrompts: [],
    seenUrls: new Set(),
    currentPage: 1,
    emptyPageCount: 0,
    totalPages: 0
  };

  // --------------------------------------------------------------------------
  // Helper Functions
  // --------------------------------------------------------------------------

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function extractPromptsFromCurrentPage() {
    const prompts = [];
    const promptLinks = document.querySelectorAll('a[href*="/prompt?prompt="]');

    promptLinks.forEach(link => {
      const url = link.href;
      if (!url.includes('prompt?prompt=')) return;
      if (state.seenUrls.has(url)) return;

      // Find the title
      let title = 'Untitled';
      const h3 = link.querySelector('h3') || link.closest('div')?.querySelector('h3');
      if (h3) title = h3.textContent.trim();

      // Find description
      let description = '';
      const descElem = link.nextElementSibling || link.parentElement?.querySelector('div:not([class])');
      if (descElem && descElem.textContent.length < 500) {
        description = descElem.textContent.trim();
      }

      state.seenUrls.add(url);
      prompts.push({
        title,
        url,
        description: description.substring(0, 200),
        page: state.currentPage,
        extractedAt: new Date().toISOString()
      });
    });

    return prompts;
  }

  async function clickNextButton() {
    const nextBtn = Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'Next');
    if (!nextBtn) {
      console.log('❌ No Next button found');
      return false;
    }

    console.log('   ↪️ Clicking Next button...');
    nextBtn.click();
    await sleep(CONFIG.delayBetweenPages);
    return true;
  }

  function updateProgress() {
    const percent = ((state.currentPage - 1) / CONFIG.maxPages * 100).toFixed(1);
    process.stdout.write(`\r   📊 Progress: Page ${state.currentPage}/${CONFIG.maxPages} (${percent}%) | Prompts: ${state.allPrompts.length}    `);
  }

  function saveProgress() {
    const data = JSON.stringify(state.allPrompts, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `godofprompt_prompts_page_${state.currentPage}_${state.allPrompts.length}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // --------------------------------------------------------------------------
  // Main Extraction Logic
  // --------------------------------------------------------------------------

  console.log('📍 Navigating to page 1...');
  window.location.href = CONFIG.baseUrl;
  await sleep(4000); // Wait for initial page load

  console.log('📄 Extracting page 1...');
  let pagePrompts = extractPromptsFromCurrentPage();
  state.allPrompts.push(...pagePrompts);
  console.log(`   ✅ Page 1: Found ${pagePrompts.length} prompts\n`);

  // Main extraction loop
  for (state.currentPage = 2; state.currentPage <= CONFIG.maxPages; state.currentPage++) {
    updateProgress();

    // Try to navigate to next page
    const navigated = await clickNextButton();
    if (!navigated) {
      console.log('\n⚠️ Cannot navigate further. Stopping.');
      break;
    }

    // Extract prompts from current page
    pagePrompts = extractPromptsFromCurrentPage();

    // Check if we found new prompts
    const newOnes = pagePrompts.filter(p =>
      !state.allPrompts.some(ap => ap.url === p.url)
    );

    if (newOnes.length === 0) {
      state.emptyPageCount++;
      console.log(`   ⚠️ No new prompts on page ${state.currentPage}`);

      if (state.emptyPageCount >= CONFIG.maxEmptyPages) {
        console.log(`\n⏹️ ${state.emptyPageCount} consecutive empty pages. Stopping.`);
        break;
      }
    } else {
      state.emptyPageCount = 0;
      state.allPrompts.push(...newOnes);
      console.log(`   ✅ Page ${state.currentPage}: ${newOnes.length} new prompts (Total: ${state.allPrompts.length})`);
    }

    // Save progress every 10 pages
    if (state.currentPage % 10 === 0) {
      console.log('\n   💾 Saving checkpoint...');
      saveProgress();
    }

    // Safety stop
    if (state.allPrompts.length >= 900) {
      console.log('\n✅ Reached 900+ prompts. Near completion!');
      break;
    }
  }

  // --------------------------------------------------------------------------
  // Final Results
  // --------------------------------------------------------------------------

  console.log('\n\n' + '='.repeat(70));
  console.log('✅ EXTRACTION COMPLETE!');
  console.log('='.repeat(70));
  console.log(`📊 Total Prompts Extracted: ${state.allPrompts.length}`);
  console.log(`📄 Pages Processed: ${state.currentPage - 1}/${CONFIG.maxPages}`);
  console.log(`⏱️ Completed At: ${new Date().toLocaleString()}`);
  console.log('='.repeat(70));

  // Show sample
  console.log('\n📋 Sample Prompts (First 5):');
  state.allPrompts.slice(0, 5).forEach((p, i) => {
    console.log(`\n${i + 1}. ${p.title}`);
    console.log(`   URL: ${p.url}`);
  });

  // Final save
  console.log('\n💾 Saving final results...');
  saveProgress();

  console.log('\n✨ All done! Check your Downloads folder for the JSON file.');
  console.log('📁 Filename: godofprompt_prompts_final_' + state.allPrompts.length + '.json');

  return state.allPrompts;

})();

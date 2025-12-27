// ============================================================================
// GOD OF PROMPT - FULL PROMPT CONTENT EXTRACTION
// ============================================================================
// This script visits EACH prompt page and extracts the COMPLETE prompt text
// Run in browser console (F12 → Console → Paste → Enter)
// ============================================================================

(async function extractFullPrompts() {
  console.log('🚀 Starting FULL PROMPT extraction...');
  console.log('⏱️ This will take 15-20 minutes (visiting each prompt page)...\n');

  const CONFIG = {
    delayBetweenPages: 3000,  // 3 seconds between page loads
    delayBetweenPrompts: 2000, // 2 seconds when visiting individual prompts
    maxPages: 82
  };

  const state = {
    allPrompts: [],
    seenUrls: new Set(),
    currentPage: 1,
    currentPromptIndex: 0
  };

  // Helper function
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Extract prompt links from the listing page
  function getPromptLinksFromCurrentPage() {
    const links = [];
    document.querySelectorAll('a[href*="/prompt?prompt="]').forEach(link => {
      const url = link.href;
      if (!state.seenUrls.has(url)) {
        const h3 = link.querySelector('h3') || link.closest('div')?.querySelector('h3');
        links.push({
          url: url,
          title: h3?.textContent?.trim() || 'Untitled'
        });
        state.seenUrls.add(url);
      }
    });
    return links;
  }

  // Extract FULL prompt content from an individual prompt page
  async function extractFullPromptContent(url) {
    try {
      // Navigate to the prompt page
      window.location.href = url;
      await sleep(CONFIG.delayBetweenPrompts);

      // Use get_page_text approach via DOM
      const pageText = document.body.innerText;

      // Find the section between "ChatGPT Prompt" and "Copy"
      const promptStart = pageText.indexOf('ChatGPT Prompt');
      const copyStart = pageText.indexOf('Copy', promptStart);

      if (promptStart === -1 || copyStart === -1) {
        console.log('   ⚠️ Could not find prompt content for:', url);
        return null;
      }

      // Extract the content
      let fullPrompt = pageText.substring(promptStart + 13, copyStart).trim();

      // Clean it up
      fullPrompt = fullPrompt
        .replace(/^Affiliate Script Creator|^[A-Z][A-Z\s]+$/gm, '') // Remove headers
        .replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
        .trim();

      // Get metadata
      const title = document.querySelector('h1')?.textContent?.trim() ||
                   document.querySelector('h3')?.textContent?.trim() ||
                   'Untitled';

      const description = document.querySelector('meta[name="description"]')?.content || '';

      return {
        title: title,
        url: url,
        description: description,
        fullPromptText: fullPrompt,
        extractedAt: new Date().toISOString()
      };
    } catch (error) {
      console.log('   ❌ Error extracting', url, ':', error.message);
      return null;
    }
  }

  // Alternative: Use textContent extraction for better reliability
  async function extractFullPromptContentV2(url) {
    try {
      window.location.href = url;
      await sleep(CONFIG.delayBetweenPrompts);

      // Find all text content on the page
      const allText = document.body.innerText;

      // Look for patterns that indicate prompt content
      // Usually after "ChatGPT Prompt" and before "Copy" or "How To Use"
      const patterns = [
        /ChatGPT Prompt\s*([\s\S]*?)\s*Copy/gi,
        /ChatGPT Prompt\s*([\s\S]*?)\s*How To Use/gi,
        /ChatGPT Prompt\s*([\s\S]*?)\s*Example Output/gi
      ];

      let fullPrompt = '';
      for (const pattern of patterns) {
        const match = allText.match(pattern);
        if (match && match[1] && match[1].length > fullPrompt.length) {
          fullPrompt = match[1].trim();
        }
      }

      if (!fullPrompt) {
        // Fallback: look for large text blocks
        const textBlocks = allText.split('\n\n');
        for (const block of textBlocks) {
          if (block.length > 200 && block.includes('Adopt the role')) {
            fullPrompt = block.trim();
            break;
          }
        }
      }

      if (!fullPrompt) {
        return null;
      }

      const title = document.querySelector('h1')?.textContent?.trim() || 'Untitled';

      return {
        title: title,
        url: url,
        fullPromptText: fullPrompt,
        extractedAt: new Date().toISOString()
      };
    } catch (error) {
      console.log('   ❌ Error:', error.message);
      return null;
    }
  }

  // Main extraction loop
  console.log('📍 Starting at page 1...\n');

  for (let page = 1; page <= CONFIG.maxPages; page++) {
    console.log(`\n📄 Processing page ${page}...`);

    // Get all prompt links from current page
    const promptLinks = getPromptLinksFromCurrentPage();
    console.log(`   Found ${promptLinks.length} prompts on page ${page}`);

    if (promptLinks.length === 0 && page > 1) {
      console.log('   ⚠️ No new prompts found. Stopping.');
      break;
    }

    // Visit each prompt and extract full content
    for (let i = 0; i < promptLinks.length; i++) {
      const link = promptLinks[i];
      state.currentPromptIndex++;

      console.log(`   [${state.currentPromptIndex}] Extracting: ${link.title.substring(0, 40)}...`);

      const fullPrompt = await extractFullPromptContentV2(link.url);
      if (fullPrompt) {
        state.allPrompts.push(fullPrompt);
        console.log(`       ✅ Extracted (${fullPrompt.fullPromptText.length} chars)`);
      }

      // Save progress every 10 prompts
      if (state.currentPromptIndex % 10 === 0) {
        saveProgress(`checkpoint_${state.currentPromptIndex}`);
        console.log(`   💾 Checkpoint saved (${state.allPrompts.length} total)`);
      }
    }

    // Navigate to next page
    if (page < CONFIG.maxPages) {
      const nextBtn = Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'Next');
      if (nextBtn) {
        console.log('   ↪️ Going to next page...');
        nextBtn.click();
        await sleep(CONFIG.delayBetweenPages);
      } else {
        console.log('   ⚠️ No Next button. Stopping.');
        break;
      }
    }
  }

  // Save final results
  console.log('\n\n' + '='.repeat(70));
  console.log('✅ EXTRACTION COMPLETE!');
  console.log('='.repeat(70));
  console.log(`📊 Total Prompts: ${state.allPrompts.length}`);
  console.log('='.repeat(70));

  saveProgress('FINAL');

  // Show sample
  console.log('\n📋 Sample (first prompt):');
  if (state.allPrompts.length > 0) {
    console.log('\nTitle:', state.allPrompts[0].title);
    console.log('URL:', state.allPrompts[0].url);
    console.log('\nFull Prompt Text (first 500 chars):');
    console.log(state.allPrompts[0].fullPromptText.substring(0, 500) + '...\n');
  }

  console.log('✨ All done! Check your Downloads folder.');
  console.log(`📁 Filename: godofprompt_FULL_${state.allPrompts.length}.json`);

  return state.allPrompts;

  // Helper function to save progress
  function saveProgress(suffix) {
    const data = JSON.stringify(state.allPrompts, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `godofprompt_FULL_${state.allPrompts.length}_${suffix}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

})();

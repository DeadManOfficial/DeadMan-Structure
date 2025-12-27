// ============================================================================
// GOD OF PROMPT - COMPLETE EXTRACTION (WITH FULL PROMPT TEXT)
// ============================================================================
// This script:
// 1. Extracts all prompt links from the current page
// 2. Visits EACH prompt page individually
// 3. Extracts the COMPLETE prompt text
// 4. Downloads everything to a JSON file
// ============================================================================

(async function extractAllFullPrompts() {
  console.log('🚀 Starting COMPLETE prompt extraction...');
  console.log('⏱️ This will take 15-20 minutes...\n');

  const allPrompts = [];
  const seenUrls = new Set();

  // Helper: Wait function
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Step 1: Get all prompt links from current listing page
  function getPromptLinks() {
    const links = [];
    document.querySelectorAll('a[href*="/prompt?prompt="]').forEach(link => {
      const url = link.href;
      if (!seenUrls.has(url)) {
        seenUrls.add(url);

        // Find the card container
        let card = link;
        for (let i = 0; i < 5; i++) {
          if (card.parentElement) card = card.parentElement;
          if (card.textContent.length > 100) break;
        }

        // Extract title
        const heading = card.querySelector('h2, h3, h4, h5');
        const title = heading ? heading.textContent.trim() : 'Untitled';

        links.push({ url, title });
      }
    });
    return links;
  }

  // Step 2: Visit each prompt page and extract FULL text
  async function extractFullPrompt(promptInfo) {
    try {
      console.log(`   Extracting: ${promptInfo.title.substring(0, 40)}...`);

      // Navigate to the prompt page
      window.location.href = promptInfo.url;
      await sleep(2500); // Wait for page to load

      // Method 1: Try to find text between "ChatGPT Prompt" and "Copy"
      const bodyText = document.body.innerText;

      // Find the prompt section
      const promptStart = bodyText.indexOf('ChatGPT Prompt');
      if (promptStart === -1) {
        console.log('      ⚠️ No prompt text found');
        return null;
      }

      // Find where the prompt ends (before "Copy", "How To Use", or "Example Output")
      const copyIdx = bodyText.indexOf('Copy', promptStart);
      const howToUseIdx = bodyText.indexOf('How To Use', promptStart);
      const exampleIdx = bodyText.indexOf('Example Output', promptStart);

      let endIdx = Math.min(
        copyIdx !== -1 ? copyIdx : Infinity,
        howToUseIdx !== -1 ? howToUseIdx : Infinity,
        exampleIdx !== -1 ? exampleIdx : Infinity
      );

      if (endIdx === Infinity) {
        endIdx = bodyText.indexOf('MOST IMPORTANT!', promptStart);
      }

      if (endIdx === -1 || endIdx > promptStart + 5000) {
        endIdx = promptStart + 3000; // Fallback: take next 3000 chars
      }

      // Extract the prompt text
      let fullText = bodyText.substring(promptStart + 13, endIdx).trim();

      // Clean up the text
      fullText = fullText
        .replace(/^Affiliate Script Creator\s*/gm, '')
        .replace(/^\d+\.\s+/gm, '') // Remove numbering
        .replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
        .trim();

      // Get additional metadata
      const pageTitle = document.querySelector('h1')?.textContent?.trim() || promptInfo.title;

      return {
        title: pageTitle,
        url: promptInfo.url,
        fullPromptText: fullText,
        extractedAt: new Date().toISOString(),
        characterCount: fullText.length
      };

    } catch (error) {
      console.log(`      ❌ Error: ${error.message}`);
      return null;
    }
  }

  // Step 3: Process all prompts on current page
  console.log('📄 Page 1: Getting prompt links...');
  let promptLinks = getPromptLinks();
  console.log(`   Found ${promptLinks.length} prompts\n`);

  // Extract each prompt's full text
  for (let i = 0; i < promptLinks.length; i++) {
    const result = await extractFullPrompt(promptLinks[i]);
    if (result) {
      allPrompts.push(result);
      console.log(`      ✅ Extracted (${result.characterCount} chars)`);
    }

    // Save checkpoint every 5 prompts
    if ((i + 1) % 5 === 0) {
      saveCheckpoint(`checkpoint_${allPrompts.length}`);
      console.log(`   💾 Checkpoint saved (${allPrompts.length} total)\n`);
    }
  }

  // Step 4: Try to navigate to next pages and repeat
  for (let page = 2; page <= 82; page++) {
    console.log(`\n📄 Navigating to page ${page}...`);

    // Go back to listing page if we're on a prompt page
    if (!window.location.href.includes('/prompts?')) {
      window.location.href = 'https://www.godofprompt.ai/prompts?premium=false';
      await sleep(3000);
    }

    // Click Next button
    const nextBtn = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Next');
    if (!nextBtn) {
      console.log('   ⚠️ No Next button found. Stopping.');
      break;
    }

    nextBtn.click();
    await sleep(3000);

    // Get new page's prompts
    const pageLinks = getPromptLinks().filter(l =>
      !allPrompts.some(p => p.url === l.url)
    );

    if (pageLinks.length === 0) {
      console.log('   ⚠️ No new prompts found. Stopping.');
      break;
    }

    console.log(`   Found ${pageLinks.length} new prompts\n`);

    // Extract each prompt
    for (let i = 0; i < pageLinks.length; i++) {
      const result = await extractFullPrompt(pageLinks[i]);
      if (result) {
        allPrompts.push(result);
        console.log(`      ✅ [${allPrompts.length}] ${result.title.substring(0, 30)}... (${result.characterCount} chars)`);
      }

      if (allPrompts.length % 5 === 0) {
        saveCheckpoint(`page${page}_${allPrompts.length}`);
      }

      // Safety stop
      if (allPrompts.length >= 900) {
        console.log('\n   ✅ Reached 900+ prompts. Near completion!');
        break;
      }
    }

    if (allPrompts.length >= 900) break;
  }

  // Step 5: Save final results
  console.log('\n' + '='.repeat(70));
  console.log('✅ EXTRACTION COMPLETE!');
  console.log('='.repeat(70));
  console.log(`📊 Total Prompts: ${allPrompts.length}`);
  console.log('='.repeat(70));

  saveFinalResults();

  // Show sample
  if (allPrompts.length > 0) {
    console.log('\n📋 Sample Prompt (First one):');
    console.log('\nTitle:', allPrompts[0].title);
    console.log('URL:', allPrompts[0].url);
    console.log('\nFull Prompt Text (first 300 chars):');
    console.log(allPrompts[0].fullPromptText.substring(0, 300) + '...\n');
  }

  console.log('✨ All done! Check your Downloads folder.');
  console.log(`📁 Filename: godofprompt_COMPLETE_${allPrompts.length}_prompts.json`);

  return allPrompts;

  // Helper functions for saving
  function saveCheckpoint(suffix) {
    const blob = new Blob([JSON.stringify(allPrompts, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `godofprompt_${suffix}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function saveFinalResults() {
    const blob = new Blob([JSON.stringify(allPrompts, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `godofprompt_COMPLETE_${allPrompts.length}_prompts.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

})();

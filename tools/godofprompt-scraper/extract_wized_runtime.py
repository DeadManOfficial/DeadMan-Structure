#!/usr/bin/env python3
"""
God of Prompt - Direct Wized Runtime Manipulation
This approach accesses the Wized data directly from JavaScript
"""

import json
import time
import csv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def extract_via_wized_runtime():
    """Extract by accessing Wized runtime data directly"""

    chrome_options = Options()
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
    chrome_options.add_argument("--window-size=1920,1080")

    driver = webdriver.Chrome(options=chrome_options)

    try:
        print("Loading page...")
        driver.get("https://www.godofprompt.ai/prompts?premium=false")

        # Wait for Wized to initialize
        print("Waiting for Wized to load...")
        time.sleep(8)

        # Explore Wized object structure
        explore_script = """
        // Deep exploration of Wized object
        function exploreWized() {
            const results = {};

            // Check if Wized exists
            if (!window.Wized) {
                results.error = "Wized not found";
                return results;
            }

            // List all top-level properties
            results.topLevelKeys = Object.keys(window.Wized);

            // Check for data storage
            if (window.Wized.data) {
                results.dataKeys = Object.keys(window.Wized.data);
                results.dataType = typeof window.Wized.data;
            }

            // Check for request function
            if (window.Wized.request) {
                results.hasRequest = true;
                results.requestType = typeof window.Wized.request;
            }

            // Check for get method
            if (window.Wized.get) {
                results.hasGet = true;
                results.getType = typeof window.Wized.get;
            }

            // Check for pagination-related data
            results.paginationInfo = {};

            // Look for page data
            const currentPageEl = document.querySelector('[wized="pagin-cur-page"]');
            const totalPagesEl = document.querySelector('[wized="pagin-all-pages"]');

            if (currentPageEl && totalPagesEl) {
                results.paginationInfo.currentPage = currentPageEl.textContent.trim();
                results.paginationInfo.totalPages = totalPagesEl.textContent.trim();
            }

            // Try to find data in window object
            const wizedDataKeys = Object.keys(window).filter(k =>
                k.toLowerCase().includes('wized') ||
                k.toLowerCase().includes('prompt') ||
                k.toLowerCase().includes('data')
            );
            results.windowDataKeys = wizedDataKeys;

            return results;
        }

        return exploreWized();
        """

        exploration = driver.execute_script(explore_script)
        print("\nWized Object Structure:")
        print(json.dumps(exploration, indent=2))

        # Try to access prompt data
        get_prompts_script = """
        function getAllPrompts() {
            const prompts = [];
            const items = document.querySelectorAll('[wized="plp_prompt_item_all"]');

            items.forEach((item, index) => {
                const nameEl = item.querySelector('[wized="plp_prompt_name"]');
                const descEl = item.querySelector('[wized="plp_prompt_description"]');
                const idEl = item.querySelector('[wized="plp_prompt_id"]');
                const linkEl = item.querySelector('[wized="plp_prompt_item_link"]');

                const name = nameEl?.textContent?.trim() || '';
                const desc = descEl?.textContent?.trim() || '';
                const id = idEl?.textContent?.trim() || '';
                const link = linkEl?.getAttribute('href') || '';

                if (name && name !== 'Heading') {
                    prompts.push({
                        index: index + 1,
                        id: id,
                        name: name,
                        description: desc,
                        link: link
                    });
                }
            });

            return prompts;
        }

        return getAllPrompts();
        """

        page1_prompts = driver.execute_script(get_prompts_script)
        print(f"\nPage 1: {len(page1_prompts)} prompts found")

        # Display first few prompts
        for i, prompt in enumerate(page1_prompts[:5]):
            print(f"\n{i+1}. {prompt['name']}")
            print(f"   ID: {prompt['id']}")
            print(f"   Desc: {prompt['description'][:80]}...")

        # Now let's try to programmatically navigate pages
        # Strategy: Click Next button and extract data
        print("\n" + "="*60)
        print("Starting pagination extraction...")
        print("="*60)

        all_prompts = []
        all_prompts.extend(page1_prompts)

        for page in range(2, 11):  # Test first 10 pages
            print(f"\nPage {page}:")

            # Click Next
            try:
                next_btn = driver.find_element(By.ID, "pag-next-button")
                driver.execute_script("arguments[0].scrollIntoView(); arguments[0].click();", next_btn)
                time.sleep(2)

                # Get prompts
                prompts = driver.execute_script(get_prompts_script)
                print(f"  Found {len(prompts)} prompts")

                # Check if we got new prompts (not duplicates)
                if prompts and prompts[0]['name'] != all_prompts[-1]['name']:
                    all_prompts.extend(prompts)
                else:
                    print("  No new prompts - stopping")
                    break

            except Exception as e:
                print(f"  Error: {e}")
                break

        print(f"\n{'='*60}")
        print(f"Total prompts extracted: {len(all_prompts)}")
        print(f"{'='*60}")

        # Save to CSV
        if all_prompts:
            filename = f"godofprompt_extracted_{len(all_prompts)}_prompts.csv"
            with open(filename, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=['index', 'id', 'name', 'description', 'link'])
                writer.writeheader()
                writer.writerows(all_prompts)

            print(f"\nSaved to: {filename}")

            # Show statistics
            print(f"\nExtraction Statistics:")
            print(f"  Total prompts: {len(all_prompts)}")
            print(f"  Pages processed: {len(all_prompts) // 12 + 1}")
            print(f"  Average prompts per page: {len(all_prompts) / (len(all_prompts) // 12 + 1):.1f}")

    except Exception as e:
        print(f"\nError: {e}")
        import traceback
        traceback.print_exc()

    finally:
        print("\nPress Enter to close browser...")
        input()
        driver.quit()

if __name__ == "__main__":
    extract_via_wized_runtime()

#!/usr/bin/env python3
"""
God of Prompt - Browser-based Extraction using Chrome DevTools Protocol
This script uses Selenium with CDP to monitor network requests and extract all prompts
"""

import json
import time
import csv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def extract_all_prompts():
    """Extract all prompts by monitoring network traffic and programmatically clicking Next"""

    # Setup Chrome with network monitoring
    chrome_options = Options()
    chrome_options.set_capability("goog:loggingPrefs", {"performance": "ALL"})
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")

    driver = webdriver.Chrome(options=chrome_options)

    # Storage for all prompts
    all_prompts = []
    api_endpoints = set()

    try:
        print("Loading page...")
        driver.get("https://www.godofprompt.ai/prompts?premium=false")

        # Wait for page to load
        time.sleep(5)

        # Get performance logs to find API endpoints
        logs = driver.get_log("performance")
        print(f"\nAnalyzing {len(logs)} network requests...")

        for entry in logs:
            try:
                log = json.loads(entry["message"])["message"]
                if log["method"] == "Network.requestWillBeSent":
                    url = log["params"]["request"]["url"]
                    # Look for API endpoints
                    if "api" in url.lower() or "wized" in url.lower() or "fetch" in url.lower():
                        api_endpoints.add(url)
                        print(f"Found API endpoint: {url}")
            except:
                pass

        print(f"\nFound {len(api_endpoints)} unique API endpoints")

        # Try to access Wized object in browser
        wized_script = """
        return typeof window.Wized !== 'undefined' ? {
            version: window.Wized.version,
            data: window.Wized.data,
            request: window.Wized.request,
            get: typeof window.Wized.get
        } : null;
        """

        wized_info = driver.execute_script(wized_script)
        print(f"\nWized object info: {json.dumps(wized_info, indent=2)}")

        # Get current page prompts
        prompts_script = """
        const prompts = [];
        const items = document.querySelectorAll('[wized="plp_prompt_item_all"]');
        items.forEach(item => {
            const name = item.querySelector('[wized="plp_prompt_name"]')?.textContent?.trim();
            const description = item.querySelector('[wized="plp_prompt_description"]')?.textContent?.trim();
            const id = item.querySelector('[wized="plp_prompt_id"]')?.textContent?.trim();
            if (name && name !== 'Heading') {
                prompts.push({ id, name, description });
            }
        });
        return prompts;
        """

        current_prompts = driver.execute_script(prompts_script)
        print(f"\nPage 1: Found {len(current_prompts)} prompts")
        all_prompts.extend(current_prompts)

        # Now try to navigate through pages
        max_pages = 82
        for page_num in range(2, min(6, max_pages + 1)):  # Test first 5 pages
            print(f"\nNavigating to page {page_num}...")

            # Try clicking Next button
            try:
                next_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.ID, "pag-next-button"))
                )
                driver.execute_script("arguments[0].click();", next_button)
                time.sleep(3)

                # Get prompts from new page
                page_prompts = driver.execute_script(prompts_script)
                print(f"Page {page_num}: Found {len(page_prompts)} prompts")
                all_prompts.extend(page_prompts)

            except Exception as e:
                print(f"Error on page {page_num}: {e}")
                break

        # Save results
        print(f"\nTotal prompts extracted: {len(all_prompts)}")

        if all_prompts:
            filename = f"godofprompt_prompts_{len(all_prompts)}_{int(time.time())}.csv"
            with open(filename, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=['id', 'name', 'description'])
                writer.writeheader()
                writer.writerows(all_prompts)
            print(f"Saved to {filename}")

            # Show sample
            print("\nSample prompts:")
            for i, prompt in enumerate(all_prompts[:3]):
                print(f"{i+1}. {prompt['name']}")
                print(f"   {prompt['description'][:100]}...")

    finally:
        driver.quit()

    return all_prompts

if __name__ == "__main__":
    print("="*60)
    print("God of Prompt - Browser-based Extraction")
    print("="*60)
    extract_all_prompts()

#!/usr/bin/env python3
"""
God of Prompt - Extract All Free Prompts
Uses Wized API to paginate through all pages and extract prompt data
"""

import requests
import json
import time
import csv
from datetime import datetime

# Configuration
BASE_URL = "https://www.godofprompt.ai"
WIZED_APP_ID = "MPTxsc76igUGInBcKAc3"
CATEGORY = "marketing"
PREMIUM = False

# Wized API endpoint pattern (based on Webflow + Wized architecture)
# Wized typically exposes their data through specific endpoints

def extract_prompts_manual_approach():
    """
    Manual approach: Since URL params don't work, we'll need to interact
    with the Wized runtime directly or simulate what the Next button does.
    """

    # First, let's try to discover the actual API endpoint
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })

    # Fetch the main page to get Wized configuration
    print("Fetching main page to discover Wized endpoints...")
    response = session.get(f"{BASE_URL}/prompts?premium=false")

    # Look for Wized data in the response
    # Wized typically stores data in window.Wized or makes API calls

    return None

def try_wized_api_direct():
    """
    Try to access Wized API directly
    Wized apps typically expose endpoints like:
    - https://app.wized.com/api/v1/{app_id}/...
    - Or through iframe communication
    """

    # Common Wized API patterns
    endpoints = [
        f"https://app.wized.com/api/v1/{WIZED_APP_ID}/data",
        f"https://api.wized.com/v1/apps/{WIZED_APP_ID}/data",
        f"https://embed.wized.com/{WIZED_APP_ID}/api/data",
    ]

    session = requests.Session()
    for endpoint in endpoints:
        print(f"Trying endpoint: {endpoint}")
        try:
            response = session.get(endpoint, timeout=10)
            if response.status_code == 200:
                print(f"SUCCESS! Status: {response.status_code}")
                print(f"Response preview: {response.text[:500]}")
                return endpoint
        except Exception as e:
            print(f"Failed: {e}")

    return None

def try_webflow_cms_api():
    """
    Webflow CMS has a standard API structure
    Try to access the CMS items directly
    """
    # Webflow CMS API patterns
    # Usually requires API key, but let's try public endpoints

    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
    })

    # Try to find the CMS collection ID from the page
    print("Trying to discover CMS endpoints...")

    # Webflow sites typically expose data through:
    # - /_api/cms/...
    # - Site-specific endpoints

    cms_endpoints = [
        f"{BASE_URL}/_api/webflow/cms/items",
        f"{BASE_URL}/.netlify/functions/cms",
    ]

    for endpoint in cms_endpoints:
        try:
            response = session.get(endpoint, timeout=10)
            print(f"{endpoint}: {response.status_code}")
        except Exception as e:
            print(f"{endpoint}: Error - {e}")

def main():
    print("="*60)
    print("God of Prompt - Free Prompts Extractor")
    print("="*60)
    print(f"Target: {CATEGORY} category")
    print(f"Premium filter: {PREMIUM}")
    print(f"Expected pages: ~82")
    print(f"Expected prompts: ~984")
    print("="*60)
    print()

    # Strategy 1: Try Wized API directly
    print("Strategy 1: Wized API")
    wized_endpoint = try_wized_api_direct()
    print()

    # Strategy 2: Try Webflow CMS API
    print("Strategy 2: Webflow CMS API")
    try_webflow_cms_api()
    print()

    # Strategy 3: Analyze what the Next button actually does
    print("Strategy 3: Browser-based extraction")
    print("We need to:")
    print("1. Load the page in a browser")
    print("2. Hook into the Wized runtime")
    print("3. Programmatically click Next or call Wized pagination functions")
    print("4. Extract data from each page")
    print()

    # Strategy 4: Look for hidden API endpoints in the page source
    print("Strategy 4: Discover API endpoints from page source")
    print("Run: curl -s 'https://www.godofprompt.ai/prompts?premium=false' | grep -i 'api\\|fetch\\|endpoint'")
    print()

    print("RECOMMENDED APPROACH:")
    print("-" * 60)
    print("Use Selenium/Puppeteer with Chrome DevTools Protocol to:")
    print("1. Load the page")
    print("2. Monitor network requests when clicking 'Next'")
    print("3. Identify the actual API endpoint")
    print("4. Call that endpoint directly with pagination parameters")
    print()
    print("The key is finding the Wized data endpoint that loads")
    print("the prompt data. Once found, we can paginate through")
    print("all 82 pages by changing page/offset parameters.")
    print("-" * 60)

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
God of Prompt - Complete Free Prompts Extractor
Extracts ALL free prompts from the Directus API
"""

import requests
import json
import csv
import time
from datetime import datetime

# Configuration
DIRECTUS_API = "https://gop-directus.up.railway.app"
OUTPUT_FILE = f"godofprompt_free_prompts_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"

# Fields we want to extract
FIELDS = "id,slug,prompt_name,page_name,description,premium,new,icon,date_created,views,likes"

def get_total_free_prompts():
    """Get total count of free prompts"""
    print("Getting total count of free prompts...")

    # First, try to get count using meta
    url = f"{DIRECTUS_API}/items/prompts"
    params = {
        "filter[premium][_eq]": "false",
        "meta": "total_count",
        "limit": 1
    }

    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        total = data.get("meta", {}).get("total_count", 0)
        print(f"Total free prompts: {total}")
        return total
    else:
        print(f"Error getting count: {response.status_code}")
        return 0

def get_all_prompts():
    """Extract all free prompts with pagination"""

    all_prompts = []
    page = 0
    limit = 100  # Directus default max
    offset = 0

    print(f"Starting extraction...")
    print(f"API: {DIRECTUS_API}")
    print(f"Filter: premium=false")
    print(f"Limit per request: {limit}")
    print("-" * 60)

    while True:
        url = f"{DIRECTUS_API}/items/prompts"
        params = {
            "fields": FIELDS,
            "filter[premium][_eq]": "false",
            "limit": limit,
            "offset": offset,
            "sort": "-id"
        }

        print(f"Fetching page {page + 1} (offset {offset})...", end=" ")

        try:
            response = requests.get(url, params=params)

            if response.status_code != 200:
                print(f"ERROR: Status {response.status_code}")
                break

            data = response.json()
            prompts = data.get("data", [])

            if not prompts:
                print("No more prompts found")
                break

            print(f"Got {len(prompts)} prompts")
            all_prompts.extend(prompts)

            # Check if we've got all data
            if len(prompts) < limit:
                print("\nReached end of results")
                break

            offset += limit
            page += 1

            # Small delay to be nice to the API
            time.sleep(0.1)

        except Exception as e:
            print(f"ERROR: {e}")
            break

    return all_prompts

def save_to_csv(prompts, filename):
    """Save prompts to CSV file"""

    if not prompts:
        print("No prompts to save!")
        return

    # Get all unique fields from the data
    fieldnames = ['id', 'slug', 'prompt_name', 'page_name', 'description',
                 'premium', 'new', 'icon', 'date_created', 'views', 'likes']

    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
        writer.writeheader()

        for prompt in prompts:
            writer.writerow(prompt)

    print(f"\nSaved {len(prompts)} prompts to {filename}")

def show_statistics(prompts):
    """Show statistics about extracted prompts"""

    print("\n" + "=" * 60)
    print("EXTRACTION STATISTICS")
    print("=" * 60)
    print(f"Total prompts extracted: {len(prompts)}")

    # Count by new status
    new_count = sum(1 for p in prompts if p.get('new') == True)
    print(f"New prompts: {new_count}")

    # Count by icon/category
    icons = {}
    for p in prompts:
        icon = p.get('icon', 'unknown')
        icons[icon] = icons.get(icon, 0) + 1

    print(f"\nTop 10 icons:")
    for icon, count in sorted(icons.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"  {icon}: {count}")

    # Show sample prompts
    print(f"\nSample prompts:")
    for i, prompt in enumerate(prompts[:5]):
        print(f"\n{i+1}. {prompt.get('page_name', 'N/A')}")
        print(f"   ID: {prompt.get('id')}")
        print(f"   Slug: {prompt.get('slug')}")
        desc = prompt.get('description', '')[:100]
        print(f"   Description: {desc}...")

    print("=" * 60)

def main():
    print("=" * 60)
    print("God of Prompt - Free Prompts Extractor")
    print("=" * 60)
    print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()

    # Get total count
    total = get_total_free_prompts()

    if total == 0:
        print("No free prompts found!")
        return

    print()

    # Extract all prompts
    prompts = get_all_prompts()

    print()

    # Save to CSV
    if prompts:
        save_to_csv(prompts, OUTPUT_FILE)
        show_statistics(prompts)

        # Also save as JSON for backup
        json_file = OUTPUT_FILE.replace('.csv', '.json')
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(prompts, f, indent=2, ensure_ascii=False)
        print(f"\nAlso saved JSON backup to {json_file}")

    print("\n✅ Extraction complete!")

if __name__ == "__main__":
    main()

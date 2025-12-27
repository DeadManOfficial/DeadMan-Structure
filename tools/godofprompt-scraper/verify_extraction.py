#!/usr/bin/env python3
"""
Quick verification that the extraction worked
"""

import csv
import os

def verify():
    """Verify the extraction"""

    print("="*60)
    print("EXTRACTION VERIFICATION")
    print("="*60)

    # Find the CSV file
    csv_file = None
    for file in os.listdir('.'):
        if file.startswith('godofprompt_free_prompts_') and file.endswith('.csv'):
            csv_file = file
            break

    if not csv_file:
        print("❌ No CSV file found!")
        return False

    print(f"✅ Found data file: {csv_file}")

    # Check file size
    size = os.path.getsize(csv_file)
    print(f"✅ File size: {size:,} bytes ({size/1024:.1f} KB)")

    # Load and count
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    print(f"✅ Total prompts: {len(rows):,}")

    # Check columns
    expected_cols = ['id', 'slug', 'prompt_name', 'page_name', 'description',
                    'premium', 'new', 'icon', 'date_created', 'views', 'likes']
    actual_cols = rows[0].keys() if rows else []

    if set(expected_cols) <= set(actual_cols):
        print(f"✅ All expected columns present ({len(actual_cols)} total)")
    else:
        print(f"❌ Missing columns: {set(expected_cols) - set(actual_cols)}")
        return False

    # Sample check
    print(f"\n✅ Sample data:")
    print(f"   First prompt: {rows[0]['page_name']}")
    print(f"   Description: {rows[0]['description'][:60]}...")
    print(f"   Icon: {rows[0]['icon']}")
    print(f"   ID: {rows[0]['id']}")

    # Check all are free
    premium_count = sum(1 for r in rows if r.get('premium') == 'true')
    if premium_count == 0:
        print(f"✅ All prompts are free (premium=false)")
    else:
        print(f"⚠️  Found {premium_count} premium prompts in free dataset")

    # Check for new prompts
    new_count = sum(1 for r in rows if r.get('new') == 'True')
    print(f"✅ New prompts: {new_count}")

    print("\n" + "="*60)
    print("VERIFICATION COMPLETE")
    print("="*60)
    print(f"✅ Extraction successful!")
    print(f"✅ {len(rows):,} free prompts ready to use")
    print(f"✅ Data file: {csv_file}")

    return True

if __name__ == "__main__":
    verify()

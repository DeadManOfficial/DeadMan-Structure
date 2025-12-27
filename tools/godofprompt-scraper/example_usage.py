#!/usr/bin/env python3
"""
Example: How to use the extracted God of Prompt data
"""

import csv
import json

def load_prompts(filename=None):
    """Load prompts from CSV or JSON file"""

    if filename is None:
        # Find the most recent file
        import glob
        files = glob.glob('godofprompt_free_prompts_*.csv')
        if not files:
            print("No data files found!")
            return []
        filename = sorted(files)[-1]

    print(f"Loading from {filename}...")

    # Try JSON first (faster)
    json_file = filename.replace('.csv', '.json')
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        pass

    # Fall back to CSV
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return list(reader)

def search_prompts(prompts, query):
    """Search prompts by name or description"""

    query = query.lower()
    results = []

    for prompt in prompts:
        name = prompt.get('page_name', '').lower()
        desc = prompt.get('description', '').lower()

        if query in name or query in desc:
            results.append(prompt)

    return results

def get_statistics(prompts):
    """Get statistics about the prompts"""

    stats = {
        'total': len(prompts),
        'new': sum(1 for p in prompts if p.get('new') == 'True' or p.get('new') is True),
    }

    # Count by icon
    icons = {}
    for p in prompts:
        icon = p.get('icon', 'unknown')
        icons[icon] = icons.get(icon, 0) + 1

    stats['icons'] = dict(sorted(icons.items(), key=lambda x: x[1], reverse=True))

    return stats

def display_prompt(prompt):
    """Display a single prompt"""
    print(f"\n{'='*60}")
    print(f"Name: {prompt.get('page_name', 'N/A')}")
    print(f"ID: {prompt.get('id')}")
    print(f"Icon: {prompt.get('icon', '')}")
    print(f"New: {prompt.get('new', 'N/A')}")
    print(f"Views: {prompt.get('views', '0')}")
    print(f"Likes: {prompt.get('likes', '0')}")
    print(f"\nDescription:")
    print(f"  {prompt.get('description', 'N/A')}")
    print(f"\nSlug: {prompt.get('slug', 'N/A')}")
    print(f"URL: https://www.godofprompt.ai/prompt?prompt={prompt.get('slug', '')}")
    print(f"{'='*60}")

def main():
    """Main example usage"""

    print("="*60)
    print("God of Prompt - Data Usage Examples")
    print("="*60)

    # Load the data
    prompts = load_prompts()
    print(f"Loaded {len(prompts)} prompts\n")

    # Example 1: Get statistics
    print("Example 1: Statistics")
    print("-" * 60)
    stats = get_statistics(prompts)
    print(f"Total prompts: {stats['total']}")
    print(f"New prompts: {stats['new']}")
    print(f"\nTop 5 categories (by icon):")
    for icon, count in list(stats['icons'].items())[:5]:
        print(f"  {icon}: {count}")

    # Example 2: Search for marketing prompts
    print("\n\nExample 2: Search for 'marketing' prompts")
    print("-" * 60)
    results = search_prompts(prompts, 'marketing')
    print(f"Found {len(results)} marketing prompts")
    for i, prompt in enumerate(results[:3]):
        print(f"\n{i+1}. {prompt.get('page_name')}")

    # Example 3: Display a specific prompt
    print("\n\nExample 3: Display a specific prompt")
    print("-" * 60)
    if prompts:
        display_prompt(prompts[0])

    # Example 4: Export filtered prompts
    print("\n\nExample 4: Export new prompts only")
    print("-" * 60)
    new_prompts = [p for p in prompts if p.get('new') == 'True' or p.get('new') is True]
    print(f"Found {len(new_prompts)} new prompts")

    if new_prompts:
        output_file = 'new_prompts_only.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(new_prompts, f, indent=2, ensure_ascii=False)
        print(f"Exported to {output_file}")

    # Example 5: Create a simple prompt list
    print("\n\nExample 5: Create a simple text list")
    print("-" * 60)
    with open('prompt_list.txt', 'w', encoding='utf-8') as f:
        for i, prompt in enumerate(prompts[:10], 1):
            f.write(f"{i}. {prompt.get('page_name')}\n")
            f.write(f"   {prompt.get('description')[:100]}...\n")
            f.write(f"   URL: https://www.godofprompt.ai/prompt?prompt={prompt.get('slug')}\n\n")
    print("Created prompt_list.txt with first 10 prompts")

    print("\n" + "="*60)
    print("Examples complete!")
    print("="*60)

if __name__ == "__main__":
    main()

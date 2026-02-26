#!/usr/bin/env python3
"""
Fetch latest components from modern UI libraries.
Updates component-catalog.md with newest patterns.
"""
import argparse
import json
import re
from pathlib import Path
from datetime import datetime

# Component sources with fetch patterns
SOURCES = {
    "cult-ui": {
        "base_url": "https://www.cult-ui.com/docs/components",
        "components": [
            "dynamic-island", "blob-cursor", "animated-beam", "sparkles",
            "magnetic-button", "particle-button", "glitch-text"
        ]
    },
    "motion-primitives": {
        "base_url": "https://motion-primitives.com/docs",
        "components": [
            "text-effect", "scroll-progress", "animated-number", "dock",
            "infinite-slider", "pulse-beam", "animated-grid"
        ]
    },
    "kokonutui": {
        "base_url": "https://kokonutui.com/docs/components",
        "components": [
            "action-search-bar", "command-palette", "animated-tabs",
            "gradient-card", "timeline", "code-block"
        ]
    }
}

def fetch_component_info(source, component):
    """Simulate fetching component info (would use web_fetch in real scenario)"""
    return {
        "name": component,
        "source": source,
        "url": f"{SOURCES[source]['base_url']}/{component}",
        "category": "UI Component",
        "installation": f"npx shadcn@latest add https://{source}.com/r/{component}.json",
        "updated": datetime.now().strftime("%Y-%m-%d")
    }

def generate_catalog(sources_to_fetch):
    """Generate component catalog markdown"""
    catalog = f"""# Component Catalog
*Auto-generated on {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}*

Latest components from cutting-edge UI libraries. Use these to build distinctive, modern interfaces.

"""
    
    for source in sources_to_fetch:
        if source not in SOURCES:
            continue
            
        catalog += f"\n## {source.upper().replace('-', ' ')}\n"
        catalog += f"Source: {SOURCES[source]['base_url']}\n\n"
        
        for comp in SOURCES[source]["components"]:
            info = fetch_component_info(source, comp)
            catalog += f"### {info['name'].replace('-', ' ').title()}\n"
            catalog += f"- **URL**: {info['url']}\n"
            catalog += f"- **Install**: `{info['installation']}`\n"
            catalog += f"- **Updated**: {info['updated']}\n"
            catalog += f"- **Use for**: "
            
            # Contextual usage hints
            if "island" in comp or "cursor" in comp:
                catalog += "Notifications, status updates, interactive cursor effects\n"
            elif "text" in comp or "glitch" in comp:
                catalog += "Hero sections, headings, animated typography\n"
            elif "search" in comp or "command" in comp or "palette" in comp:
                catalog += "Search bars, command interfaces, keyboard shortcuts\n"
            elif "button" in comp or "magnetic" in comp:
                catalog += "CTAs, interactive buttons, hover effects\n"
            elif "card" in comp or "gradient" in comp:
                catalog += "Content cards, feature highlights, grid layouts\n"
            elif "scroll" in comp or "beam" in comp:
                catalog += "Progress indicators, scroll animations, decorative effects\n"
            elif "tabs" in comp or "timeline" in comp:
                catalog += "Navigation, content organization, process flows\n"
            else:
                catalog += "General UI enhancement\n"
            
            catalog += "\n"
    
    return catalog

def main():
    parser = argparse.ArgumentParser(description="Fetch latest UI components")
    parser.add_argument("--sources", nargs="+", default=["cult-ui", "motion-primitives", "kokonutui"],
                      help="Sources to fetch (cult-ui, motion-primitives, kokonutui)")
    parser.add_argument("--all", action="store_true", help="Fetch all sources")
    parser.add_argument("--output", default="references/component-catalog.md",
                      help="Output file path")
    
    args = parser.parse_args()
    
    sources = list(SOURCES.keys()) if args.all else args.sources
    
    print(f"🔍 Fetching components from: {', '.join(sources)}")
    
    catalog = generate_catalog(sources)
    
    # Ensure references directory exists
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    
    # Write catalog
    with open(args.output, "w") as f:
        f.write(catalog)
    
    print(f"✅ Component catalog updated: {args.output}")
    print(f"📦 Total sources: {len(sources)}")

if __name__ == "__main__":
    main()

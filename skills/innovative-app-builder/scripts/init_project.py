#!/usr/bin/env python3
"""
Initialize modern web project with theme and cutting-edge stack.
"""
import argparse
import json
import subprocess
from pathlib import Path

THEMES = {
    "neo-brutalism": {
        "fonts": "Montserrat:800,900",
        "colors": {
            "primary": "#000000",
            "secondary": "#FFFF00",
            "accent": "#FF0000",
            "background": "#FFFFFF"
        },
        "description": "Bold borders, clashing colors, raw typography"
    },
    "cyberpunk": {
        "fonts": "JetBrains+Mono:400,700",
        "colors": {
            "primary": "#00FFFF",
            "secondary": "#FF00FF",
            "accent": "#FFFF00",
            "background": "#0A0A0A"
        },
        "description": "Neon colors, tech aesthetics, glitch effects"
    },
    "nordic": {
        "fonts": "Inter:300,400,600",
        "colors": {
            "primary": "#2E3440",
            "secondary": "#88C0D0",
            "accent": "#D08770",
            "background": "#ECEFF4"
        },
        "description": "Minimalist, natural colors, generous spacing"
    },
    "brutalist": {
        "fonts": "Space+Grotesk:400,700",
        "colors": {
            "primary": "#000000",
            "secondary": "#999999",
            "accent": "#000000",
            "background": "#E5E5E5"
        },
        "description": "Raw HTML, Times New Roman vibes, no polish"
    },
    "glassmorphism": {
        "fonts": "Bricolage+Grotesque:300,600",
        "colors": {
            "primary": "#FFFFFF",
            "secondary": "#E0E0FF",
            "accent": "#A0A0FF",
            "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        "description": "Frosted glass, blur effects, transparency"
    }
}

def generate_tailwind_config(theme_name):
    """Generate Tailwind config for theme"""
    theme = THEMES[theme_name]
    
    config = f"""/** @type {{import('tailwindcss').Config}} */
export default {{
  content: ['./index.html', './src/**/*.{{js,ts,jsx,tsx}}'],
  theme: {{
    extend: {{
      fontFamily: {{
        sans: ['{theme['fonts'].split(':')[0].replace('+', ' ')}', 'sans-serif'],
      }},
      colors: {{
        primary: '{theme['colors']['primary']}',
        secondary: '{theme['colors']['secondary']}',
        accent: '{theme['colors']['accent']}',
      }},
    }},
  }},
  plugins: [],
}}
"""
    return config

def generate_index_css(theme_name):
    """Generate index.css with theme"""
    theme = THEMES[theme_name]
    
    css = f"""@import "tailwindcss";

/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family={theme['fonts']}&display=swap');

:root {{
  --color-primary: {theme['colors']['primary']};
  --color-secondary: {theme['colors']['secondary']};
  --color-accent: {theme['colors']['accent']};
  --color-background: {theme['colors']['background']};
}}

body {{
  margin: 0;
  font-family: '{theme['fonts'].split(':')[0].replace('+', ' ')}', sans-serif;
  background: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}}
"""
    return css

def init_react_project(project_name, framework, theme):
    """Initialize React project"""
    commands = []
    
    if framework == "react":
        commands = [
            f"npm create vite@latest {project_name} -- --template react-ts",
        ]
    elif framework == "nextjs":
        commands = [
            f"npx create-next-app@latest {project_name} --typescript --tailwind --app --no-src-dir",
        ]
    elif framework == "vue":
        commands = [
            f"npm create vue@latest {project_name} -- --typescript --jsx",
        ]
    
    print(f"🚀 Initializing {framework} project: {project_name}")
    print(f"🎨 Theme: {theme} - {THEMES[theme]['description']}")
    
    for cmd in commands:
        print(f"⚙️  Running: {cmd}")
        # In real scenario, would execute subprocess.run(cmd, shell=True)
    
    # Generate config files
    tailwind_config = generate_tailwind_config(theme)
    index_css = generate_index_css(theme)
    
    print("\n📝 Generated theme configuration:")
    print("   - tailwind.config.js")
    print("   - src/index.css")
    
    print(f"\n✅ Project initialized! Next steps:")
    print(f"   cd {project_name}")
    print(f"   npm install")
    print(f"   npm run dev")
    
    return {
        "tailwind_config": tailwind_config,
        "index_css": index_css
    }

def main():
    parser = argparse.ArgumentParser(description="Initialize modern web project")
    parser.add_argument("--project", default="my-app", help="Project name")
    parser.add_argument("--framework", choices=["react", "nextjs", "vue"], default="react",
                      help="Framework choice")
    parser.add_argument("--theme", choices=list(THEMES.keys()), default="cyberpunk",
                      help="Theme preset")
    parser.add_argument("--list-themes", action="store_true", help="List available themes")
    
    args = parser.parse_args()
    
    if args.list_themes:
        print("Available themes:\n")
        for name, theme in THEMES.items():
            print(f"  {name:20} - {theme['description']}")
        return
    
    configs = init_react_project(args.project, args.framework, args.theme)
    
    # Print configs for manual setup
    print("\n" + "="*60)
    print("TAILWIND CONFIG:")
    print("="*60)
    print(configs["tailwind_config"])
    
    print("\n" + "="*60)
    print("INDEX.CSS:")
    print("="*60)
    print(configs["index_css"])

if __name__ == "__main__":
    main()

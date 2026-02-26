#!/usr/bin/env python3
"""
Validate UX quality: accessibility, performance, distinctiveness.
"""
import argparse
import re
from pathlib import Path

# Convergence patterns to detect (anti-patterns)
CONVERGENCE_PATTERNS = {
    "fonts": [
        r"font-family:\s*['\"]?(Inter|Roboto|Open\s+Sans|Lato|Arial|sans-serif)['\"]?",
        r"fontFamily:\s*['\"]?(Inter|Roboto|Open\s+Sans|Lato)['\"]?",
    ],
    "colors": [
        r"#667eea|#764ba2",  # Purple gradients
        r"rgb\(102,\s*126,\s*234\)|rgb\(118,\s*75,\s*162\)",
    ],
    "layouts": [
        r"grid-cols-3.*gap-[46]",  # 3-card grid pattern
    ]
}

ACCESSIBILITY_CHECKS = {
    "alt_text": r"<img(?![^>]*alt=)",
    "aria_labels": r"<button(?![^>]*aria-label)",
    "semantic_html": r"<div\s+class=['\"]?(header|footer|nav|main)['\"]?",  # Should use semantic tags
}

def scan_file_for_patterns(filepath, patterns):
    """Scan file for problematic patterns"""
    issues = []
    try:
        content = Path(filepath).read_text()
        for category, pattern_list in patterns.items():
            for pattern in pattern_list:
                matches = re.findall(pattern, content, re.IGNORECASE)
                if matches:
                    issues.append({
                        "file": filepath,
                        "category": category,
                        "pattern": pattern,
                        "matches": len(matches)
                    })
    except Exception as e:
        pass
    return issues

def check_distinctiveness(directory="."):
    """Check for generic AI convergence patterns"""
    print("\n🎨 DISTINCTIVENESS CHECK")
    print("="*60)
    
    issues = []
    for ext in ["*.tsx", "*.jsx", "*.css", "*.ts", "*.js"]:
        for file in Path(directory).rglob(ext):
            if "node_modules" not in str(file):
                file_issues = scan_file_for_patterns(file, CONVERGENCE_PATTERNS)
                issues.extend(file_issues)
    
    if issues:
        print(f"❌ Found {len(issues)} convergence patterns:\n")
        for issue in issues[:10]:  # Show first 10
            print(f"  {issue['file']}: {issue['category']} detected ({issue['matches']} matches)")
        if len(issues) > 10:
            print(f"  ... and {len(issues) - 10} more")
        return False
    else:
        print("✅ No generic AI patterns detected!")
        print("   - No boring fonts (Inter, Roboto, etc.)")
        print("   - No purple gradients")
        print("   - No cookie-cutter layouts")
        return True

def check_accessibility(directory="."):
    """Basic accessibility checks"""
    print("\n♿ ACCESSIBILITY CHECK")
    print("="*60)
    
    issues = []
    for ext in ["*.tsx", "*.jsx", "*.html"]:
        for file in Path(directory).rglob(ext):
            if "node_modules" not in str(file):
                file_issues = scan_file_for_patterns(file, ACCESSIBILITY_CHECKS)
                issues.extend(file_issues)
    
    if issues:
        print(f"⚠️  Found {len(issues)} potential accessibility issues:\n")
        for issue in issues[:5]:
            print(f"  {issue['file']}: Missing {issue['category']}")
        print("\n   Run full audit with Lighthouse or axe DevTools")
        return False
    else:
        print("✅ Basic accessibility checks passed!")
        print("   Note: Run Lighthouse for comprehensive audit")
        return True

def check_performance(directory="."):
    """Performance analysis"""
    print("\n⚡ PERFORMANCE CHECK")
    print("="*60)
    
    # Count imports (simple heuristic)
    import_count = 0
    large_files = []
    
    for ext in ["*.tsx", "*.jsx", "*.ts", "*.js"]:
        for file in Path(directory).rglob(ext):
            if "node_modules" not in str(file):
                try:
                    content = Path(file).read_text()
                    import_count += len(re.findall(r"^import\s+", content, re.MULTILINE))
                    
                    # Check file size
                    size_kb = len(content) / 1024
                    if size_kb > 50:  # >50KB is large for a component
                        large_files.append((file, size_kb))
                except:
                    pass
    
    print(f"📊 Analysis:")
    print(f"   - Total imports: {import_count}")
    
    if large_files:
        print(f"   - Large files detected: {len(large_files)}")
        for file, size in large_files[:3]:
            print(f"     • {file}: {size:.1f}KB")
    
    print("\n💡 Recommendations:")
    print("   - Run Lighthouse in Chrome DevTools")
    print("   - Target: LCP <2.5s, FID <100ms, CLS <0.1")
    print("   - Bundle size: <500KB initial load")
    print("   - Use code splitting for large apps")
    
    return True

def generate_report():
    """Generate comprehensive checklist"""
    print("\n📋 PRE-LAUNCH CHECKLIST")
    print("="*60)
    
    checklist = [
        ("Zero generic AI patterns", "distinctiveness"),
        ("2+ modern components integrated", "manual"),
        ("Lighthouse score >90", "lighthouse"),
        ("WCAG 2.1 AA compliance", "accessibility"),
        ("Distinctive aesthetic applied", "manual"),
        ("Latest components consulted", "manual"),
        ("UX validated against personas", "manual"),
    ]
    
    for item, category in checklist:
        status = "⬜" if category == "manual" else "🔍"
        print(f"{status} {item}")
    
    print("\n" + "="*60)

def main():
    parser = argparse.ArgumentParser(description="Validate UX quality")
    parser.add_argument("--checklist", nargs="+", 
                       choices=["accessibility", "performance", "distinctiveness", "all"],
                       default=["all"],
                       help="Checks to run")
    parser.add_argument("--full", action="store_true", help="Run all checks + generate report")
    parser.add_argument("--dir", default=".", help="Directory to scan")
    
    args = parser.parse_args()
    
    checks = args.checklist
    if "all" in checks or args.full:
        checks = ["distinctiveness", "accessibility", "performance"]
    
    results = {}
    
    if "distinctiveness" in checks:
        results["distinctiveness"] = check_distinctiveness(args.dir)
    
    if "accessibility" in checks:
        results["accessibility"] = check_accessibility(args.dir)
    
    if "performance" in checks:
        results["performance"] = check_performance(args.dir)
    
    if args.full:
        generate_report()
    
    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    all_passed = all(results.values())
    if all_passed:
        print("✅ All checks passed!")
    else:
        print("⚠️  Some issues detected - review above")
    
    print("\n💡 Next steps:")
    print("   1. Fix any identified issues")
    print("   2. Run Lighthouse audit in Chrome DevTools")
    print("   3. Test keyboard navigation manually")
    print("   4. Test on mobile device")
    print("   5. Get feedback from target users")

if __name__ == "__main__":
    main()

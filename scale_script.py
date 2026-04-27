import re

with open("app/behandlinger/page.tsx", "r") as f:
    lines = f.readlines()

def scale_clamp(m):
    # m.group(1) is the prefix (e.g., pt-)
    # m.group(2) is the inner content of clamp
    prefix = m.group(1)
    inner = m.group(2)
    
    def scale_num(match):
        num = float(match.group(1))
        unit = match.group(2)
        scaled = round(num * 0.8, 3)
        # remove trailing .0
        scaled_str = f"{scaled:g}"
        return f"{scaled_str}{unit}"
    
    scaled_inner = re.sub(r'([0-9.]+)([a-zA-Z%]+)', scale_num, inner)
    return f"{prefix}[clamp({scaled_inner})] 2xl:{prefix}[clamp({inner})]"

STATIC_MAPPINGS = {
    "max-w-7xl": "max-w-5xl 2xl:max-w-7xl",
    "max-w-6xl": "max-w-4xl 2xl:max-w-6xl",
    "max-w-3xl": "max-w-xl 2xl:max-w-3xl",
    "max-w-2xl": "max-w-lg 2xl:max-w-2xl",
    "max-w-[500px]": "max-w-[400px] 2xl:max-w-[500px]",
    "max-w-[300px]": "max-w-[240px] 2xl:max-w-[300px]",
    "max-w-[320px]": "max-w-[250px] 2xl:max-w-[320px]",
    "space-y-6": "space-y-5 2xl:space-y-6",
    "space-y-8": "space-y-6 2xl:space-y-8",
    "gap-8": "gap-6 2xl:gap-8",
    "gap-6": "gap-5 2xl:gap-6",
    "gap-4": "gap-3 2xl:gap-4",
    "mb-8": "mb-6 2xl:mb-8",
    "mb-6": "mb-5 2xl:mb-6",
    "mb-4": "mb-3 2xl:mb-4",
    "mb-3": "mb-2 2xl:mb-3",
    "pb-3": "pb-2 2xl:pb-3",
    "mt-8": "mt-6 2xl:mt-8",
    "p-6": "p-5 2xl:p-6"
}

def process_class_str(class_str):
    tokens = class_str.split()
    new_tokens = []
    
    # Pre-pass to see if 2xl variants exist for things
    existing_2xl = set([t for t in tokens if t.startswith('2xl:')])
    
    for token in tokens:
        # Ignore already processed or prefix tokens we don't scale
        if token.startswith('2xl:') or token.startswith('lg:') or token.startswith('md:') or token.startswith('sm:'):
            new_tokens.append(token)
            continue
        
        # Check static mappings
        if token in STATIC_MAPPINGS:
            # If a 2xl variant doesn't already exist, use the mapping
            mapped = STATIC_MAPPINGS[token]
            base_t, xl_t = mapped.split(' ')
            if xl_t in existing_2xl:
                # Just change the base
                new_tokens.append(base_t)
            else:
                new_tokens.append(mapped)
            continue
            
        # Check clamp
        if '[clamp(' in token:
            # Match prefix-[clamp(...)]
            m = re.match(r'^([a-zA-Z0-9_-]+-)\[clamp\(([^)]+)\)\]$', token)
            if m:
                prefix = m.group(1)
                inner = m.group(2)
                # Check if 2xl:prefix-[clamp(...)] exists
                has_2xl = any(t.startswith(f"2xl:{prefix}") for t in existing_2xl)
                
                # Scale the inner
                def scale_num(num_match):
                    num = float(num_match.group(1))
                    unit = num_match.group(2)
                    scaled = round(num * 0.8, 3)
                    return f"{scaled:g}{unit}"
                scaled_inner = re.sub(r'([0-9.]+)([a-zA-Z%]+)', scale_num, inner)
                
                if has_2xl:
                    new_tokens.append(f"{prefix}[clamp({scaled_inner})]")
                else:
                    new_tokens.append(f"{prefix}[clamp({scaled_inner})] 2xl:{token}")
                continue
        
        # Check fixed px values like w-[200px]
        m = re.match(r'^([a-zA-Z0-9_-]+-)\[([0-9.]+)px\]$', token)
        if m:
            prefix = m.group(1)
            val = float(m.group(2))
            scaled = round(val * 0.8, 1)
            has_2xl = any(t.startswith(f"2xl:{prefix}") for t in existing_2xl)
            if has_2xl:
                new_tokens.append(f"{prefix}[{scaled:g}px]")
            else:
                new_tokens.append(f"{prefix}[{scaled:g}px] 2xl:{token}")
            continue

        new_tokens.append(token)
        
    return " ".join(new_tokens)

new_lines = []
for i, line in enumerate(lines):
    # Only process main content
    if 150 <= i <= 521:
        # Find className="..."
        def repl(m):
            class_str = m.group(1)
            new_class_str = process_class_str(class_str)
            return f'className="{new_class_str}"'
        line = re.sub(r'className="([^"]+)"', repl, line)
    new_lines.append(line)

with open("app/behandlinger/page.tsx", "w") as f:
    f.writelines(new_lines)

print("Done")

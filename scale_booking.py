import re

with open("components/ui/booking-modal.tsx", "r") as f:
    lines = f.readlines()

STATIC_MAPPINGS = {
    "max-w-5xl": "max-w-4xl 2xl:max-w-5xl",
    "p-3": "p-2 2xl:p-3",
    "md:p-4": "md:p-3 2xl:p-4",
    "px-8": "px-6 2xl:px-8",
    "mt-8": "mt-6 2xl:mt-8",
    "mb-8": "mb-6 2xl:mb-8",
    "w-12": "w-10 2xl:w-12"
}

def process_class_str(class_str):
    tokens = class_str.split()
    new_tokens = []
    
    existing_2xl = set([t for t in tokens if t.startswith('2xl:')])
    
    for token in tokens:
        if token.startswith('2xl:') or token.startswith('lg:') or token.startswith('sm:'):
            new_tokens.append(token)
            continue
            
        # Exception for md: prefix, we scale it
        if token.startswith('md:w-') or token.startswith('md:h-') or token == 'md:mt-0' or token == 'md:flex-row':
            new_tokens.append(token)
            continue
        
        # Check static mappings
        if token in STATIC_MAPPINGS:
            mapped = STATIC_MAPPINGS[token]
            base_t, xl_t = mapped.split(' ')
            if xl_t in existing_2xl:
                new_tokens.append(base_t)
            else:
                new_tokens.append(mapped)
            continue
            
        # Check clamp
        if '[clamp(' in token:
            m = re.match(r'^([a-zA-Z0-9_-]+-)\[clamp\(([^)]+)\)\]$', token)
            if m:
                prefix = m.group(1)
                inner = m.group(2)
                has_2xl = any(t.startswith(f"2xl:{prefix}") for t in existing_2xl)
                
                def scale_num(num_match):
                    num = float(num_match.group(1))
                    unit = num_match.group(2)
                    scaled = round(num * 0.85, 3)
                    return f"{scaled:g}{unit}"
                scaled_inner = re.sub(r'([0-9.]+)([a-zA-Z%]+)', scale_num, inner)
                
                if has_2xl:
                    new_tokens.append(f"{prefix}[clamp({scaled_inner})]")
                else:
                    new_tokens.append(f"{prefix}[clamp({scaled_inner})] 2xl:{token}")
                continue
        
        # Check fixed px values
        m = re.match(r'^([a-zA-Z0-9_-]+-)\[([0-9.]+)px\]$', token)
        if m:
            prefix = m.group(1)
            val = float(m.group(2))
            scaled = round(val * 0.85, 1)
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
    if 32 <= i <= 165:
        def repl(m):
            class_str = m.group(1)
            new_class_str = process_class_str(class_str)
            return f'className="{new_class_str}"'
        line = re.sub(r'className="([^"]+)"', repl, line)
    new_lines.append(line)

with open("components/ui/booking-modal.tsx", "w") as f:
    f.writelines(new_lines)

print("Done")

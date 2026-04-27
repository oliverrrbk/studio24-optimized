import re

with open("/Users/oliverrrbk/Downloads/studio24 new/app/behandlinger/page.tsx", "r") as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if 150 <= i <= 521:
        def sub_func(m):
            full_match = m.group(0)
            if '2xl:' in full_match or 'lg:' in full_match or 'md:' in full_match or 'sm:' in full_match:
                return full_match
            
            clamp_inner = m.group(1)
            def num_replacer(num_m):
                val = float(num_m.group(1))
                new_val = round(val * 0.85, 2)
                new_val_str = f"{new_val:g}"
                return new_val_str + num_m.group(2)
            
            new_clamp_inner = re.sub(r'([0-9.]+)([a-zA-Z%]+)', num_replacer, clamp_inner)
            return full_match.replace(clamp_inner, new_clamp_inner)
            
        line = re.sub(r'\S+\[clamp\(([^)]+)\)\]', sub_func, line)
    
    new_lines.append(line)

with open("app/behandlinger/page.tsx", "w") as f:
    f.writelines(new_lines)

for i in [157, 160, 166, 174, 188]:
    print("OLD:", lines[i].strip())
    print("NEW:", new_lines[i].strip())
    print("---")

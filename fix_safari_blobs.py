import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # We want to find divs with background colors and blur, and replace them.
    # Example: <div style={hardwareAccelerated} className="absolute inset-0 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-[_#EAD5C5_]/40 blur-[80px] animate-[spin_15s_linear_infinite]"></div>
    # or without style={hardwareAccelerated}
    
    # Regex to capture:
    # 1: style (if any)
    # 2: pre-classes
    # 3: bg hex (e.g. _#EAD5C5_ or #EAD5C5)
    # 4: bg opacity (e.g. 40)
    # 5: blur (e.g. blur-[80px])
    # 6: post-classes
    
    pattern = re.compile(r'<div\s+(?:style=\{([^}]+)\}\s+)?className="([^"]*)bg-\[?_?(#[A-Fa-f0-9]+)_?\]?/(\d+)\s+blur-\[\d+px\]([^"]*)"\s*>\s*</div>')
    
    def replacer(match):
        style_prop = match.group(1)
        pre_classes = match.group(2)
        bg_hex = match.group(3)
        bg_opacity = match.group(4)
        post_classes = match.group(5)
        
        # Build the new class string
        new_classes = f"{pre_classes} opacity-{bg_opacity} {post_classes}".strip()
        new_classes = re.sub(r'\s+', ' ', new_classes) # clean up spaces
        
        # Build the style object
        if style_prop:
            if style_prop == "hardwareAccelerated":
                new_style = f"{{...hardwareAccelerated, background: 'radial-gradient(circle at center, {bg_hex} 0%, transparent 70%)'}}"
            else:
                new_style = f"{{{style_prop}, background: 'radial-gradient(circle at center, {bg_hex} 0%, transparent 70%)'}}"
        else:
            new_style = f"{{ background: 'radial-gradient(circle at center, {bg_hex} 0%, transparent 70%)' }}"
            
        return f'<div style={new_style} className="{new_classes}"></div>'
        
    new_content = pattern.sub(replacer, content)
    
    # Also handle bg-gradient with blur
    # e.g. bg-gradient-to-br from-white/40 via-[#EAD5C5]/15 to-white/30 backdrop-blur-[3px] -> this is backdrop blur, leave it.
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('app'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

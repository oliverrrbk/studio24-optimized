import os
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Fix: style={...hardwareAccelerated, background: '...'}
    # Needs to be: style={{...hardwareAccelerated, background: '...'}}
    
    # regex to find style={...hardwareAccelerated, background: '...'}
    content = re.sub(r'style=\{\.\.\.hardwareAccelerated, background: \'([^\']+)\'\}', 
                     r"style={{...hardwareAccelerated, background: '\1'}}", content)
                     
    # regex to find style={background: '...'}
    content = re.sub(r'style=\{background: \'([^\']+)\'\}', 
                     r"style={{background: '\1'}}", content)

    with open(filepath, 'w') as f:
        f.write(content)

for root, _, files in os.walk('app'):
    for file in files:
        if file.endswith('.tsx'):
            fix_file(os.path.join(root, file))

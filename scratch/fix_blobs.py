import os
import re

directories = ['app', 'components']
pattern = re.compile(r'(<\s*div\s+)(className="[^"]*blur-[^"]*animate-\[spin_[^"]*"\s*>\s*</\s*div\s*>)')

for root_dir in directories:
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.tsx'):
                filepath = os.path.join(dirpath, filename)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                # Replace if missing style={hardwareAccelerated}
                modified = False
                def replacer(match):
                    return match.group(1) + 'style={hardwareAccelerated} ' + match.group(2)
                
                # Only replace if the div doesn't already have style
                # Actually, let's just find lines with 'blur-' and 'animate-[spin_' and '</div>' 
                # that don't have 'hardwareAccelerated'
                
                lines = content.split('\n')
                new_lines = []
                for line in lines:
                    if 'blur-[' in line and 'animate-[spin_' in line and '<div' in line and '</div>' in line:
                        if 'hardwareAccelerated' not in line:
                            line = line.replace('<div className', '<div style={hardwareAccelerated} className')
                            modified = True
                    new_lines.append(line)
                
                if modified:
                    new_content = '\n'.join(new_lines)
                    if 'hardwareAccelerated' not in content:
                        # Add import after the last import
                        import_stmt = 'import { hardwareAccelerated } from "@/lib/utils";\n'
                        # Find last import
                        lines2 = new_content.split('\n')
                        last_import_idx = 0
                        for i, l in enumerate(lines2):
                            if l.startswith('import '):
                                last_import_idx = i
                        lines2.insert(last_import_idx + 1, import_stmt)
                        new_content = '\n'.join(lines2)
                        
                    with open(filepath, 'w') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")

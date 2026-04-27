import os
import re

directories = ["app", "components"]

pattern = re.compile(r'margin:\s*"-25%"')

count = 0
for d in directories:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content, num_subs = pattern.subn('margin: "-20%"', content)
                
                if num_subs > 0:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {path}: replaced {num_subs} occurrences")
                    count += num_subs

print(f"Total replacements: {count}")

import os

replacements = {
    '#D5A790': '#D8AD97',
    '#d5a790': '#d8ad97',
    '213,167,144': '216,173,151',
    '213, 167, 144': '216, 173, 151',
    '#CA9072': '#CD977A',
    '#ca9072': '#cd977a'
}

for root, _, files in os.walk('./components'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.css'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
                
            if new_content != content:
                with open(path, 'w') as f:
                    f.write(new_content)
                print(f"Updated {path}")


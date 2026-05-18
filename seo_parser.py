import os
import re

files = [
    "components/pages/home-page.tsx",
    "components/pages/behandlinger-page.tsx",
    "components/pages/min-historie-page.tsx",
    "components/pages/galleri-page.tsx",
]

for f in files:
    if not os.path.exists(f):
        print(f"{f} not found")
        continue
    with open(f, 'r') as file:
        content = file.read()
        
    # Find h1
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
    h1s = [re.sub(r'<[^>]+>', '', h1).strip() for h1 in h1s]
    
    # Remove imports, exports, and basic tsx structure roughly
    # Just remove all <...> tags
    text_only = re.sub(r'<[^>]+>', ' ', content)
    # Remove javascript keywords / punctuation (very roughly)
    text_only = re.sub(r'[\{\}\(\)\[\];:"=]', ' ', text_only)
    text_only = re.sub(r'\b(import|export|const|let|var|function|return|className|div|span|p|h1|h2|h3|h4|h5|h6|section|main|article|aside|nav|header|footer|path|svg|xmlns|viewBox|fill|stroke)\b', '', text_only)
    
    words = text_only.split()
    print(f"--- {f} ---")
    print(f"H1s: {h1s}")
    print(f"Word count approx: {len(words)}")


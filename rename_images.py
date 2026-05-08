import os
import re

def main():
    folder = "public/new_gallery"
    files = [f for f in os.listdir(folder) if f.startswith('grid') and f.endswith('.png')]
    
    # Sort logically
    def sort_key(f):
        nums = re.findall(r'\d+', f)
        return [int(n) for n in nums]
        
    files.sort(key=sort_key)
    
    mapping = {}
    for i, old_name in enumerate(files, start=1):
        new_name = f"{i}.png"
        old_path = os.path.join(folder, old_name)
        new_path = os.path.join(folder, new_name)
        os.rename(old_path, new_path)
        mapping[old_name] = new_name
        print(f"{old_name} -> {new_name}")

if __name__ == '__main__':
    main()

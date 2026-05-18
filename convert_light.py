import re

with open("studio24-seo-report.html", "r") as f:
    content = f.read()

# Replace root variables
old_root = """  :root {
    --bg-main: #0A0A0A;
    --bg-card: #111111;
    --border: rgba(255, 255, 255, 0.08);
    --border-hover: rgba(255, 255, 255, 0.15);
    
    --text: #F3F4F6;
    --text-secondary: #9CA3AF;
    --text-muted: #6B7280;"""

new_root = """  :root {
    --bg-main: #F9FAFB;
    --bg-card: #FFFFFF;
    --border: rgba(0, 0, 0, 0.1);
    --border-hover: rgba(0, 0, 0, 0.2);
    
    --text: #111827;
    --text-secondary: #4B5563;
    --text-muted: #6B7280;"""

content = content.replace(old_root, new_root)

# Replace whites
content = content.replace("rgba(255,255,255,", "rgba(0,0,0,")
content = content.replace("rgba(255, 255, 255,", "rgba(0, 0, 0,")
content = content.replace("color: #fff;", "color: #111;")
content = content.replace("background: linear-gradient(to right, #fff, #a5a5a5);", "background: linear-gradient(to right, #111, #555);")
content = content.replace("background: rgba(10, 10, 10, 0.8);", "background: rgba(255, 255, 255, 0.8);")

with open("studio24-seo-report.html", "w") as f:
    f.write(content)

print("Done")

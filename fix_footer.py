import os

footer_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\layout\Footer.tsx"
with open(footer_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if '<div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 max-w-2xl mx-auto text-left space-y-1">' in line:
        skip = True
        continue
    
    if skip and '</div>' in line:
        skip = False
        continue
    
    if skip:
        continue
        
    new_lines.append(line)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Done footer")

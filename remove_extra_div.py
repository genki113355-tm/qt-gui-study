import os

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if i == 485 and '</div>' in line:
        continue # delete this line (0-indexed, so line 486)
    new_lines.append(line)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Removed extra div")

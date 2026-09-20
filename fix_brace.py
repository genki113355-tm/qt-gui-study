dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if i == 590 or i == 591: # 0-indexed for 591 and 592
        continue
    new_lines.append(line)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

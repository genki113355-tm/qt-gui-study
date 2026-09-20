import os

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if 'const isMiddleSection' in line:
        continue
    if '{(viewMode === \'all\' || viewMode === \'practice\') && CODING_CHALLENGES[chapter.slug] && (' in line:
        skip = True
        continue
    
    if skip and '</section>' in line:
        skip = False
        continue
    if skip:
        continue
        
    new_lines.append(line)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

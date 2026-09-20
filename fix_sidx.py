dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('chapter.sections.map((section, sIdx) => {', 'chapter.sections.map((section, _sIdx) => {')

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

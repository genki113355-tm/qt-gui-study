import os

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\TopPageView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('シロクマ<br/>Qt×C++ラボ', 'シロクマ Qt×C++ラボ')
content = content.replace('次世代の産業用GUI・計器を<br />「Qt」で創り出そう。', '次世代の産業用GUI・計器を「Qt」で創り出そう。')

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

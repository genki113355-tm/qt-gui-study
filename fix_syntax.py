import os
import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# isMiddleSectionの空ブロックを消す
content = re.sub(r'\{isMiddleSection && viewMode === \'all\' && \([\s]*\)\}', '', content)

# CodeChallengeRunner のブロックを消す
content = re.sub(r'\{\(viewMode === \'all\' \|\| viewMode === \'practice\'\) && CODING_CHALLENGES\[chapter\.slug\] && \([\s\S]*?</section>\n\s*\}\)', '', content)

# ファイル末尾近くにある可能性のある { ... } の中身がないやつなどを消す
content = re.sub(r'\{CODING_CHALLENGES[^}]*\}\)', '', content)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

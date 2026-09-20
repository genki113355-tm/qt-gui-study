import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# GameEmulatorを削除 (複数行に対応)
content = re.sub(r'<GameEmulator[\s\S]*?/>', '', content)

# 不要なisMiddleSection の変数を消すか、使用されていない変数のエラーを無視するようにする
content = content.replace('const isMiddleSection = index === Math.floor(chapter.sections.length / 2);', '')

# CodeChallengeRunner のimportを消す
content = re.sub(r'import \{ CodeChallengeRunner \} from \'\.\./playground/CodeChallengeRunner\';', '', content)
content = re.sub(r'import \{ CODING_CHALLENGES \} from \'\.\./\.\./data/codingChallenges\';', '', content)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

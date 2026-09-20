import os
import re

src_path = r"C:\Users\ziu12\Documents\cpp-study\src\components\curriculum\ChapterView.tsx"
dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

if not os.path.exists(src_path):
    print("Source not found")
else:
    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # GameEmulatorのインポートを削除
    content = re.sub(r'const GameEmulator = React\.lazy\(\(\) =>[\s\S]*?import\(\'\.\./emulator/GameEmulator\'\)\.then\(\(m\) => \(\{ default: m\.GameEmulator \}\)\)\n\);', '', content)
    
    # AffiliatePromoBannerのインポートを削除
    content = re.sub(r'import \{ AffiliatePromoBanner \} from \'\.\./affiliate/AffiliatePromoBanner\';', '', content)

    # JSXブロック内の GameEmulator 呼び出しを削除 (複数行の可能性あり)
    content = re.sub(r'<GameEmulator[^>]*/>', '', content)
    # 閉じタグがある場合
    content = re.sub(r'<GameEmulator[\s\S]*?</GameEmulator>', '', content)
    
    # JSXブロック内の AffiliatePromoBanner 呼び出しを削除
    content = re.sub(r'<AffiliatePromoBanner[^>]*/>', '', content)
    
    # CODING_CHALLENGES 関連のセクション削除
    content = re.sub(r'\{\(viewMode === \'all\' \|\| viewMode === \'practice\'\) && CODING_CHALLENGES\[chapter\.slug\] && \([\s\S]*?</section>\n\s*\}\)', '', content)

    with open(dst_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("ChapterView restored and cleaned")

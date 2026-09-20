import os
import re

src_path = r"C:\Users\ziu12\Documents\cpp-study\src\components\layout\Footer.tsx"
dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\layout\Footer.tsx"

with open(src_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace texts
content = re.sub(r'〜ゲーム開発で学ぶオブジェクト指向開発 レガシー設計からモダン設計まで〜', r'〜Linuxで動くリアルタイム計器・GUI開発〜', content, flags=re.MULTILINE)
content = re.sub(r'現場で求められるメモリ管理・ポインタ安全性・RAIIモダン設計の知見を、直感的なゲーム教材として体系化。主要3大コンパイラ（GCC 13\+ / Clang 17\+ / MSVC 2022, C\+\+11〜C\+\+20準拠）にて動作検証済みです。', r'Linux環境でのHMI・計器ソフトウェア開発のノウハウを体系化。Qt/QML/C++によるマルチスレッドとリアルタイム描画の実践知識を提供します。', content, flags=re.MULTILINE)

# Remove the disclaimer block completely using regex (match everything up to the end of the block)
# ⚖️ は \u2696
# <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 max-w-2xl mx-auto text-left space-y-1"> から </div> の連続を含む全体の削除
# このブロックの後には <div className="mt-12 mb-4"> があるはず
pattern = r'<div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 max-w-2xl mx-auto text-left space-y-1">[\s\S]*?(?=<div className="mt-12 mb-4">)'
content = re.sub(pattern, '', content)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored and fixed footer")

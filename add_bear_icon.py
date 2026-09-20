import os
import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 検索対象
old_block = """            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-4 my-6">
              <h3 className="text-base sm:text-lg font-mono font-bold text-cyan-400 flex items-center gap-2.5">
                <Lightbulb className="w-5 h-5" />
                <span>シロクマ先生の重要ポイントまとめ</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">"""

# 置換後のブロック
new_block = """            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-4 my-6 flex flex-col sm:flex-row gap-6 items-start">
              <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-cyan-400/80 shadow-cyan-900/60 ring-2 ring-cyan-500/20"
                     style={{ backgroundImage: 'url("/images/characters_mission.jpg")', backgroundSize: '330%', backgroundPosition: '20% 32%', backgroundRepeat: 'no-repeat' }}>
                </div>
              </div>
              <div className="flex-1 space-y-4 w-full">
                <h3 className="text-base sm:text-lg font-mono font-bold text-cyan-400 flex items-center gap-2.5">
                  <Lightbulb className="w-5 h-5" />
                  <span>シロクマ先生の重要ポイントまとめ</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">"""

if old_block in content:
    content = content.replace(old_block, new_block)
else:
    print("Could not find the target block.")

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced successfully.")

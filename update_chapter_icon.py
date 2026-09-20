import os
import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_bear = """<div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-cyan-400/80 shadow-cyan-900/60 ring-2 ring-cyan-500/20"
                     style={{ backgroundImage: 'url("/images/characters_mission.jpg")', backgroundSize: '330%', backgroundPosition: '20% 32%', backgroundRepeat: 'no-repeat' }}>
                </div>"""
new_bear = """<div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-cyan-400/80 shadow-cyan-900/60 ring-2 ring-cyan-500/20 bg-[#0a0f18]">
                  <img src="/images/polar-bear-guide.png" alt="シロクマ先生" className="w-full h-full object-cover scale-110" />
                </div>"""
content = content.replace(old_bear, new_bear)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ChapterView.tsx")

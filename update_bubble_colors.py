import os
import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\TopPageView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# ペンギンくんの吹き出し背景としっぽの色を修正
# 現在: bg-[#0f1522]
# 新: bg-slate-900 (hex: #0f172a)
content = content.replace(
    'relative flex-1 bg-[#0f1522] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl',
    'relative flex-1 bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-lg shadow-amber-900/10'
)
# ペンギンしっぽの内側の色
content = content.replace(
    'border-l-[#0f1522]',
    'border-l-[#0f172a]'
)
# ペンギンしっぽの外側（枠線）の太さと色
content = content.replace(
    'border-l-amber-500/30',
    'border-l-amber-500/40'
)


# シロクマ先生の吹き出し背景としっぽの色を修正
content = content.replace(
    'relative flex-1 bg-[#0f1522] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl mt-4',
    'relative flex-1 bg-slate-900 border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-lg shadow-cyan-900/10 mt-4'
)
# シロクマしっぽの内側の色
content = content.replace(
    'border-r-[#0f1522]',
    'border-r-[#0f172a]'
)
# シロクマしっぽの外側（枠線）の太さと色
content = content.replace(
    'border-r-cyan-500/30',
    'border-r-cyan-500/40'
)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated bubble colors")

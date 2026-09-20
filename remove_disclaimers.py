import os
import re

# --- Footer.tsx ---
footer_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\layout\Footer.tsx"
with open(footer_path, 'r', encoding='utf-8') as f:
    footer_content = f.read()

# ⚖️ 商標および... のセクションを探して消す
footer_content = re.sub(r'<div className="mt-8 text-\[11px\] text-slate-500 space-y-2 border-t border-slate-800/50 pt-4 pb-2">[\s\S]*?</div>', '', footer_content)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(footer_content)

# --- PrivacyPolicyModal.tsx ---
privacy_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\layout\PrivacyPolicyModal.tsx"
with open(privacy_path, 'r', encoding='utf-8') as f:
    privacy_content = f.read()

# 商標および学習用教材に関する免責事項 のセクションを消す
privacy_content = re.sub(r'<section>\s*<h3 className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2">\s*<span className="text-cyan-500">◆</span> 商標および学習用教材に関する免責事項\s*</h3>[\s\S]*?</section>', '', privacy_content)

with open(privacy_path, 'w', encoding='utf-8') as f:
    f.write(privacy_content)

print("Done")

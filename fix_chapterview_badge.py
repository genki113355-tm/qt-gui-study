import os
import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace getTrackBadge logic
new_badge = """
  const getTrackBadge = () => {
    return (
      <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border flex items-center gap-2 shadow-sm bg-cyan-950/80 text-cyan-300 border-cyan-500/40">
        <span className="w-2.5 h-2.5 rounded-full animate-ping inline-block bg-cyan-400" />
        {chapter.badge || 'Qt / C++'}
      </span>
    );
  };
"""
content = re.sub(r'const getTrackBadge = \(\) => \{[\s\S]*?^  \};', new_badge.strip('\n'), content, flags=re.MULTILINE)

# Replace getBorderColor logic
new_border = """
  const getBorderColor = () => {
    return 'border-cyan-500/30';
  };
"""
content = re.sub(r'const getBorderColor = \(\) => \{[\s\S]*?^  \};', new_border.strip('\n'), content, flags=re.MULTILINE)

# Replace getGlowColor logic
new_glow = """
  const getGlowColor = () => {
    return 'bg-cyan-500/10';
  };
"""
content = re.sub(r'const getGlowColor = \(\) => \{[\s\S]*?^  \};', new_glow.strip('\n'), content, flags=re.MULTILINE)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

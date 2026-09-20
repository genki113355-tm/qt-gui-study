import os
import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\layout\Sidebar.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add TOP link to Sidebar
top_link = """
          <div className="px-4 mb-2 mt-2">
            <button
              onClick={() => {
                onSelectChapter('top');
                onClose();
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-3 ${
                currentChapterSlug === 'top'
                  ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              サイトTOPへ戻る
            </button>
          </div>
          <div className="px-4 mb-4 mt-2">
"""

# Replace the beginning of the curriculum list with the new top link
content = content.replace('<div className="px-4 mb-4">', top_link)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

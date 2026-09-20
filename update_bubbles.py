import os
import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\TopPageView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# ペンギンくんのセクションを置換
old_penguin_pattern = r'<div className="flex items-start gap-4 my-4 flex-row-reverse">[\s\S]*?<div className="mt-4 pt-4 border-t border-amber-500/20 text-sm flex items-center gap-2.5 font-sans text-amber-300/90 bg-amber-950/20 px-4 py-2.5 rounded-xl">[\s\S]*?</div>\s*</div>\s*</div>'

new_penguin = """<div className="flex items-start gap-6 my-8 flex-row-reverse max-w-5xl mx-auto">
          {/* キャラクターアイコン（ペンギン） */}
          <div className="flex flex-col items-center flex-shrink-0 mt-2">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.15)] bg-[#040810]">
              <img src="/images/penguin-guide.jpg" alt="ペンギンくん" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold mt-3 px-3 py-1 rounded-full bg-amber-950/40 text-amber-400 border border-amber-500/20">
              ペンギンくん
            </span>
          </div>

          {/* 吹き出し（右しっぽ） */}
          <div className="relative flex-1 bg-[#0f1522] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* CSS Border によるしっぽ */}
            <div className="absolute top-10 -right-[13px] w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[13px] border-l-amber-500/30"></div>
            <div className="absolute top-[41px] -right-[11px] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-[#0f1522]"></div>
            
            <p className="text-lg lg:text-[19px] leading-relaxed tracking-normal whitespace-pre-line font-sans text-slate-200">
              Qtの公式ドキュメントを読んでいるんですが、C++で書くバックエンドとQMLの画面をどう繋げればいいか、マルチスレッドにするとGUIがフリーズしてしまって...Linuxの組み込みGUI開発ってこんなに難しいんですか！？
            </p>
            <div className="mt-5 pt-4 border-t border-amber-500/20 text-sm flex items-center gap-2.5 font-sans text-amber-300/90 bg-amber-950/20 px-4 py-3 rounded-xl">
              <span className="text-lg">🐧</span>
              <span className="italic">C++のポインタは分かったのに、イベントループとシグナルの概念でまた頭がパンクしそう...</span>
            </div>
          </div>
        </div>"""

content = re.sub(old_penguin_pattern, new_penguin, content)


# シロクマ先生のセクションを置換
old_bear_pattern = r'<div className="flex items-start gap-4 my-4 flex-row">[\s\S]*?<div className="mt-4 pt-4 border-t border-slate-800">\s*<button[\s\S]*?</button>\s*</div>\s*</div>\s*</div>'

new_bear = """<div className="flex items-start gap-6 my-8 max-w-5xl mx-auto">
          {/* キャラクターアイコン（シロクマ） */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 relative">
              <img src="/images/polar-bear-guide-pointing.png" alt="シロクマ先生" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
            </div>
            <span className="text-xs font-bold mt-2 px-3 py-1 rounded-full bg-cyan-950/40 text-cyan-400 border border-cyan-500/20">
              シロクマ先生
            </span>
          </div>

          {/* 吹き出し（左しっぽ） */}
          <div className="relative flex-1 bg-[#0f1522] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl mt-4">
            {/* CSS Border によるしっぽ */}
            <div className="absolute top-10 -left-[13px] w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[13px] border-r-cyan-500/30"></div>
            <div className="absolute top-[41px] -left-[11px] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[12px] border-r-[#0f1522]"></div>
            
            <p className="text-lg lg:text-[19px] leading-relaxed tracking-normal whitespace-pre-line font-sans text-slate-200">
              大丈夫、落ち着いて！Qtの最大の武器は「シグナル＆スロット」による美しい疎結合アーキテクチャだよ。
              C++のデータ構造とGUIの描画を完全に分離し、まるで魔法のように連携できるんだ。<br/><br/>
              当Linux環境で動く<strong>「ダッシュボード」</strong>を作りながら、プロのQt設計の極意を一緒に学んでいこう！
            </p>
            
            <div className="mt-5 pt-4 border-t border-slate-800">
              <button
                onClick={() => onSelectChapter('gui-framework-comparison')}
                className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 px-4 py-2.5 rounded-lg transition-colors border border-cyan-500/20 hover:border-cyan-500/40"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                【付録】代表的なGUIフレームワーク徹底比較を読む →
              </button>
            </div>
          </div>
        </div>"""

content = re.sub(old_bear_pattern, new_bear, content)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated chat bubbles")

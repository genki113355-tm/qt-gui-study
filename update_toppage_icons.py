import os
import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\TopPageView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 会話部分のペンギンアイコン置換
old_penguin = """<div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-amber-400 shadow-amber-900/60 ring-2 ring-amber-500/20"
                 style={{ backgroundImage: 'url("/images/characters_mission.jpg")', backgroundSize: '370%', backgroundPosition: '86% 54%', backgroundRepeat: 'no-repeat' }}>
            </div>"""
new_penguin = """<div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-amber-400 shadow-amber-900/60 ring-2 ring-amber-500/20 bg-[#0a0f18]">
              <img src="/images/penguin-guide.jpg" alt="ペンギンくん" className="w-full h-full object-cover" />
            </div>"""
content = content.replace(old_penguin, new_penguin)

# 会話部分のシロクマ先生アイコン置換
old_bear = """<div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-cyan-400 shadow-cyan-900/60 ring-2 ring-cyan-500/20"
                 style={{ backgroundImage: 'url("/images/characters_mission.jpg")', backgroundSize: '330%', backgroundPosition: '20% 32%', backgroundRepeat: 'no-repeat' }}>
            </div>"""
new_bear = """<div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-cyan-400 shadow-cyan-900/60 ring-2 ring-cyan-500/20 bg-[#0a0f18]">
              <img src="/images/polar-bear-guide.png" alt="シロクマ先生" className="w-full h-full object-cover" />
            </div>"""
content = content.replace(old_bear, new_bear)

# CHARACTERセクションの追加（「このサイトについて」セクションの後、「カリキュラム一覧」の前に挿入）
character_section = """
      {/* キャラクター紹介 */}
      <section className="mt-20">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-bold font-sans text-cyan-400">CHARACTER</h2>
          <p className="text-sm text-slate-400 font-sans">ラボの登場人物</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* シロクマ先生 */}
          <div className="bg-[#0a0f18] border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-cyan-500/30 overflow-hidden bg-[#040810] mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <img src="/images/polar-bear-guide.png" alt="シロクマ先生" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">シロクマ先生 (Sensei)</h3>
            <p className="text-sm font-bold text-slate-200 mb-4">「自動化への投資は、自分自身の時間をハックすることなんだよ」</p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              2頭身の愛らしいシロクマ。見た目とは裏腹に、低レイヤ技術、数理アルゴリズム、Linuxインフラ、C++の堅牢な設計に深い造詣を持つ指導教官。
            </p>
          </div>

          {/* ペンギンくん */}
          <div className="bg-[#0a0f18] border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg relative overflow-hidden group hover:border-amber-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-amber-500/30 overflow-hidden bg-[#040810] mb-6 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
              <img src="/images/penguin-guide.jpg" alt="ペンギンくん" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-amber-400 mb-2">ペンギンくん (Penguin)</h3>
            <p className="text-sm font-bold text-slate-200 mb-4">「今日も手作業で定時が過ぎたっス！もっと楽してぇ〜！」</p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              実務でC++のビルドや非効率なレガシーコードに日々追われている若手エンジニア。過酷な現場で苦しむ読者の代弁者。
            </p>
          </div>
        </div>
      </section>
"""

# 挿入場所を探す（<h2 className="text-3xl font-bold font-sans text-white">カリキュラム一覧</h2> の親divの直前）
insert_idx = content.find('<div className="flex items-center gap-3 mb-10">')
if insert_idx != -1:
    content = content[:insert_idx] + character_section + "\n        " + content[insert_idx:]

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated TopPageView.tsx")

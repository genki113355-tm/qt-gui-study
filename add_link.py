import os

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\TopPageView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

target_str = "本サイトは、C++のロジックと美しい画面を分離する「シグナル＆スロット」等の基礎から始まり、最終的にマルチスレッドを活用した高速リアルタイムダッシュボードを自力で構築できるようになることを目的とした実践的チュートリアルです。\n              </p>"

button_html = """              </p>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => onSelectChapter('gui-framework-comparison')}
                  className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 px-4 py-2 rounded-lg transition-colors border border-cyan-500/20 hover:border-cyan-500/40"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  【付録】代表的なGUIフレームワーク徹底比較を読む →
                </button>
              </div>"""

content = content.replace(target_str, target_str.replace("</p>", button_html))

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

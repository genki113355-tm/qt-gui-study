import os

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\TopPageView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_section = """
      {/* Introduction / Overview Section */}
      <section className="mt-20">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-bold font-sans text-white">このサイトについて</h2>
          <p className="text-lg text-slate-400 font-sans">対象読者や学ぶ内容、前提となる環境についてのご案内</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-[#0a0f18] p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">01.</span> Qt（キュート）とは？
            </h3>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                自動車のメーターパネル（デジタルコックピット）、工場のFA機器、医療モニターなど、「絶対にフリーズしてはいけない」「コンマ1秒の遅れが許されない」ミッションクリティカルな現場で採用されているC++ベースの業界標準GUIフレームワークです。
              </p>
              <p>
                本サイトは、C++のロジックと美しい画面を分離する「シグナル＆スロット」等の基礎から始まり、最終的にマルチスレッドを活用した高速リアルタイムダッシュボードを自力で構築できるようになることを目的とした実践的チュートリアルです。
              </p>
            </div>
          </div>

          <div className="bg-[#0a0f18] p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400">02.</span> 想定する対象者
            </h3>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <ul className="list-disc list-inside space-y-2">
                <li>C++の基礎（クラス、ポインタ等）を理解している方</li>
                <li>組み込み機器や産業用PCのHMI開発に興味がある方</li>
                <li>Webフロントエンド技術だけでなく、ネイティブGUIの圧倒的パフォーマンスを体験したい方</li>
              </ul>
              <p className="mt-4 p-3 bg-emerald-950/20 border border-emerald-900/50 rounded-lg text-emerald-400/90 text-xs">
                ※QtやCMakeに触れたことがなくても、第0章の環境構築から順を追って学ぶことができます。
              </p>
            </div>
          </div>

          <div className="bg-[#0a0f18] p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-amber-500/30 transition-colors md:col-span-2">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400">03.</span> 前提環境と自由度
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 text-sm leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-200 mb-2 border-b border-slate-800 pb-1">推奨・検証済み環境</h4>
                <ul className="space-y-1 text-slate-400 font-mono">
                  <li>・OS: <span className="text-slate-200">Linux (Ubuntu 22.04 LTS 等)</span></li>
                  <li>・Language: <span className="text-slate-200">C++17</span></li>
                  <li>・Build Tool: <span className="text-slate-200">CMake</span></li>
                  <li>・Library: <span className="text-slate-200">Qt 5.15+ (Qt 6 Compatible)</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-200 mb-2 border-b border-slate-800 pb-1">環境を完全に一致させる必要はありません</h4>
                <p className="text-slate-400">
                  Qt最大の強みは「クロスプラットフォーム」です。本サイトでは産業用途でシェアの高いLinuxを基準に解説していますが、<strong>WindowsのVisual Studio</strong>や<strong>macOSのXcode</strong>環境でもほぼ同じコードがそのまま動作します。<br/>
                  ご自身の得意なOSやエディタ環境に読み替えて進めていただいて構いません。
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
"""

new_lines = []
for i, line in enumerate(lines):
    new_lines.append(line)
    # カリキュラム一覧のセクション(mt-20)の直前に挿入する
    if '<h2 className="text-3xl font-bold font-sans text-white">カリキュラム一覧</h2>' in line.replace('\uFFFD', ''):
        # 実際には文字化けしているかもしれないので、svg の次の行を探す
        pass
    if '<div className="flex items-center gap-3 mb-10">' in line:
        new_lines.insert(len(new_lines)-1, new_section + "\n")

with open(dst_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

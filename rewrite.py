import sys

jsx_content = '''import React from 'react';

interface TopPageViewProps {
  onSelectChapter: (slug: string) => void;
  completedChapters: number[];
  onOpenPlaygroundModal?: () => void;
  onOpenMilestoneModal?: () => void;
}

export const TopPageView: React.FC<TopPageViewProps> = ({
  onSelectChapter,
  completedChapters,
}) => {
  const chapters = [
    'モダンQtとC++で作る、次世代の産業用GUI・HMI',
    'Linux（Ubuntu）におけるQt・CMake開発環境の構築',
    'Qtの根幹「シグナル＆スロット」とオブジェクト指向設計',
    'ロジック（C++）と画面（QML/Widgets）の美しい分離アーキテクチャ',
    'マルチスレッド設計：信号処理スレッドからGUIへの安全なデータ転送',
    'QCustomPlot / Qt Graphs を使った高速リアルタイム波形描画',
    'Linuxのソケット通信（UDP/TCP）をQtのイベントループでスマートに受ける',
    '大容量データのメモリ管理：Qtアプリでのスマートポインタの正しい使い方',
    'Qtアプリのテスト：Qt TestフレームワークとUIの自動テスト',
    'Linux環境でのパフォーマンス・プロファイリング（Hotspot / Valgrind）',
    '実機配備：LinuxでのQtアプリケーションのデプロイ（linuxdeployqt等）',
    '実践：リアルタイム・ソナー監視計器アプリを実装する'
  ];

  return (
    <div className=\"w-full max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-16\">
      <section className=\"relative rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 via-[#070b14] to-[#040810] p-6 sm:p-10 shadow-2xl overflow-hidden\">
        <div className=\"absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none\"></div>
        <div className=\"absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none\"></div>

        <div className=\"relative z-10 max-w-4xl space-y-5\">
          <div className=\"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold\">
            <span>Linux × C++ GUI開発 実践学習メディア</span>
          </div>
          <h1 className=\"text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans leading-tight\">
            🐻‍❄️ シロクマQt×C++ラボ
          </h1>
          <p className=\"text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 leading-snug\">
            リアルタイム波形描画からマルチスレッド設計まで。<br className=\"hidden sm:block\" />次世代の産業用GUIを「Qt」で創り出そう。
          </p>
          <div className=\"flex flex-wrap gap-2 pt-2 text-xs font-mono text-slate-300\">
            <span className=\"px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300\">全12章 構成</span>
          </div>
        </div>
      </section>

      <section className=\"max-w-4xl mx-auto space-y-6\">
        <div className=\"flex items-start gap-3 my-4 flex-row-reverse\">
          <div className=\"flex flex-col items-center\">
            <div className=\"relative inline-flex items-center justify-center flex-shrink-0 w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-amber-400 shadow-amber-900/60 ring-2 ring-amber-500/20\"
                 style={{ backgroundImage: 'url(\"/images/characters_mission.jpg\")', backgroundSize: '370%', backgroundPosition: '86% 54%', backgroundRepeat: 'no-repeat' }}>
            </div>
            <span className=\"text-xs font-semibold mt-1.5 px-2.5 py-0.5 rounded-full border whitespace-nowrap bg-amber-950/60 text-amber-300 border-amber-500/30 shadow\">
              ペンギンくん
            </span>
          </div>
          <div className=\"relative max-w-3xl rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md border bg-gradient-to-br from-[#16121f] to-[#0d0a14] text-slate-100 border-amber-500/40 rounded-tr-sm shadow-amber-950/20\">
            <p className=\"text-base sm:text-lg lg:text-[19px] leading-relaxed tracking-normal whitespace-pre-line font-sans font-normal text-slate-100\">
              Qtの公式ドキュメントを読んでいるんですが、C++で書くバックエンドとQMLの画面をどう繋げればいいか、マルチスレッドにするとGUIがフリーズしてしまって…Linuxの組み込みGUI開発ってこんなに難しいんですか！？
            </p>
          </div>
        </div>
        <div className=\"flex items-start gap-3 my-4 flex-row\">
          <div className=\"flex flex-col items-center\">
            <div className=\"relative inline-flex items-center justify-center flex-shrink-0 w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-cyan-400 shadow-cyan-900/60 ring-2 ring-cyan-500/20\"
                 style={{ backgroundImage: 'url(\"/images/characters_mission.jpg\")', backgroundSize: '330%', backgroundPosition: '20% 32%', backgroundRepeat: 'no-repeat' }}>
            </div>
            <span className=\"text-xs font-semibold mt-1.5 px-2.5 py-0.5 rounded-full border whitespace-nowrap bg-cyan-950/60 text-cyan-300 border-cyan-500/30 shadow\">
              シロクマ先生
            </span>
          </div>
          <div className=\"relative max-w-3xl rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md border bg-gradient-to-br from-[#0c1424] to-[#080d18] text-slate-100 border-cyan-500/40 rounded-tl-sm shadow-cyan-950/20\">
            <p className=\"text-base sm:text-lg lg:text-[19px] leading-relaxed tracking-normal whitespace-pre-line font-sans font-normal text-slate-100\">
              大丈夫、落ち着いて！Qtの最大の武器は「シグナル＆スロット」による美しい疎結合アーキテクチャだよ。<br />
              今回はLinux環境で動く<strong>リアルタイムソナー監視計器</strong>を作りながら、モダンなQt設計の極意を一緒に学んでいこう！
            </p>
          </div>
        </div>
      </section>

      <section className=\"mt-16\">
        <div className=\"text-center space-y-2 mb-8\">
          <h2 className=\"text-2xl font-bold font-sans text-white\">開発ターゲット：リアルタイムソナー計器</h2>
        </div>
        <div className=\"relative w-full max-w-5xl mx-auto rounded-3xl border border-emerald-500/30 bg-[#02050a] shadow-2xl overflow-hidden h-[400px] flex items-center justify-center\">
          <span className=\"text-emerald-500 font-mono\">[TACTICAL SONAR DISPLAY PLACEHOLDER]</span>
        </div>
      </section>

      <section className=\"mt-20\">
        <div className=\"flex items-center gap-3 mb-8\">
          <h2 className=\"text-2xl font-bold font-sans text-white\">カリキュラム一覧</h2>
        </div>
        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5\">
          {chapters.map((title, index) => (
            <div key={index} className=\"group relative block p-5 sm:p-6 bg-[#0c121e] rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-[#0f1725] transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:-translate-y-1 overflow-hidden cursor-pointer\" onClick={() => onSelectChapter(\chapter-\\)}>
              <div className=\"flex items-center gap-3 mb-3\">
                <span className=\"text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded\">CHAPTER {index + 1}</span>
              </div>
              <h3 className=\"text-slate-200 font-bold font-sans text-sm sm:text-base leading-snug group-hover:text-white transition-colors line-clamp-2\">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
'''
with open('src/components/curriculum/TopPageView.tsx', 'w', encoding='utf-8') as f:
    f.write(jsx_content)

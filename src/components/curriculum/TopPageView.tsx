import React from 'react';
import { CLASSIC_CHAPTERS } from '../../data/chapters';

interface TopPageViewProps {
  onSelectChapter: (slug: string) => void;
  completedChapters: number[];
  onOpenPlaygroundModal?: () => void;
  onOpenMilestoneModal?: () => void;
}

export const TopPageView: React.FC<TopPageViewProps> = ({
  onSelectChapter,
  // completedChapters,
}) => {
  return (
    <div className="w-full max-w-[90rem] mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-12 space-y-16">
      
      {/* ヒーローセクション */}
      <section className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 via-[#070b14] to-[#040810] p-8 sm:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-10 items-center">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold">
            <span>Linux × C++ GUI開発 実践学習メディア</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white font-sans leading-tight">
            🐻‍❄️ シロクマ Qt×C++ラボ
          </h1>

          <p className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 leading-snug">
            次世代の産業用GUI・計器を「Qt」で創り出そう。
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
            Linux環境で動くプロフェッショナルなHMI（Human Machine Interface）や計測器ソフトウェアをどうやって作るのか？
            C++のロジックと美しいUIを完全に分離する「シグナル＆スロット」、マルチスレッド下での安全なデータ転送、そしてリアルタイム描画ダッシュボードの実装までを体系的に学べる実践メディアです。
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-sm font-mono text-slate-300">
            <span className="px-4 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">全12章 構成</span>
            <span className="px-4 py-1.5 rounded-lg bg-slate-950/80 border border-cyan-500/30 text-cyan-300">🖥️ Qt / QML</span>
            <span className="px-4 py-1.5 rounded-lg bg-slate-950/80 border border-emerald-500/30 text-emerald-300">🐧 Linux (Ubuntu)</span>
          </div>
        </div>
        
        {/* 右側：ヒーロー用の装飾（レーダーチャート風） */}
        <div className="relative z-10 w-full lg:w-1/3 flex justify-center items-center opacity-80 mix-blend-screen hidden lg:flex">
           <svg viewBox="0 0 200 200" className="w-full max-w-[280px] drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
             {/* 放射状グリッド */}
             {[1,2,3,4].map(r => <circle key={r} cx="100" cy="100" r={r*22} fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1"/>)}
             {[0,60,120,180,240,300].map(deg => {
                const rad = deg * Math.PI / 180;
                return <line key={deg} x1="100" y1="100" x2={100 + Math.sin(rad)*88} y2={100 - Math.cos(rad)*88} stroke="rgba(34,211,238,0.2)" strokeWidth="1"/>
             })}
             {/* チャート本体 */}
             <polygon points="100,20 160,65 140,150 70,160 30,80" fill="rgba(34,211,238,0.2)" stroke="rgba(34,211,238,0.8)" strokeWidth="2"/>
             <polygon points="100,40 135,75 110,130 80,125 55,85" fill="rgba(16,185,129,0.3)" stroke="rgba(16,185,129,0.9)" strokeWidth="1.5"/>
             {/* ドット */}
             {[ [100,20], [160,65], [140,150], [70,160], [30,80] ].map((pt,i) => <circle key={`p${i}`} cx={pt[0]} cy={pt[1]} r="3" fill="#fff"/>)}
           </svg>
        </div>
      </section>

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
              <div className="mt-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => onSelectChapter('gui-framework-comparison')}
                  className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 px-4 py-2 rounded-lg transition-colors border border-cyan-500/20 hover:border-cyan-500/40"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  【付録】代表的なGUIフレームワーク徹底比較を読む →
                </button>
              </div>
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

      {/* 会話コンポーネント */}
      <section className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-start gap-6 my-8 flex-row-reverse max-w-5xl mx-auto">
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
          <div className="relative flex-1 bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-lg shadow-amber-900/10">
            {/* CSS Border によるしっぽ */}
            <div className="absolute top-10 -right-[13px] w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[13px] border-l-amber-500/40"></div>
            <div className="absolute top-[41px] -right-[11px] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-[#0f172a]"></div>
            
            <p className="text-lg lg:text-[19px] leading-relaxed tracking-normal whitespace-pre-line font-sans text-slate-200">
              Qtの公式ドキュメントを読んでいるんですが、C++で書くバックエンドとQMLの画面をどう繋げればいいか、マルチスレッドにするとGUIがフリーズしてしまって...Linuxの組み込みGUI開発ってこんなに難しいんですか！？
            </p>
            <div className="mt-5 pt-4 border-t border-amber-500/20 text-sm flex items-center gap-2.5 font-sans text-amber-300/90 bg-amber-950/20 px-4 py-3 rounded-xl">
              <span className="text-lg">🐧</span>
              <span className="italic">C++のポインタは分かったのに、イベントループとシグナルの概念でまた頭がパンクしそう...</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 my-4 flex-row">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-lg border-2 border-cyan-400 shadow-cyan-900/60 ring-2 ring-cyan-500/20 bg-[#0a0f18]">
              <img src="/images/polar-bear-guide.png" alt="シロクマ先生" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-semibold mt-1.5 px-3 py-0.5 rounded-full border whitespace-nowrap bg-cyan-950/60 text-cyan-300 border-cyan-500/30 shadow">
              シロクマ先生
            </span>
          </div>
          <div className="relative max-w-4xl rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md border bg-gradient-to-br from-[#0c1424] to-[#080d18] text-slate-100 border-cyan-500/40 rounded-tl-sm shadow-cyan-950/20">
            <p className="text-lg lg:text-[20px] leading-relaxed tracking-normal whitespace-pre-line font-sans font-normal text-slate-100">
              大丈夫、落ち着いて！Qtの最大の武器は「シグナル＆スロット」による美しい疎結合アーキテクチャだよ。
              C++のデータ処理スレッドとGUIのスレッドを安全に切り離しつつ、まるで魔法のように連携できるんだ。<br/><br/>
              今回はLinux環境で動く<strong>モダンダッシュボード計器</strong>を作りながら、実践的なQt設計の極意を一緒に学んでいこう！
            </p>
          </div>
        </div>
      </section>

      {/* ダッシュボードUI（横長の計器パネル） */}
      <section className="mt-20">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-bold font-sans text-white">開発ターゲット：統合型 産業用ダッシュボード</h2>
          <p className="text-lg text-slate-400 font-sans">この学習を通じて、以下のようなグラフィックスを描画するLinuxアプリケーションを構築します。</p>
        </div>

        <div className="relative w-full rounded-3xl border border-cyan-500/20 bg-[#040810] shadow-[0_0_50px_rgba(8,145,178,0.15)] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[length:30px_30px] pointer-events-none"></div>
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-cyan-950/30">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              <span className="font-mono text-cyan-300 font-bold tracking-widest text-sm">HMI SYSTEM MONITORING</span>
            </div>
            <div className="font-mono text-cyan-500/70 text-xs flex gap-6">
              <span>CPU: <span className="text-cyan-400">12%</span></span>
              <span>MEM: <span className="text-emerald-400">4.2GB</span></span>
              <span>FPS: <span className="text-white">60</span></span>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row h-auto lg:h-[450px] relative z-10 p-4 gap-4">
            
            {/* メーターパネル（左側） */}
            <div className="w-full lg:w-1/4 bg-slate-900/50 rounded-2xl border border-cyan-500/10 p-5 flex flex-col items-center justify-center relative">
              <span className="absolute top-4 left-4 font-mono text-cyan-500/50 text-xs">MAIN THRUST</span>
              {/* 円形メーター風SVG */}
              <svg viewBox="0 0 100 100" className="w-full max-w-[200px] mt-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                <path d="M20,80 A40,40 0 1,1 80,80" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="8" strokeLinecap="round" />
                <path d="M20,80 A40,40 0 0,1 70,18" fill="none" stroke="url(#meterGrad)" strokeWidth="8" strokeLinecap="round" />
                <defs>
                  <linearGradient id="meterGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="4" fill="#22d3ee" />
                <line x1="50" y1="50" x2="68" y2="23" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                <text x="50" y="70" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">85%</text>
              </svg>
            </div>

            {/* リアルタイム波形オシロスコープ（中央） */}
            <div className="flex-1 bg-slate-900/50 rounded-2xl border border-cyan-500/10 p-5 flex flex-col">
              <span className="font-mono text-cyan-500/50 text-xs mb-4 block">REALTIME SIGNAL (QCustomPlot / Qt Graphs)</span>
              <div className="flex-1 w-full bg-[#03060d] rounded-xl border border-cyan-500/20 relative overflow-hidden flex items-center justify-center p-2">
                 {/* グリッド */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[length:5%_10%] pointer-events-none"></div>
                 {/* 波形SVG */}
                 <svg className="w-full h-full opacity-90 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,50 Q5,10 10,50 T20,50 T30,50 T40,50 T50,50 T60,50 T70,50 T80,50 T90,50 T100,50" 
                          fill="none" stroke="rgba(16,185,129,0.9)" strokeWidth="1.5">
                      <animate attributeName="d" 
                               values="M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50; M0,50 Q10,90 20,50 T40,50 T60,50 T80,50 T100,50; M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50" 
                               dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M0,50 Q5,30 15,50 T35,50 T55,50 T75,50 T95,50 L100,50" 
                          fill="none" stroke="rgba(34,211,238,0.9)" strokeWidth="1">
                    </path>
                 </svg>
                 {/* スキャンライン */}
                 <div className="absolute top-0 bottom-0 w-[2px] bg-white/50 shadow-[0_0_10px_#fff] animate-[pulse_1.5s_ease-in-out_infinite]" style={{left: '65%'}}></div>
              </div>
            </div>

            {/* レーダーチャート（右側） */}
            <div className="w-full lg:w-1/4 bg-slate-900/50 rounded-2xl border border-cyan-500/10 p-5 flex flex-col items-center justify-center relative">
              <span className="absolute top-4 left-4 font-mono text-cyan-500/50 text-xs">SYSTEM BALANCE</span>
              <svg viewBox="0 0 100 100" className="w-full max-w-[200px] mt-4 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                 {[1,2,3,4].map(r => <polygon key={r} points={`50,${50-r*10} ${50+r*9},${50-r*3} ${50+r*6},${50+r*8} ${50-r*6},${50+r*8} ${50-r*9},${50-r*3}`} fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="0.5"/>)}
                 {[0,72,144,216,288].map(deg => {
                    const rad = deg * Math.PI / 180;
                    return <line key={deg} x1="50" y1="50" x2={50 + Math.sin(rad)*40} y2={50 - Math.cos(rad)*40} stroke="rgba(16,185,129,0.2)" strokeWidth="0.5"/>
                 })}
                 <polygon points="50,15 80,35 65,75 35,80 15,40" fill="rgba(16,185,129,0.3)" stroke="rgba(16,185,129,0.9)" strokeWidth="1.5"/>
              </svg>
            </div>

          </div>
        </div>
      </section>

      <section className="mt-20">

      

        
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

        <div className="flex items-center gap-3 mb-10">
          <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <h2 className="text-3xl font-bold font-sans text-white">カリキュラム一覧</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CLASSIC_CHAPTERS.map((chapter) => (
            <div key={chapter.id} className="group relative block p-6 bg-[#0c121e] rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-[#0f1725] transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:-translate-y-1 overflow-hidden cursor-pointer flex flex-col h-full" onClick={() => onSelectChapter(chapter.slug)}>
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-800 group-hover:bg-cyan-400 transition-colors"></div>
              <div className="flex flex-col gap-1 mb-4">
                <span className="text-[10px] font-sans font-bold text-slate-400">{chapter.badge}</span>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded w-fit">CHAPTER {chapter.id}</span>
              </div>
              <h3 className="text-slate-200 font-bold font-sans text-[15px] sm:text-base leading-snug group-hover:text-white transition-colors flex-grow">
                {chapter.title}
              </h3>
              <p className="text-xs text-slate-500 mt-3 line-clamp-2">
                {chapter.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};


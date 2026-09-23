import React from 'react';
import { QT_CHAPTERS } from '../../data/chapters';
import { Rocket, Award, ArrowRight } from 'lucide-react';

interface TopPageViewProps {
  onSelectChapter: (slug: string) => void;
  completedChapters: number[];
  onOpenPlaygroundModal?: () => void;
  onOpenMilestoneModal?: () => void;
}

export const TopPageView: React.FC<TopPageViewProps> = ({
  onSelectChapter,
  completedChapters,
  onOpenMilestoneModal,
}) => {
  return (
    <div className="w-full max-w-[90rem] mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-12 space-y-16">
      
      {/* ヒーローセクション */}
      <section className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 via-[#070b14] to-[#040810] p-8 sm:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-10 items-center">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 左側: タイトルと説明 */}
        <div className="relative z-10 flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold">
            <span>Linux × C++ GUI開発カリキュラム</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans leading-tight">
            シロクマ Qt×C++ラボ
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 leading-snug">
            C++で実用的なGUI/HMIを設計する。
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
            「Qtの使い方を覚える」のではなく、「リアルタイム計器を作ってみよう」という目的から出発します。<br />
            Linux環境で動くHMI（ダッシュボード）を題材に、C++のマルチスレッド設計やQMLによる滑らかな描画を実践的に学びましょう。
          </p>

          <div className="flex flex-wrap gap-3 pt-1 text-sm font-mono text-slate-300">
            <span className="px-4 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">全12章構成</span>
            <span className="px-4 py-1.5 rounded-lg bg-slate-950/80 border border-cyan-500/30 text-cyan-300">専用 Qt / QML</span>
            <span className="px-4 py-1.5 rounded-lg bg-slate-950/80 border border-emerald-500/30 text-emerald-300">対象 Linux (Ubuntu)</span>
          </div>

          {/* メインアクションボタングループ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
            <button
              onClick={() => onSelectChapter('chapter-0')}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-black text-base shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_45px_rgba(34,211,238,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Rocket className="w-5 h-5 text-slate-950 group-hover:animate-bounce" />
              <span>最初から学ぶ（🔰 準備編：環境セットアップへ）</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            {onOpenMilestoneModal && (
              <button
                onClick={onOpenMilestoneModal}
                className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-700/80 hover:border-amber-400/50 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg cursor-pointer"
              >
                <Award className="w-5 h-5 text-amber-400" />
                <span>公式修了証・進捗確認</span>
                {completedChapters.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                    {completedChapters.length}/13章
                  </span>
                )}
              </button>
            )}
          </div>

          {/* 初学者・学習者への安心ガイダンス会話バブル */}
          <div className="pt-2 max-w-xl space-y-2.5">
            <div className="flex items-start gap-3 bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <img src="/images/characters/penguin_student.jpg" alt="ペンギン生徒" className="w-9 h-9 rounded-full object-cover border-2 border-amber-400/80 flex-shrink-0 mt-0.5 shadow" />
              <div className="text-xs text-slate-300 leading-relaxed font-sans">
                <span className="font-bold text-amber-400 block text-[11px] mb-0.5">ペンギン生徒（初学者）</span>
                「LinuxでのGUI開発って環境構築やマルチスレッドで挫折しそうで不安です…！」
              </div>
            </div>
            <div className="flex items-start gap-3 bg-cyan-950/40 p-3 rounded-2xl border border-cyan-500/40 shadow-inner">
              <img src="/images/characters/shirokuma_sensei.png" alt="シロクマ先生" className="w-9 h-9 rounded-full object-cover border-2 border-cyan-400/80 flex-shrink-0 mt-0.5 shadow" />
              <div className="text-xs text-slate-200 leading-relaxed font-sans">
                <span className="font-bold text-cyan-300 block text-[11px] mb-0.5">シロクマ先生（シニアアーキテクト）</span>
                「案ずるな！WSLgを使えばWindows上で一瞬でネイティブGUIが立ち上がるぞ。まずは第0章から、針が動き波形が流れる計器画面を一緒に作っていこう！」
              </div>
            </div>
          </div>

          {/* ペルソナ別おすすめ開始章 */}
          <div className="pt-1">
            <span className="text-xs font-mono text-slate-400 block mb-2">🎯 あなたのレベルに合わせて選ぶ：</span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <button
                onClick={() => onSelectChapter('chapter-0')}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="text-cyan-400 font-bold">【未経験】</span>🔰 準備編 環境セットアップ ➔
              </button>
              <button
                onClick={() => onSelectChapter('chapter-3')}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-700/60 hover:border-sky-500/40 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="text-sky-400 font-bold">【C++既習】</span>第3章 シグナル＆スロット ➔
              </button>
              <button
                onClick={() => onSelectChapter('chapter-5')}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/40 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="text-emerald-400 font-bold">【マルチスレッド】</span>第5章 スレッド設計 ➔
              </button>
            </div>
          </div>
        </div>
        
        {/* 右側: HMIダッシュボードのモックアップとMISSION */}
        <div className="relative z-10 w-full lg:w-1/2 flex flex-col gap-6">
          <div className="text-sm font-bold text-cyan-400 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
            TARGET: REALTIME DASHBOARD
          </div>
          
          <div className="relative w-full rounded-2xl border border-cyan-500/30 bg-[#040810] shadow-[0_0_40px_rgba(8,145,178,0.15)] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>
            
            <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-500/20 bg-cyan-950/40">
              <span className="font-mono text-cyan-300 font-bold text-xs tracking-wider">HMI SYSTEM MONITORING</span>
              <div className="font-mono text-cyan-500/70 text-[10px] sm:text-xs flex gap-4">
                <span>CPU: <span className="text-cyan-400">12%</span></span>
                <span>FPS: <span className="text-white">60</span></span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row h-auto sm:h-[180px] relative z-10 p-3 gap-3">
              {/* メーターパネル */}
              <div className="w-full sm:w-1/3 bg-slate-900/60 rounded-xl border border-cyan-500/10 p-2 flex flex-col items-center justify-center relative">
                <span className="absolute top-2 left-2 font-mono text-cyan-500/50 text-[9px] font-bold">MAIN THRUST</span>
                <svg viewBox="0 0 100 100" className="w-full max-w-[110px] mt-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
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
                  <text x="50" y="75" fill="#fff" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">142</text>
                </svg>
              </div>

              {/* 波形パネル */}
              <div className="flex-1 bg-slate-900/60 rounded-xl border border-cyan-500/10 p-2 flex flex-col">
                <span className="font-mono text-cyan-500/50 text-[9px] font-bold mb-1 block">REALTIME SIGNAL (Qt Graphs)</span>
                <div className="flex-1 w-full bg-[#03060d] rounded-lg border border-cyan-500/20 relative overflow-hidden flex items-center justify-center p-1">
                   <svg className="w-full h-full opacity-90 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,50 Q5,10 10,50 T20,50 T30,50 T40,50 T50,50 T60,50 T70,50 T80,50 T90,50 T100,50" fill="none" stroke="rgba(16,185,129,0.9)" strokeWidth="1.5">
                        <animate attributeName="d" values="M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50; M0,50 Q10,90 20,50 T40,50 T60,50 T80,50 T100,50; M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50" dur="2s" repeatCount="indefinite" />
                      </path>
                   </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 実践的なMISSIONの提示 */}
          <div className="bg-slate-900/90 border border-slate-700/60 p-5 rounded-2xl shadow-xl relative backdrop-blur-sm">
            <div className="absolute -top-3 left-6 bg-amber-500 text-slate-950 text-[11px] font-black px-3 py-0.5 rounded-sm shadow-sm tracking-widest">MISSION</div>
            <p className="text-sm sm:text-base text-slate-100 font-bold mb-2">Q. この計器画面に「温度異常の警報(ALARM)」を追加してください。</p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              GUIの滑らかな描画(60fps)を止めずに、裏側でセンサーと通信してリアルタイムに異常を判定し、UIに反映させるにはどうC++を設計しますか？
            </p>
          </div>
        </div>
      </section>

      {/* Introduction / Overview Section */}
      <section className="mt-20">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-bold font-sans text-white">このサイトについて</h2>
          <p className="text-lg text-slate-400 font-sans">対象読者と学習内容、前提となる環境についてのご案内</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-[#0a0f18] p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">01.</span> Qt（キュート）とは？
            </h3>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                車のメーターパネル（デジタルコックピット）、FA機器、医療モニターなど、「絶対にフリーズしてはいけない」「コンマ1秒の遅れが許されない」ミッションクリティカルな現場で採用されているC++ベースの産業用GUIフレームワークです。
              </p>
              <p>
                本サイトは、C++のロジックと画面描画を分離（ViewとViewModelの分離）する基礎から始まり、最終的にマルチスレッドを用いた堅牢なダッシュボードを自力で構築できるようになることを目的としたハンズオン学習メディアです。
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => onSelectChapter('gui-framework-comparison')}
                  className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 px-4 py-2 rounded-lg transition-colors border border-cyan-500/20 hover:border-cyan-500/40"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  【付録】代表的なGUIフレームワーク比較を読む
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0f18] p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400">02.</span> 想定する対象読者
            </h3>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <ul className="list-disc list-inside space-y-2">
                <li>C++の基礎（クラス、ポインタ）を理解している方</li>
                <li>組み込み機器や産業用PCのHMI開発に興味がある方</li>
                <li>Webフロントエンド技術ではない、ネイティブGUIの王道なアーキテクチャを学びたい方</li>
              </ul>
              <p className="mt-4 p-3 bg-emerald-950/20 border border-emerald-900/50 rounded-lg text-emerald-400/90 text-xs">
                ※QtやCMakeに触れたことがなくても、🔰 準備編の開発環境セットアップから順を追って学習できるように構成されています。
              </p>
            </div>
          </div>

          <div className="bg-[#0a0f18] p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-amber-500/30 transition-colors md:col-span-2">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400">03.</span> 開発環境と前提条件
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 text-sm leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-200 mb-2 border-b border-slate-800 pb-1">・検証済み環境</h4>
                <ul className="space-y-1 text-slate-400 font-mono">
                  <li>・OS: <span className="text-slate-200">Linux (Ubuntu 22.04 LTS 等)</span></li>
                  <li>・Language: <span className="text-slate-200">C++17</span></li>
                  <li>・Build Tool: <span className="text-slate-200">CMake</span></li>
                  <li>・Library: <span className="text-slate-200">Qt 5.15+ (Qt 6 Compatible)</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-200 mb-2 border-b border-slate-800 pb-1">※環境構築に不安がある方へ</h4>
                <p className="text-slate-400">
                  Qtは最大の強みは「クロスプラットフォーム」です。本サイトでは産業用でシェアの高いLinux基準で解説していますが、<strong>Windows（Visual Studio）</strong>や<strong>macOS（Xcode）</strong>環境でもほぼ同じコードのまま動作させることが可能です。<br/>
                  ご自身の得意なOSエディタ環境に読み替えて進めても問題ありません。
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* キャラクター紹介 */}
      <section className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-start gap-6 my-8 flex-row-reverse max-w-5xl mx-auto">
          {/* ペンギン生徒 */}
          <div className="flex flex-col items-center flex-shrink-0 mt-2">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.25)] bg-[#040810]">
              <img src="/images/characters/penguin_student.jpg" alt="ペンギン生徒" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold mt-3 px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-400/50 shadow-sm">
              ペンギン生徒
            </span>
          </div>

          <div className="relative flex-1 bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-lg shadow-amber-900/10">
            {/* CSS Border による吹き出しのしっぽ */}
            <div className="absolute top-10 -right-[13px] w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[13px] border-l-amber-500/40"></div>
            <div className="absolute top-[41px] -right-[11px] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-[#0f172a]"></div>
            
            <p className="text-lg lg:text-[19px] leading-relaxed tracking-normal whitespace-pre-line font-sans text-slate-200">
              Qtの名前は聞いたことあるけど、C++で書くバックエンドとQMLの画面をどう結ぶのか、マルチスレッドによるGUIフリーズ回避...Linuxの組み込みGUI開発って謎だらけです！？
            </p>
            <div className="mt-5 pt-4 border-t border-amber-500/20 text-sm flex items-center gap-2.5 font-sans text-amber-300/90 bg-amber-950/20 px-4 py-3 rounded-xl">
              <span className="text-lg">🐧</span>
              <span className="italic">C++のポインタは分かるけど、イベントループとシグナル・スロット概念でつまづく...</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 my-4 flex-row">
          {/* シロクマ先生 */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-xl border-2 border-cyan-400 shadow-cyan-900/60 ring-2 ring-cyan-500/30 bg-[#0a0f18]">
              <img src="/images/characters/shirokuma_sensei.png" alt="シロクマ先生" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold mt-2 px-3.5 py-1 rounded-full border whitespace-nowrap bg-cyan-950/80 text-cyan-300 border-cyan-400/50 shadow-md">
              シロクマ先生
            </span>
          </div>
          <div className="relative flex-1 max-w-4xl rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md border border-cyan-500/40 bg-gradient-to-br from-[#0c1424] to-[#080d18] text-slate-100 shadow-cyan-950/20">
            <div className="absolute top-8 -left-[13px] w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[13px] border-r-cyan-500/40"></div>
            <div className="absolute top-[33px] -left-[11px] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[12px] border-r-[#0c1424]"></div>
            <p className="text-lg lg:text-[20px] leading-relaxed tracking-normal whitespace-pre-line font-sans font-normal text-slate-100">
              ふふっ、Qtの最大の武器は「シグナル＆スロット」による疎結合アーキテクチャだ。
              C++のデータ構造とGUIのコンポーネントを完全に切り離しつつ、魔法のように連携できるんだ。<br/><br/>
              このLinux環境で「<strong>ダッシュボード</strong>」を作りながら、プロ水準のQt設計の極意を一緒に学んでいこう！
            </p>
          </div>
        </div>
      </section>

      {/* カリキュラム一覧 */}
      <section className="mt-20">
        <div className="flex items-center gap-3 mb-10">
          <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <h2 className="text-3xl font-bold font-sans text-white">カリキュラム一覧</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {QT_CHAPTERS.map((chapter) => (
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


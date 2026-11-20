import React from 'react';
import { QT_CHAPTERS } from '../../data/chapters';
import { Rocket, Award, ArrowRight } from 'lucide-react';
import { AffiliatePromoBanner } from '../affiliate/AffiliatePromoBanner';
import { NewsletterSection } from '../common/NewsletterSection';

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
    <div className="w-full max-w-[90rem] mx-auto py-5 sm:py-8 px-3 sm:px-6 lg:px-8 space-y-10 min-w-0">
      
      {/* ヒーローセクション */}
      <section className="relative rounded-3xl border border-cyan-300/80 dark:border-cyan-500/30 bg-gradient-to-b from-white/95 via-sky-50/70 to-slate-50/90 dark:from-slate-900/90 dark:via-[#070b14] dark:to-[#040810] p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-2xl overflow-hidden flex flex-col 2xl:flex-row gap-8 lg:gap-10 items-stretch 2xl:items-center transition-colors">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 左側: タイトルと説明 */}
        <div className="relative z-10 flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 font-mono text-xs sm:text-sm font-bold">
            <span>Linux × C++ GUI開発カリキュラム</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-black tracking-tight text-slate-900 dark:text-white font-sans leading-[1.15] break-keep">
            <span className="inline-block whitespace-nowrap">シロクマ</span>{' '}
            <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 dark:from-cyan-300 dark:via-sky-200 dark:to-blue-300">
              Qt×C++ラボ
            </span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-cyan-600 to-emerald-600 dark:from-amber-300 dark:via-cyan-300 dark:to-emerald-300 leading-snug">
            <span className="inline-block whitespace-nowrap">C++で実用的な</span>{' '}
            <span className="inline-block whitespace-nowrap">GUI/HMIを設計する。</span>
          </p>

          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-2xl">
            「Qtの使い方を覚える」のではなく、「リアルタイム計器を作ってみよう」という目的から出発します。<br />
            Linux環境で動くHMI（ダッシュボード）を題材に、C++のマルチスレッド設計やQMLによる滑らかな描画を実践的に学びましょう。
          </p>

          <div className="flex flex-wrap gap-3 pt-1 text-sm sm:text-base font-mono text-slate-700 dark:text-slate-300">
            <span className="px-4 py-1.5 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 shadow-sm font-semibold">全12章構成</span>
            <span className="px-4 py-1.5 rounded-xl bg-cyan-50 dark:bg-slate-950/80 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 shadow-sm font-semibold">専用 Qt / QML</span>
            <span className="px-4 py-1.5 rounded-xl bg-emerald-50 dark:bg-slate-950/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 shadow-sm font-semibold">対象 Linux (Ubuntu)</span>
          </div>

          {/* メインアクションボタングループ（絶対に横潰れしないレスポンシブwrap設計） */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-3">
            <button
              onClick={() => onSelectChapter('chapter-0')}
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-black text-sm sm:text-base shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_45px_rgba(34,211,238,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Rocket className="w-5 h-5 text-slate-950 group-hover:animate-bounce shrink-0" />
              <span className="whitespace-nowrap">最初から学ぶ（🔰 準備編へ）</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            {onOpenMilestoneModal && (
              <button
                onClick={onOpenMilestoneModal}
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white border border-slate-300 dark:border-slate-700/80 hover:border-amber-400/50 font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Award className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">公式修了証・進捗確認</span>
                {completedChapters.length > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 text-xs sm:text-sm font-mono font-bold shrink-0">
                    {completedChapters.length}/13章
                  </span>
                )}
              </button>
            )}
          </div>

          {/* 初学者・学習者への安心ガイダンス会話バブル */}
          <div className="pt-2 max-w-2xl space-y-3">
            <div className="flex items-start gap-3.5 bg-white/95 dark:bg-slate-950/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <img src="/images/characters/penguin_student.jpg" alt="ペンギン生徒" className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/80 flex-shrink-0 mt-0.5 shadow" />
              <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                <span className="font-bold text-amber-700 dark:text-amber-400 block text-xs sm:text-sm mb-1">ペンギン生徒（初学者）</span>
                「LinuxでのGUI開発って環境構築やマルチスレッドで挫折しそうで不安です…！」
              </div>
            </div>
            <div className="flex items-start gap-3.5 bg-cyan-50/95 dark:bg-cyan-950/50 p-4 rounded-2xl border border-cyan-300 dark:border-cyan-500/40 shadow-sm">
              <img src="/images/characters/shirokuma_sensei.png" alt="シロクマ先生" className="w-11 h-11 rounded-full object-cover border-2 border-cyan-400/80 flex-shrink-0 mt-0.5 shadow" />
              <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-sans">
                <span className="font-bold text-cyan-800 dark:text-cyan-300 block text-xs sm:text-sm mb-1">シロクマ先生（シニアアーキテクト）</span>
                「案ずるな！WSLgを使えばWindows上で一瞬でネイティブGUIが立ち上がるぞ。まずは第0章から、針が動き波形が流れる計器画面を一緒に作っていこう！」
              </div>
            </div>
          </div>

          {/* ペルソナ別おすすめ開始章 */}
          <div className="pt-2">
            <span className="text-sm sm:text-base font-mono font-bold text-slate-700 dark:text-slate-300 block mb-2.5">🎯 あなたのレベルに合わせて選ぶ：</span>
            <div className="flex flex-wrap gap-2.5 text-xs sm:text-sm font-sans">
              <button
                onClick={() => onSelectChapter('chapter-0')}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-300 dark:border-slate-700/60 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition flex items-center gap-1.5 cursor-pointer shadow-sm font-medium"
              >
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">【未経験】</span>🔰 準備編 環境セットアップ ➔
              </button>
              <button
                onClick={() => onSelectChapter('chapter-3')}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-300 border border-slate-300 dark:border-slate-700/60 hover:border-sky-400 dark:hover:border-sky-500/40 transition flex items-center gap-1.5 cursor-pointer shadow-sm font-medium"
              >
                <span className="text-sky-700 dark:text-sky-400 font-bold">【C++既習】</span>第3章 シグナル＆スロット ➔
              </button>
              <button
                onClick={() => onSelectChapter('chapter-5')}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-300 dark:border-slate-700/60 hover:border-emerald-400 dark:hover:border-emerald-500/40 transition flex items-center gap-1.5 cursor-pointer shadow-sm font-medium"
              >
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">【マルチスレッド】</span>第5章 スレッド設計 ➔
              </button>
            </div>
          </div>
        </div>
        
        {/* 右側: HMIダッシュボードのモックアップとMISSION */}
        <div className="relative z-10 w-full 2xl:w-1/2 max-w-3xl 2xl:max-w-none flex flex-col gap-6">
          <div className="text-sm sm:text-base font-bold text-cyan-600 dark:text-cyan-400 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
            TARGET: REALTIME DASHBOARD
          </div>
          
          <div className="relative w-full rounded-2xl border border-cyan-400/50 dark:border-cyan-500/30 bg-[#040810] shadow-[0_0_40px_rgba(8,145,178,0.15)] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>
            
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-cyan-500/20 bg-cyan-950/40">
              <span className="font-mono text-cyan-300 font-bold text-xs sm:text-sm tracking-wider">HMI SYSTEM MONITORING</span>
              <div className="font-mono text-cyan-400 text-xs sm:text-sm flex gap-4 font-bold">
                <span>CPU: <span className="text-cyan-300">12%</span></span>
                <span>FPS: <span className="text-white">60</span></span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row h-auto sm:h-[190px] relative z-10 p-3 gap-3">
              {/* メーターパネル */}
              <div className="w-full sm:w-1/3 bg-white/80 dark:bg-slate-900/60 rounded-xl border border-cyan-500/10 p-2 flex flex-col items-center justify-center relative">
                <span className="absolute top-2 left-2 font-mono text-cyan-500/70 text-xs sm:text-xs font-bold">MAIN THRUST</span>
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
              <div className="flex-1 bg-white/80 dark:bg-slate-900/60 rounded-xl border border-cyan-500/10 p-2 flex flex-col">
                <span className="font-mono text-cyan-500/70 text-xs sm:text-xs font-bold mb-1 block">REALTIME SIGNAL (Qt Graphs)</span>
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
          <div className="bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/60 p-5 sm:p-6 rounded-2xl shadow-lg dark:shadow-xl relative backdrop-blur-sm">
            <div className="absolute -top-3 left-6 bg-amber-500 text-slate-950 text-xs font-black px-3 py-0.5 rounded-sm shadow-sm tracking-widest">MISSION</div>
            <p className="text-base sm:text-lg text-slate-900 dark:text-slate-100 font-bold mb-2">Q. この計器画面に「温度異常の警報(ALARM)」を追加してください。</p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              GUIの滑らかな描画(60fps)を止めずに、裏側でセンサーと通信してリアルタイムに異常を判定し、UIに反映させるにはどうC++を設計しますか？
            </p>
          </div>
        </div>
      </section>

      {/* Introduction / Overview Section (折りたたみ整理) */}
      <details className="rounded-3xl bg-white/95 dark:bg-[#0a0f18] border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden group">
        <summary className="list-none cursor-pointer p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-sky-50/50 dark:hover:bg-slate-900/60 transition-colors">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-900 dark:text-white">このサイトについて・対象読者・推奨開発環境（01〜03）</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans mt-0.5">Qtの概要、想定読者、Ubuntu / Windows / macOS 前提環境</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-bold text-xs shrink-0 border border-cyan-200 dark:border-cyan-500/30 group-open:hidden">開く ▼</span>
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs shrink-0 border border-slate-200 dark:border-slate-700 hidden group-open:inline">閉じる ▲</span>
        </summary>
        <div className="p-5 sm:p-7 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-slate-50/80 dark:bg-slate-900/60 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400">01.</span> Qt（キュート）とは？
            </h3>
            <div className="space-y-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                車のメーターパネル（デジタルコックピット）、FA機器、医療モニターなど、「絶対にフリーズしてはいけない」「コンマ1秒の遅れが許されない」現場で採用されるC++ベースの産業用GUIフレームワークです。
              </p>
              <p>
                C++のロジックと画面描画を分離する基礎から始まり、最終的にマルチスレッドを用いた堅牢なダッシュボード構築を習得します。
              </p>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectChapter('gui-framework-comparison')}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1.5 rounded-xl border border-cyan-200 dark:border-cyan-500/20 cursor-pointer"
                >
                  <span>【付録1】GUI比較（Web/Qt）</span>
                </button>
                <button
                  onClick={() => onSelectChapter('x11-wayland-linux-graphics')}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 cursor-pointer"
                >
                  <span>🖥️ 【付録2】X11・MotifとQPAの仕組み</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-900/60 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400">02.</span> 想定する対象読者
            </h3>
            <div className="space-y-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <ul className="list-disc list-inside space-y-1.5">
                <li>C++の基礎（クラス、ポインタ）を理解している方</li>
                <li>組み込み機器や産業用PCのHMI開発に興味がある方</li>
                <li>ネイティブGUIの王道アーキテクチャを学びたい方</li>
              </ul>
              <p className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-emerald-800 dark:text-emerald-400/90 text-xs sm:text-sm leading-relaxed">
                ※QtやCMake未経験でも、🔰 準備編の環境セットアップから順を追って学べます。
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-900/60 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 md:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-400">03.</span> 開発環境と前提条件
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-200 mb-2 border-b border-slate-200 dark:border-slate-800 pb-1">・検証済み環境</h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 font-mono text-xs sm:text-sm">
                  <li>・OS: <span className="text-slate-900 dark:text-slate-200 font-semibold">Linux (Ubuntu 22.04 LTS 等)</span></li>
                  <li>・Language / Build: <span className="text-slate-900 dark:text-slate-200 font-semibold">C++17 / CMake</span></li>
                  <li>・Library: <span className="text-slate-900 dark:text-slate-200 font-semibold">Qt 5.15+ (Qt 6 Compatible)</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-200 mb-2 border-b border-slate-200 dark:border-slate-800 pb-1">※Windows/macOSでの学習</h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  クロスプラットフォーム設計のため、Windows（Visual Studio / WSLg）やmacOS環境でもほぼ同一コードで学習可能です。
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </details>

      {/* カリキュラム一覧 */}
      <section className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <h2 className="text-3xl sm:text-4xl font-black font-sans text-slate-900 dark:text-white">カリキュラム一覧</h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-50 dark:bg-cyan-950/50 border border-sky-200 dark:border-cyan-500/30 text-xs sm:text-sm font-sans text-sky-800 dark:text-cyan-300 shadow-xs">
            <span className="text-base">💡</span>
            <span>※ 自動化ラボ等と異なり、環境構築を丁寧に行うため<strong>【第0章】</strong>からスタートします</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {QT_CHAPTERS.map((chapter) => (
            <div key={chapter.id} className="group relative block p-6 sm:p-7 bg-white/90 dark:bg-[#0c121e] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/50 hover:bg-cyan-50/30 dark:hover:bg-[#0f1725] transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:-translate-y-1 overflow-hidden cursor-pointer flex flex-col h-full shadow-sm" onClick={() => onSelectChapter(chapter.slug)}>
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200 dark:bg-slate-800 group-hover:bg-cyan-500 transition-colors"></div>
              <div className="flex flex-col gap-1.5 mb-4">
                <span className="text-xs font-sans font-bold text-slate-500 dark:text-slate-400">{chapter.badge}</span>
                <span className={`text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-lg w-fit border ${
                  chapter.id === 0
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40'
                    : 'text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-800/30'
                }`}>
                  {chapter.id === 0 ? '🔰 CHAPTER 0 (準備編)' : `CHAPTER ${chapter.id}`}
                </span>
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 font-bold font-sans text-base sm:text-lg leading-snug group-hover:text-cyan-600 dark:group-hover:text-white transition-colors flex-grow">
                {chapter.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                {chapter.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* メルマガ＆推奨教材セクション */}
      <NewsletterSection />

      {/* おすすめ学習リソース ＆ スクール（PR） */}
      <section className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
        <AffiliatePromoBanner defaultCategory="school" limit={3} showTabs={true} />
      </section>

    </div>
  );
};


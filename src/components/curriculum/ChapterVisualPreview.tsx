import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  AlertTriangle, 
  Radio, 
  CheckCircle2, 
  Layers, 
  Server, 
  Workflow, 
  ShieldCheck,
  Check
} from 'lucide-react';

interface ChapterVisualPreviewProps {
  chapterId: number;
  slug: string;
}

export const ChapterVisualPreview: React.FC<ChapterVisualPreviewProps> = ({ chapterId, slug }) => {
  const [sliderVal, setSliderVal] = useState<number>(65);
  const [lampOn, setLampOn] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(42);
  const [selectedPlugin, setSelectedPlugin] = useState<'xcb' | 'wayland' | 'eglfs'>('xcb');

  // 定期的な波形・ランプの点滅アニメーション
  useEffect(() => {
    const interval = setInterval(() => {
      setLampOn(prev => !prev);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  // ==========================================================================
  // 【特別付録2】X11・MotifとQPAアーキテクチャ（Linuxグラフィックススタック）
  // ==========================================================================
  if (slug === 'x11-wayland-linux-graphics') {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-2xl bg-[#040810] border-2 border-emerald-500/40 p-3 sm:p-5 flex flex-col justify-between font-mono shadow-[0_0_35px_rgba(16,185,129,0.2)] relative overflow-hidden select-none">
        {/* ウィンドウタイトルバー */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-xs"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs"></div>
            <span className="text-xs text-emerald-200 font-bold ml-1.5 truncate">
              🖥️ Linux Graphics &amp; Sonar HMI Architecture Stack
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold shrink-0">
            X11 / Wayland / DRM-KMS
          </span>
        </div>

        {/* 2カラム構成：左＝Linuxグラフィックス階層スタック、右＝ソナー・防衛管制GUIの変遷史 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 my-3">
          {/* 左カラム: QPAとOSウィンドウシステムの階層構造 */}
          <div className="bg-[#080d1a] p-3 rounded-xl border border-emerald-500/20 flex flex-col justify-between space-y-2">
            <div className="text-xs font-bold text-emerald-400 flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" />
                <span>Linux Graphics Layers</span>
              </span>
              <span className="text-[9px] text-slate-400 font-normal">Data Flow ↓</span>
            </div>

            {/* 1. アプリケーション層 */}
            <div className="p-2 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-[11px] text-center">
              <span className="text-cyan-300 font-bold block">1. Qt 6 Application (C++ / QML)</span>
              <span className="text-[9px] text-slate-400">GUI Logic, Multithreading, Realtime Signal</span>
            </div>

            {/* 2. QPA層（インタラクティブ切替） */}
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-[10px] space-y-1.5">
              <div className="flex justify-between items-center text-emerald-300 font-bold">
                <span>2. QPA (Qt Platform Abstraction)</span>
                <span className="text-[8px] text-emerald-400 bg-emerald-900/50 px-1 rounded">動的プラグイン</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[9px] text-center">
                <button
                  onClick={() => setSelectedPlugin('xcb')}
                  className={`py-1 rounded border cursor-pointer transition ${
                    selectedPlugin === 'xcb'
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-xs'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  xcb (X11)
                </button>
                <button
                  onClick={() => setSelectedPlugin('wayland')}
                  className={`py-1 rounded border cursor-pointer transition ${
                    selectedPlugin === 'wayland'
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-xs'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  wayland
                </button>
                <button
                  onClick={() => setSelectedPlugin('eglfs')}
                  className={`py-1 rounded border cursor-pointer transition ${
                    selectedPlugin === 'eglfs'
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-xs'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  eglfs (組込)
                </button>
              </div>
            </div>

            {/* 3. ディスプレイサーバー / OSカーネル層 */}
            <div className="p-2 rounded-lg bg-[#02050c] border border-slate-800 text-[10px] space-y-1">
              <span className="text-slate-300 font-bold block">3. Display Server &amp; Kernel</span>
              {selectedPlugin === 'xcb' && (
                <div className="text-[9px] text-cyan-300">
                  ➔ X11 Server (/tmp/.X11-unix/X0, DISPLAY=:0) ネットワーク透過
                </div>
              )}
              {selectedPlugin === 'wayland' && (
                <div className="text-[9px] text-emerald-300">
                  ➔ Wayland Compositor (共有バッファ直結・テアリングゼロ)
                </div>
              )}
              {selectedPlugin === 'eglfs' && (
                <div className="text-[9px] text-amber-300">
                  ➔ Linux Kernel DRM/KMS 直接占有 (起動1秒未満・最速組込み)
                </div>
              )}
            </div>
          </div>

          {/* 右カラム: ソナー・管制HMIの3世代進化系譜 */}
          <div className="bg-[#080d1a] p-3 rounded-xl border border-emerald-500/20 flex flex-col justify-between space-y-2">
            <div className="text-xs font-bold text-emerald-400 flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5" />
                <span>Sonar HMI Evolution</span>
              </span>
              <span className="text-[9px] text-amber-400 font-mono">1990s ➔ 2020s</span>
            </div>

            <div className="space-y-2 text-[10px]">
              {/* 1990s */}
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between items-center text-slate-300 font-bold">
                  <span>🏛️ 1990s: UNIX ＋ OSF/Motif</span>
                  <span className="text-[8px] text-slate-500">Solaris / IRIX</span>
                </div>
                <p className="text-[9px] text-slate-400 mt-0.5">
                  無骨なグレー立体ボタン。XtCallbackProc による C言語コールバック地獄。
                </p>
              </div>

              {/* 2000s */}
              <div className="p-2 rounded-lg bg-slate-900/60 border border-cyan-900/40">
                <div className="flex justify-between items-center text-cyan-300 font-bold">
                  <span>🌊 2000s: Linux ＋ Xlib ＋ OpenGL</span>
                  <span className="text-[8px] text-cyan-400">COTS化</span>
                </div>
                <p className="text-[9px] text-slate-400 mt-0.5">
                  GLXサーフェス直結。LOFARウォーターフォール波形を毎秒数千ライン描画。
                </p>
              </div>

              {/* 2020s */}
              <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                <div className="flex justify-between items-center text-emerald-300 font-bold">
                  <span>🚀 2020s: Modern Linux ＋ Qt 6 QML</span>
                  <span className="text-[8px] text-emerald-400 font-bold">現役標準</span>
                </div>
                <p className="text-[9px] text-slate-300 mt-0.5">
                  QQuickPaintedItem ＋ Qt Graphs。C++20マルチスレッドと60fps GPU描画の完全融合。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 下部ステータスバー */}
        <div className="bg-[#02050c] rounded-lg px-3 py-1.5 text-[10px] text-slate-400 border border-slate-800 flex flex-wrap justify-between items-center gap-2">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            xcbエラー完全解剖：QT_DEBUG_PLUGINS=1 で依存欠落を特定
          </span>
          <span className="text-cyan-300 font-mono">QPA Plugin: libqxcb.so</span>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 【特別付録1】GUIフレームワーク比較（ポジショニングマップ）
  // ==========================================================================
  if (slug === 'gui-framework-comparison') {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3 sm:p-5 flex flex-col justify-between font-mono shadow-[0_0_35px_rgba(6,182,212,0.2)] relative overflow-hidden select-none">
        {/* ウィンドウタイトルバー */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-xs"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs"></div>
            <span className="text-xs text-cyan-200 font-bold ml-1.5 truncate">
              📊 GUI Framework Positioning &amp; Performance Matrix
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold shrink-0">
            Industrial vs Desktop
          </span>
        </div>

        {/* 3大アプローチの比較マトリックスカード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
          {/* 1. Web系 (Electron / Tauri) */}
          <div className="bg-[#080d1a] p-3 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-xs font-bold text-slate-200">Web / Chromium</span>
                <span className="text-[9px] text-slate-500">Electron</span>
              </div>
              <div className="mt-2 space-y-1 text-[10px] text-slate-400">
                <div>開発速度: <span className="text-emerald-400 font-bold">★★★★★</span></div>
                <div>メモリ効率: <span className="text-rose-400 font-bold">★☆☆☆☆ (150MB+)</span></div>
                <div>60FPS安定性: <span className="text-amber-400 font-bold">★★☆☆☆ (GC遅延)</span></div>
              </div>
            </div>
            <div className="text-[9px] text-slate-500 border-t border-slate-850 pt-1.5">
              主な用途: Slack, VSCode, 一般業務Webツール
            </div>
          </div>

          {/* 2. 即値モード (Dear ImGui) */}
          <div className="bg-[#080d1a] p-3 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-xs font-bold text-slate-200">Immediate Mode</span>
                <span className="text-[9px] text-slate-500">Dear ImGui</span>
              </div>
              <div className="mt-2 space-y-1 text-[10px] text-slate-400">
                <div>超軽量性: <span className="text-emerald-400 font-bold">★★★★★ (数MB)</span></div>
                <div>導入速度: <span className="text-emerald-400 font-bold">★★★★★</span></div>
                <div>産業用画面: <span className="text-rose-400 font-bold">★★☆☆☆ (装飾不向き)</span></div>
              </div>
            </div>
            <div className="text-[9px] text-slate-500 border-t border-slate-850 pt-1.5">
              主な用途: ゲーム内デバッグ、社内ツール、プロトタイプ
            </div>
          </div>

          {/* 3. 産業用ネイティブ (Qt 6 / C++) */}
          <div className="bg-gradient-to-b from-cyan-950/40 to-[#080d1a] p-3 rounded-xl border-2 border-cyan-400/50 flex flex-col justify-between space-y-2 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[8px] font-black px-2 py-0.5 rounded-bl">
              現場標準
            </div>
            <div>
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1">
                <span className="text-xs font-bold text-cyan-300">Qt 6 ＋ C++20</span>
                <span className="text-[9px] text-cyan-400 font-mono">QML/Native</span>
              </div>
              <div className="mt-2 space-y-1 text-[10px] text-slate-300">
                <div>リアルタイム性: <span className="text-cyan-300 font-bold">★★★★★ (低遅延)</span></div>
                <div>60FPS安定性: <span className="text-emerald-400 font-bold">★★★★★ (GCなし)</span></div>
                <div>ハード制御: <span className="text-cyan-300 font-bold">★★★★★ (C++直結)</span></div>
              </div>
            </div>
            <div className="text-[9px] text-cyan-300 font-semibold border-t border-cyan-500/20 pt-1.5">
              主な用途: 自動車コックピット、ソナー・防衛、医療、FA機器
            </div>
          </div>
        </div>

        {/* 下部ステータスバー */}
        <div className="bg-[#02050c] rounded-lg px-3 py-1.5 text-[10px] text-slate-400 border border-slate-800 flex flex-wrap justify-between items-center gap-2">
          <span className="text-cyan-300 font-bold flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-cyan-400" />
            ミッションクリティカルな60FPS保証とC++ハード制御なら「Qt」が唯一解
          </span>
          <span className="text-slate-400 font-mono">Multi-Platform (Linux/Win/Embedded)</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 0. Ch.0: 準備編（Qt Creator ＋ CMake ＋ 最初のGUIウィンドウ起動イメージ）
  // --------------------------------------------------------------------------
  if (chapterId === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3 sm:p-4 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        {/* ウィンドウタイトルバー */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-xs"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs"></div>
            <span className="text-xs text-slate-300 font-bold ml-1.5 truncate">
              Qt Creator 13 ＋ WSL2 (Ubuntu 24.04 LTS)
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold shrink-0">
            WSLg OpenGL Active
          </span>
        </div>

        {/* 開発環境と起動画面の2ペイン構成 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
          {/* 左ペイン: CMakeプロジェクト構成 */}
          <div className="bg-[#080d1a] p-2.5 rounded-xl border border-cyan-500/20 text-[11px] space-y-1.5">
            <div className="text-cyan-400 font-bold flex items-center gap-1 pb-1 border-b border-slate-800">
              <Layers className="w-3.5 h-3.5" />
              <span>Project: SonarDashboard</span>
            </div>
            <div className="space-y-1 text-slate-300 text-[10px]">
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span>📁</span> <span>CMakeLists.txt (Qt 6.6)</span>
              </div>
              <div className="flex items-center gap-1 pl-2 text-slate-400">
                <span>📄</span> <span>main.cpp (C++17 Core)</span>
              </div>
              <div className="flex items-center gap-1 pl-2 text-cyan-300 font-medium">
                <span>🎨</span> <span>MainDashboard.qml</span>
              </div>
            </div>
            <div className="pt-1.5 border-t border-slate-800 text-[9px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>CMake Configuration Succeeded</span>
            </div>
          </div>

          {/* 右ペイン: 立ち上がったネイティブGUIウィンドウ */}
          <div className="bg-gradient-to-b from-slate-900 to-[#02050c] p-2.5 rounded-xl border-2 border-emerald-500/40 text-center flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-[9px] text-slate-400 border-b border-slate-800 pb-1">
              <span className="font-bold text-slate-200">Qt 6.x Native Window</span>
              <span className="text-emerald-400 font-bold">PID: 48102</span>
            </div>

            <div className="py-2.5 space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
              <div className="text-xs font-black text-white">Hello Qt 6.6 GUI!</div>
              <div className="text-[10px] text-slate-400">WSLg Linux Native Window Running</div>
            </div>

            <button
              onClick={() => setClickCount(prev => prev + 1)}
              className="w-full py-1 rounded bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-[10px] shadow cursor-pointer active:scale-95 transition"
            >
              Test Click (Counts: {clickCount})
            </button>
          </div>
        </div>

        {/* 下部ステータスバー */}
        <div className="bg-[#02050c] rounded-lg px-3 py-1.5 text-[10px] text-slate-400 border border-slate-800 flex flex-wrap justify-between items-center gap-2">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
            Build: 0.4s (Ninja)
          </span>
          <span className="text-slate-300">Compiler: GCC 13.2 / C++17</span>
          <span className="text-cyan-400">Qt Event Loop Active</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 1. Ch.1: 第1章（完成形のイメージ共有：本格的な産業用HMIダッシュボード）
  // --------------------------------------------------------------------------
  if (chapterId === 1) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#040810] border-2 border-cyan-400/60 p-3 sm:p-4 flex flex-col justify-between font-mono shadow-[0_0_35px_rgba(8,145,178,0.25)] relative overflow-hidden select-none">
        {/* ウィンドウタイトルバー */}
        <div className="flex items-center justify-between border-b border-cyan-500/25 pb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-xs"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs"></div>
            <span className="text-xs text-cyan-200 font-bold ml-1.5 truncate">
              🎯 【本コース完成形】産業用リアルタイムHMIダッシュボード
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-bold">
              ● 60.0 FPS
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 font-bold hidden sm:inline-block">
              CPU: 12%
            </span>
          </div>
        </div>

        {/* メイン計器盤（左: 円形スピードメーター、右: オシロスコープ波形） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
          {/* 左側: アナログ＆デジタル複合タコメーター */}
          <div className="bg-gradient-to-b from-[#0a1224] to-[#040814] p-3 rounded-xl border border-cyan-500/30 flex flex-col items-center justify-center relative shadow-inner">
            <span className="absolute top-2 left-2 text-[10px] font-bold text-cyan-400 tracking-wider">
              MAIN THRUST (QML / Canvas)
            </span>
            <div className="relative mt-2">
              <svg viewBox="0 0 100 70" className="w-36 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                <path d="M 15 60 A 40 40 0 0 1 85 60" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                <path d="M 15 60 A 40 40 0 0 1 76 22" fill="none" stroke="url(#dashGrad)" strokeWidth="8" strokeLinecap="round" />
                <defs>
                  <linearGradient id="dashGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="60%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="60" r="4" fill="#22d3ee" />
                <line x1="50" y1="60" x2="72" y2="28" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <text x="50" y="52" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">142.5</text>
                <text x="50" y="62" fill="#94a3b8" fontSize="7" textAnchor="middle">RPM / kPa</text>
              </svg>
            </div>
            <div className="w-full flex justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span>Limit: 200 RPM</span>
              <span className="text-emerald-400 font-bold">STATE: NOMINAL</span>
            </div>
          </div>

          {/* 右側: リアルタイム信号オシロスコープ波形（Qt Graphs） */}
          <div className="bg-gradient-to-b from-[#0a1224] to-[#040814] p-3 rounded-xl border border-cyan-500/30 flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between text-[10px] font-bold text-cyan-400">
              <span>REALTIME SIGNAL (Qt Graphs)</span>
              <span className="text-emerald-400 text-[9px]">1000Hz STREAM</span>
            </div>

            <div className="flex-1 w-full bg-[#02050c] rounded-lg border border-cyan-500/20 my-2 relative overflow-hidden flex items-center justify-center p-1 min-h-[75px]">
              {/* グリッド背景 */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[length:14px_14px]"></div>
              
              <svg className="w-full h-full opacity-95 drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,50 Q10,15 20,50 T40,50 T60,50 T80,50 T100,50" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <animate attributeName="d" values="M0,50 Q10,15 20,50 T40,50 T60,50 T80,50 T100,50; M0,50 Q10,85 20,50 T40,50 T60,50 T80,50 T100,50; M0,50 Q10,15 20,50 T40,50 T60,50 T80,50 T100,50" dur="1.8s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>

            <div className="flex justify-between items-center text-[9px] text-slate-400">
              <span className="text-cyan-300">Buffer: 1024 samples (Zero-Copy)</span>
              <span className="text-emerald-400 font-bold">Latency: &lt; 1.5ms</span>
            </div>
          </div>
        </div>

        {/* 下部アーキテクチャステータスバー */}
        <div className="bg-[#02050c] rounded-lg px-3 py-1.5 text-[10px] text-slate-400 border border-slate-800 flex flex-wrap justify-between items-center gap-2">
          <span className="text-cyan-300 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            C++ Worker Thread: 1000Hz UDP
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            QML Render: 60fps VSync (No Freeze)
          </span>
          <span className="text-amber-400 font-bold">ALARM ENGINE: ACTIVE</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. Ch.2〜3: シグナル＆スロット・イベント駆動
  // --------------------------------------------------------------------------
  if (chapterId <= 3) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3 sm:p-4 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-xs text-cyan-300 font-bold">⚡ Signal &amp; Slot Architecture Monitor</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${lampOn ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'}`}>
            {lampOn ? '● SIGNAL RECEIVED' : '○ IDLE (WAITING)'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 my-4">
          <div className="bg-[#0a1224] p-3 rounded-xl border border-cyan-500/30 text-center space-y-2">
            <span className="text-[10px] text-cyan-400 font-bold block">1. C++ Backend</span>
            <button 
              onClick={() => setLampOn(true)}
              className="w-full px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white rounded-lg text-xs font-black shadow transition active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>emit alarmTriggered()</span>
            </button>
          </div>

          <div className="text-center text-cyan-400 text-sm font-bold flex flex-col items-center justify-center gap-0.5">
            <span className="text-[9px] text-slate-400">Qt Event Queue</span>
            <span>➔ ➔ ➔</span>
            <span className="text-[8px] text-emerald-400 font-mono">Thread-Safe</span>
          </div>

          <div className="bg-[#0a1224] p-3 rounded-xl border border-cyan-500/30 text-center space-y-2">
            <span className="text-[10px] text-emerald-400 font-bold block">2. QML Frontend</span>
            <div className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center transition-all ${lampOn ? 'bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.9)] animate-bounce' : 'bg-slate-800 text-slate-500'}`}>
              ⚡
            </div>
          </div>
        </div>

        <div className="text-[10px] text-slate-300 bg-[#02050c] p-2 rounded-lg border border-slate-800 flex justify-between items-center">
          <span className="text-cyan-400 font-mono">QObject::connect(sensor, &amp;Sensor::alarm, qmlRoot, &amp;QQuickItem::handleAlarm);</span>
          <span className="text-emerald-400 font-bold">Loose Coupling (疎結合)</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 3. Ch.4: Q_PROPERTY データバインディング
  // --------------------------------------------------------------------------
  if (chapterId === 4) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3 sm:p-4 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-xs text-cyan-300 font-bold">🎨 Q_PROPERTY Data Binding (Reactive GUI)</span>
          <span className="text-xs text-emerald-400 font-bold">Value: {sliderVal}</span>
        </div>

        <div className="space-y-4 my-3 bg-[#0a1224] p-3 rounded-xl border border-cyan-500/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
            <span className="text-cyan-400 font-bold text-xs">C++ Model Property (read/write):</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderVal} 
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full sm:w-56 accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>QML Reactive Progress Bar</span>
              <span className="text-cyan-300 font-bold font-mono">{sliderVal}% (Auto Update)</span>
            </div>
            <div className="w-full h-4 rounded-full bg-[#02050c] border border-cyan-500/30 overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 transition-all duration-100 rounded-full"
                style={{ width: `${sliderVal}%` }}
              />
            </div>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 bg-[#02050c] p-2 rounded-lg border border-slate-800 flex justify-between items-center">
          <span className="text-cyan-400">Q_PROPERTY(int value READ getValue WRITE setValue NOTIFY valueChanged)</span>
          <span className="text-emerald-400 font-bold">Zero UI Glue Code</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 4. Ch.5〜6: メーター・計器盤 (Gauge &amp; Dial)
  // --------------------------------------------------------------------------
  if (chapterId <= 6) {
    const angle = (sliderVal / 100) * 180 - 90;
    return (
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3 sm:p-4 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-xs text-cyan-300 font-bold">🏎️ Custom QQuickPaintedItem Tachometer</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
            Hardware 60 FPS
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 my-2">
          <div className="relative">
            <svg viewBox="0 0 100 65" className="w-44 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
              <path d="M 15 55 A 40 40 0 0 1 85 55" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
              <path d="M 15 55 A 40 40 0 0 1 85 55" fill="none" stroke="url(#tachGrad2)" strokeWidth="8" strokeLinecap="round" strokeDasharray="125" strokeDashoffset={125 - (125 * sliderVal) / 100} />
              <defs>
                <linearGradient id="tachGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="70%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="55" r="4" fill="#22d3ee" />
              <line 
                x1="50" 
                y1="55" 
                x2={50 + 32 * Math.sin((angle * Math.PI) / 180)} 
                y2={55 - 32 * Math.cos((angle * Math.PI) / 180)} 
                stroke="#ffffff" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              <text x="50" y="48" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">{sliderVal * 12}</text>
              <text x="50" y="58" fill="#64748b" fontSize="7" textAnchor="middle">RPM</text>
            </svg>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="text-xs text-slate-300">
              QPainter paint() コールバックによる超高速GPU直接描画
            </div>
            <button 
              onClick={() => setSliderVal(prev => (prev + 20) % 100)} 
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-md transition active:scale-95 cursor-pointer"
            >
              🚀 Accelerate (加速テスト)
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-400 bg-[#02050c] p-2 rounded-lg border border-slate-800">
          <span>Item: QQuickPaintedItem</span>
          <span className="text-cyan-400 font-bold">OpenGL Native Rendering</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 5. Ch.7〜8: リアルタイム波形描画 &amp; ソケット通信 (QUdpSocket)
  // --------------------------------------------------------------------------
  if (chapterId <= 8) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3 sm:p-4 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-xs text-cyan-300 font-bold">📡 QUdpSocket &amp; Qt Graphs Stream</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
            1000Hz Non-blocking
          </span>
        </div>

        <div className="flex-1 w-full bg-[#02050c] rounded-lg border border-cyan-500/20 my-3 relative overflow-hidden flex items-center justify-center p-2 min-h-[90px]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[length:14px_14px]"></div>
          <svg className="w-full h-full opacity-90 drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50" fill="none" stroke="#10b981" strokeWidth="2.5">
              <animate attributeName="d" values="M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50; M0,50 Q10,90 20,50 T40,50 T60,50 T80,50 T100,50; M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50" dur="1.4s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 bg-[#02050c] p-2 rounded-lg border border-slate-800">
          <div>Packet Loss: <span className="text-emerald-400 font-bold">0.00%</span></div>
          <div>Memory Management: <span className="text-cyan-400 font-bold">std::shared_ptr</span></div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 6. Ch.9〜10: マルチスレッド &amp; パフォーマンス最適化
  // --------------------------------------------------------------------------
  if (chapterId <= 10) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3 sm:p-4 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-xs text-cyan-300 font-bold">⚙️ Multithreading Architecture (QThread)</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
            UI Thread: No Freeze
          </span>
        </div>

        <div className="space-y-2.5 my-3">
          <div className="bg-[#0a1224] p-2.5 rounded-xl border border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-200 font-bold">Main GUI Thread (Event Loop)</span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
              60.0 FPS Steady
            </span>
          </div>

          <div className="bg-[#0a1224] p-2.5 rounded-xl border border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="text-xs text-slate-200 font-bold">Worker Thread (UDP Parsing &amp; FFT)</span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-bold">
              1000 Packets/sec
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-400 bg-[#02050c] p-2 rounded-lg border border-slate-800">
          <span>CTest Unit Tests: <span className="text-emerald-400 font-bold">14/14 PASS</span></span>
          <span className="text-cyan-400 font-bold">Valgrind Leak: 0 bytes</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 7. Ch.11〜12: 完成形統合ダッシュボード
  // --------------------------------------------------------------------------
  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#040810] border-2 border-cyan-400/60 p-3 sm:p-4 flex flex-col justify-between font-mono shadow-[0_0_35px_rgba(8,145,178,0.25)] relative overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs text-cyan-200 font-bold">🚀 FINAL INTEGRATED PRODUCTION HMI</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-emerald-400 font-bold">60 FPS</span>
          <span className="text-cyan-300 font-bold">ALL SYSTEMS NOMINAL</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 my-3">
        <div className="bg-[#0a1224] rounded-xl p-3 border border-cyan-500/30 flex flex-col items-center justify-center">
          <span className="text-[9px] text-cyan-400 font-bold">MAIN SYSTEM PRESSURE</span>
          <div className="text-xl font-black text-white mt-1">842.0 <span className="text-xs text-cyan-400 font-normal">kPa</span></div>
          <div className="w-full h-2 bg-[#02050c] rounded-full mt-2 overflow-hidden border border-cyan-500/20">
            <div className="w-4/5 h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"></div>
          </div>
        </div>

        <div className="bg-[#0a1224] rounded-xl p-3 border border-cyan-500/30 flex flex-col items-center justify-center">
          <span className="text-[9px] text-cyan-400 font-bold">SONAR STREAM (60Hz)</span>
          <svg className="w-full h-9 mt-1" viewBox="0 0 50 20" preserveAspectRatio="none">
            <path d="M0,10 Q5,2 10,10 T20,10 T30,10 T40,10 T50,10" fill="none" stroke="#10b981" strokeWidth="2">
              <animate attributeName="d" values="M0,10 Q5,2 10,10 T20,10 T30,10 T40,10 T50,10; M0,10 Q5,18 10,10 T20,10 T30,10 T40,10 T50,10; M0,10 Q5,2 10,10 T20,10 T30,10 T40,10 T50,10" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#02050c] p-2 rounded-lg border border-slate-800 text-[10px]">
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" /> All Systems Operational (No Warning)
        </span>
        <span className="text-cyan-400 font-bold">linuxdeployqt Ready</span>
      </div>
    </div>
  );
};

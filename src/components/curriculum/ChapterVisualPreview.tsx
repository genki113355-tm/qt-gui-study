import React, { useState, useEffect } from 'react';
import { Activity, Cpu, AlertTriangle, Radio } from 'lucide-react';

interface ChapterVisualPreviewProps {
  chapterId: number;
  slug: string;
}

export const ChapterVisualPreview: React.FC<ChapterVisualPreviewProps> = ({ chapterId }) => {
  const [sliderVal, setSliderVal] = useState<number>(65);

  const [lampOn, setLampOn] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLampOn(prev => !prev);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // 1. Ch.0〜1: 基本ウィンドウと環境
  if (chapterId <= 1) {
    return (
      <div className="w-full lg:w-96 h-56 rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden group select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
            <span className="text-[10px] text-slate-400 font-bold ml-1">Qt 6.x Window (Ubuntu 24.04)</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-400">WSL2 / Native</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-2 text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div className="text-xs font-bold text-slate-200">Industrial HMI Target Window</div>
          <div className="text-[10px] text-slate-400">CMake ＋ Modern C++20 ＋ QML</div>
        </div>
        <div className="bg-slate-950/80 rounded px-2.5 py-1 text-[10px] text-emerald-400 border border-slate-800 flex justify-between">
          <span>Engine: Ready</span>
          <span>OpenGL: Active</span>
        </div>
      </div>
    );
  }

  // 2. Ch.2〜3: シグナル＆スロット・イベント
  if (chapterId <= 3) {
    return (
      <div className="w-full lg:w-96 h-56 rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3.5 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-[10px] text-cyan-400 font-bold">Signal & Slot Monitor</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${lampOn ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'}`}>
            {lampOn ? '● SIGNAL RECEIVED' : '○ IDLE'}
          </span>
        </div>
        <div className="flex items-center justify-around my-auto">
          <div className="text-center space-y-1">
            <span className="text-[9px] text-slate-500">C++ Backend</span>
            <button 
              onClick={() => setLampOn(true)}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold shadow transition active:scale-95 flex items-center gap-1"
            >
              <Radio className="w-3 h-3" /> emit signal
            </button>
          </div>
          <div className="text-cyan-500/40 text-lg">➔</div>
          <div className="text-center space-y-1">
            <span className="text-[9px] text-slate-500">QML Frontend</span>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center transition-all ${lampOn ? 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'bg-slate-800 text-slate-600'}`}>
              ⚡
            </div>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 bg-slate-950/60 p-1.5 rounded border border-slate-800">
          QObject::connect(sender, &amp;Signal, receiver, &amp;Slot);
        </div>
      </div>
    );
  }

  // 3. Ch.4: Q_PROPERTY データバインディング
  if (chapterId === 4) {
    return (
      <div className="w-full lg:w-96 h-56 rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3.5 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-[10px] text-cyan-400 font-bold">Q_PROPERTY Data Binding</span>
          <span className="text-[10px] text-cyan-300 font-bold">Value: {sliderVal}</span>
        </div>
        <div className="space-y-3 my-auto">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 text-[10px]">C++ Property:</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderVal} 
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-40 accent-cyan-400 cursor-pointer"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>QML Reactive Progress</span>
              <span className="text-cyan-400 font-bold">{sliderVal}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 border border-cyan-500/20 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-100 rounded-full"
                style={{ width: `${sliderVal}%` }}
              />
            </div>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 bg-slate-950/60 p-1.5 rounded border border-slate-800 flex justify-between">
          <span>READ getVal</span>
          <span>NOTIFY valChanged</span>
        </div>
      </div>
    );
  }

  // 4. Ch.5〜6: メーター・計器盤 (Gauge & Dial)
  if (chapterId <= 6) {
    const angle = (sliderVal / 100) * 180 - 90;
    return (
      <div className="w-full lg:w-96 h-56 rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
          <span className="text-[10px] text-cyan-400 font-bold">Analog Tachometer HMI</span>
          <span className="text-[10px] text-emerald-400 font-bold">60 FPS</span>
        </div>
        <div className="flex items-center justify-center my-auto relative">
          <svg viewBox="0 0 100 65" className="w-44 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <path d="M 15 55 A 40 40 0 0 1 85 55" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
            <path d="M 15 55 A 40 40 0 0 1 85 55" fill="none" stroke="url(#tachGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="125" strokeDashoffset={125 - (125 * sliderVal) / 100} />
            <defs>
              <linearGradient id="tachGrad" x1="0%" y1="0%" x2="100%" y2="0%">
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
            <text x="50" y="48" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">{sliderVal * 12}</text>
            <text x="50" y="58" fill="#64748b" fontSize="7" textAnchor="middle">RPM</text>
          </svg>
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-400 bg-slate-950/60 p-1.5 rounded border border-slate-800">
          <span>QQuickPaintedItem / Canvas</span>
          <button 
            onClick={() => setSliderVal(prev => (prev + 15) % 100)} 
            className="text-cyan-400 hover:text-cyan-300 font-bold"
          >
            加速 [Accelerate]
          </button>
        </div>
      </div>
    );
  }

  // 5. Ch.7〜8: リアルタイム波形描画 (Qt Graphs / QCustomPlot)
  if (chapterId <= 8) {
    return (
      <div className="w-full lg:w-96 h-56 rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
          <span className="text-[10px] text-cyan-400 font-bold">Oscilloscope Signal Waveform</span>
          <span className="text-[10px] text-emerald-400 font-bold">Qt Graphs 60Hz</span>
        </div>
        <div className="flex-1 w-full bg-[#02050c] rounded-lg border border-cyan-500/20 my-2 relative overflow-hidden flex items-center justify-center p-1">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[length:12px_12px]"></div>
          <svg className="w-full h-full opacity-90 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50" fill="none" stroke="#10b981" strokeWidth="2">
              <animate attributeName="d" values="M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50; M0,50 Q10,90 20,50 T40,50 T60,50 T80,50 T100,50; M0,50 Q10,10 20,50 T40,50 T60,50 T80,50 T100,50" dur="1.5s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-400 bg-slate-950/60 p-1.5 rounded border border-slate-800">
          <span>Buffer: 1024 samples</span>
          <span>Latency: &lt; 2ms</span>
        </div>
      </div>
    );
  }

  // 6. Ch.9〜10: マルチスレッド & パフォーマンス最適化
  if (chapterId <= 10) {
    return (
      <div className="w-full lg:w-96 h-56 rounded-2xl bg-[#040810] border-2 border-cyan-500/40 p-3.5 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-[10px] text-cyan-400 font-bold">Multithreading (QThread)</span>
          <span className="text-[10px] text-emerald-400 font-bold">UI Thread: No Freeze</span>
        </div>
        <div className="space-y-3 my-auto">
          <div className="bg-slate-900/60 p-2 rounded border border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-200">Main GUI Thread</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">60.0 FPS</span>
          </div>
          <div className="bg-slate-900/60 p-2 rounded border border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="text-xs text-slate-200">Worker Thread (Heavy I/O)</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-bold">Processing...</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 bg-slate-950/60 p-1.5 rounded border border-slate-800 flex justify-between">
          <span>QThreadPool / moveToThread</span>
          <span>Zero Memory Leak</span>
        </div>
      </div>
    );
  }

  // 7. Ch.11〜12: 完成形統合ダッシュボード
  return (
    <div className="w-full lg:w-96 h-56 rounded-2xl bg-[#040810] border-2 border-cyan-500/50 p-2.5 flex flex-col justify-between font-mono shadow-[0_0_30px_rgba(6,182,212,0.2)] relative overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] text-cyan-300 font-bold">FINAL INTEGRATED HMI</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-slate-400">
          <span className="text-emerald-400">60 FPS</span>
          <span className="text-amber-400">NORMAL</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 my-auto">
        <div className="bg-slate-900/80 rounded-lg p-1.5 border border-cyan-500/20 flex flex-col items-center justify-center">
          <span className="text-[8px] text-slate-400">MAIN PRESSURE</span>
          <div className="text-lg font-black text-white mt-0.5">842 <span className="text-[9px] text-cyan-400 font-normal">kPa</span></div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full mt-1 overflow-hidden">
            <div className="w-4/5 h-full bg-cyan-400 rounded-full"></div>
          </div>
        </div>
        <div className="bg-slate-900/80 rounded-lg p-1.5 border border-cyan-500/20 flex flex-col items-center justify-center">
          <span className="text-[8px] text-slate-400">SENSOR SIGNAL</span>
          <svg className="w-full h-7 mt-0.5" viewBox="0 0 50 20" preserveAspectRatio="none">
            <path d="M0,10 Q5,2 10,10 T20,10 T30,10 T40,10 T50,10" fill="none" stroke="#10b981" strokeWidth="1.5">
              <animate attributeName="d" values="M0,10 Q5,2 10,10 T20,10 T30,10 T40,10 T50,10; M0,10 Q5,18 10,10 T20,10 T30,10 T40,10 T50,10; M0,10 Q5,2 10,10 T20,10 T30,10 T40,10 T50,10" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </div>
      <div className="flex justify-between items-center bg-slate-950 p-1.5 rounded border border-slate-800 text-[9px]">
        <span className="text-slate-400 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-emerald-400" /> All Systems Operational
        </span>
        <span className="text-cyan-400 font-bold">Linux Production Ready</span>
      </div>
    </div>
  );
};

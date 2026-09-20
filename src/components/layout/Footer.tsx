import React, { useState } from 'react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { Shield, Cpu, Waves } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);

  return (
    <>
      <footer className="border-t border-slate-800 bg-[#070b14] py-10 text-center text-sm text-slate-400 font-mono">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-300 font-semibold flex-wrap">
            <span>◆ 運営・技術：シロクマQt×C++ラボ</span>
            <span>•</span>
            <span className="text-slate-400 font-normal">〜Linuxで動くリアルタイム計器・GUI開発〜</span>
          </div>

          {/* 姉妹メディア・相互リンク */}
          <div className="pt-5 pb-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* リンク1: シロクマC++ラボ */}
            <a
              href="https://www.shirokuma-cpp.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0f1522] hover:bg-[#131b2c] border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#0a0f18] border border-slate-700/50 flex items-center justify-center text-xl flex-shrink-0">
                  👾
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <span className="text-[9px] tracking-wider font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-400 border border-slate-700/50">
                      SISTER SITE
                    </span>
                  </div>
                  <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition text-sm font-sans truncate block">
                    シロクマC++ラボ
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5 truncate">
                    ゲーム開発で学ぶC++設計
                  </p>
                </div>
              </div>
            </a>

            {/* リンク2: シロクマC++自動化ラボ */}
            <a
              href="https://shirokuma-auto-cpp.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0f1522] hover:bg-[#131b2c] border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#0a0f18] border border-slate-700/50 flex items-center justify-center text-xl flex-shrink-0">
                  ⚡
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <span className="text-[9px] tracking-wider font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-400 border border-slate-700/50">
                      SISTER SITE
                    </span>
                  </div>
                  <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition text-sm font-sans truncate block">
                    シロクマC++自動化ラボ
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5 truncate">
                    Docker / pybind11 / 自動評価
                  </p>
                </div>
              </div>
            </a>

            {/* リンク3: 水中音響・ソナー */}
            <a
              href="https://sonar-guide.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0f1522] hover:bg-[#131b2c] border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#0a0f18] border border-slate-700/50 flex items-center justify-center text-xl flex-shrink-0">
                  🌊
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <span className="text-[9px] tracking-wider font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-400 border border-slate-700/50">
                      SISTER SITE
                    </span>
                  </div>
                  <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition text-sm font-sans truncate block">
                    水中音響・ソナー入門
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5 truncate">
                    波の物理 / FFT / 音響解析
                  </p>
                </div>
              </div>
            </a>

          </div>

          {/* 運営体制・技術監修 */}
          <div className="pt-2 pb-1 max-w-2xl mx-auto text-xs text-slate-400 font-sans space-y-1.5">
            <div className="flex items-center justify-center gap-2 text-slate-300 font-semibold flex-wrap">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[11px] font-mono">
                技術監修・品質保証
              </span>
              <span>シロクマQt×C++ラボ 技術編集部</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
              現役C++ソフトウェアエンジニア（組込み制御・システム開発実務経験）が全カリキュラムを設計・監修。<br className="hidden sm:inline" />
              Linux環境でのHMI・計器ソフトウェア開発のノウハウを体系化。Qt/QML/C++によるマルチスレッドとリアルタイム描画の実践知識を提供します。
            </p>
          </div>

          {/* プライバシーポリシー */}
          <div className="pt-4 flex items-center justify-center gap-4 text-xs font-sans">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-slate-400 hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>プライバシーポリシー ＆ 技術監修・免責事項</span>
            </button>
          </div>

          <p className="text-slate-500 flex items-center justify-center gap-1 text-xs pt-4 font-mono">
            <span>© 2026 シロクマQt×C++ラボ (shirokuma-qt-cpp.jp). All rights reserved.</span>
          </p>
        </div>
      </footer>

      {/* プライバシーポリシーモーダル */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </>
  );
};

import React, { useState } from 'react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);

  return (
    <>
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/75 dark:bg-[#070b14]/90 backdrop-blur-md py-10 text-center text-sm text-slate-600 dark:text-slate-400 font-mono transition-colors">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-800 dark:text-slate-300 font-semibold flex-wrap">
            <span>◆ 運営・技術：シロクマQt×C++ラボ</span>
            <span>•</span>
            <span className="text-slate-500 dark:text-slate-400 font-normal">〜Linuxで動くリアルタイム計器・GUI開発〜</span>
          </div>

          {/* 総合ポータル ＆ 姉妹メディア・相互リンク */}
          <div className="pt-5 pb-2 max-w-5xl mx-auto space-y-4">
            
            {/* 総合ポータルバナー */}
            <a
              href="https://shirokuma-tech.jp/"
              className="group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-sky-50/90 via-cyan-50/80 to-blue-50/90 dark:from-[#0a1526] dark:via-[#0b1b33] dark:to-[#071324] border border-cyan-300/80 dark:border-cyan-500/40 hover:border-cyan-400 dark:hover:border-cyan-300 transition-all duration-300 shadow-sm dark:shadow-xl hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex items-center -space-x-2 bg-white/90 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-cyan-300 dark:border-cyan-500/40 shadow-inner flex-shrink-0">
                  <img src="/images/characters/shirokuma_sensei.png" alt="シロクマ先生" className="w-8 h-8 rounded-full object-cover border border-cyan-400 shadow-sm" />
                  <img src="/images/characters/penguin_student.jpg" alt="ペンギン生徒" className="w-8 h-8 rounded-full object-cover border border-amber-400 shadow-sm" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40">
                      CAMPUS PORTAL
                    </span>
                    <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400">shirokuma-tech.jp</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition text-sm sm:text-base font-sans mt-0.5 block">
                    シロクマ技術総合ポータル（全ラボの学習記録を集約）
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-0.5">
                    C++設計・開発自動化・Qt GUI・ソナー音響・Linux/Git・ネスペ・組込みES・AIパスポートの総合学習プラットフォーム
                  </p>
                </div>
              </div>
              <span className="text-cyan-700 dark:text-cyan-400 text-sm font-bold font-mono group-hover:translate-x-1 transition hidden sm:inline-block">
                キャンバストップ ➔
              </span>
            </a>

            {/* 8つの専門ラボカード */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* リンク1: シロクマC++ラボ */}
              <a
                href="/cpp/"
                className="group flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 dark:bg-[#0f1522] hover:bg-cyan-50/50 dark:hover:bg-[#131b2c] border border-slate-200 dark:border-slate-800 hover:border-cyan-400/60 dark:hover:border-cyan-500/30 transition-all duration-300 shadow-sm dark:shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#0a0f18] border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-lg flex-shrink-0">
                    👾
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-xs tracking-wider font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-cyan-700 dark:text-cyan-400 border border-slate-200 dark:border-slate-700/50">
                        C++
                      </span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition text-xs font-sans truncate block">
                      シロクマC++ラボ
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 truncate">
                      ゲームで学ぶC++設計
                    </p>
                  </div>
                </div>
              </a>

              {/* リンク2: シロクマC++自動化ラボ */}
              <a
                href="/auto/"
                className="group flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 dark:bg-[#0f1522] hover:bg-amber-50/50 dark:hover:bg-[#131b2c] border border-slate-200 dark:border-slate-800 hover:border-amber-400/60 dark:hover:border-amber-500/30 transition-all duration-300 shadow-sm dark:shadow-lg hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#0a0f18] border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-lg flex-shrink-0">
                    ⚡
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-xs tracking-wider font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-amber-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700/50">
                        AUTO
                      </span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition text-xs font-sans truncate block">
                      シロクマC++自動化ラボ
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 truncate">
                      Docker / CI / 自動評価
                    </p>
                  </div>
                </div>
              </a>

              {/* リンク3: 水中音響・ソナー入門 */}
              <a
                href="/sonar/"
                className="group flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 dark:bg-[#0f1522] hover:bg-blue-50/50 dark:hover:bg-[#131b2c] border border-slate-200 dark:border-slate-800 hover:border-blue-400/60 dark:hover:border-blue-500/30 transition-all duration-300 shadow-sm dark:shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#0a0f18] border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-lg flex-shrink-0">
                    🌊
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-xs tracking-wider font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-blue-700 dark:text-blue-400 border border-slate-200 dark:border-slate-700/50">
                        SONAR
                      </span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition text-xs font-sans truncate block">
                      水中音響・ソナー入門
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 truncate">
                      波の物理 / FFT / 解析
                    </p>
                  </div>
                </div>
              </a>

              {/* リンク4: 水中音響 ADVANCED */}
              <a
                href="/sonar-tech/"
                className="group flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 dark:bg-[#0f1522] hover:bg-cyan-50/50 dark:hover:bg-[#131b2c] border border-slate-200 dark:border-slate-800 hover:border-cyan-400/60 dark:hover:border-cyan-500/30 transition-all duration-300 shadow-sm dark:shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#0a0f18] border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-lg flex-shrink-0">
                    🐬
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-xs tracking-wider font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-cyan-700 dark:text-cyan-400 border border-slate-200 dark:border-slate-700/50">
                        SONAR ADV
                      </span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition text-xs font-sans truncate block">
                      水中音響 ADVANCED
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 truncate">
                      数理物理 / 空間フィルタ / MVDR
                    </p>
                  </div>
                </div>
              </a>

              {/* リンク5: Linux・Git実践ラボ */}
              <a
                href="/linux/"
                className="group flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 dark:bg-[#0f1522] hover:bg-orange-50/50 dark:hover:bg-[#131b2c] border border-slate-200 dark:border-slate-800 hover:border-orange-400/60 dark:hover:border-orange-500/30 transition-all duration-300 shadow-sm dark:shadow-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#0a0f18] border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-lg flex-shrink-0">
                    🐧
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-xs tracking-wider font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-orange-700 dark:text-orange-400 border border-slate-200 dark:border-slate-700/50">
                        LINUX
                      </span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition text-xs font-sans truncate block">
                      Linux・Git実践ラボ
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 truncate">
                      LinuC &amp; Git実践マスター
                    </p>
                  </div>
                </div>
              </a>

              {/* リンク6: ネスペ直前対策ナビ */}
              <a
                href="/nw/"
                className="group flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 dark:bg-[#0f1522] hover:bg-sky-50/50 dark:hover:bg-[#131b2c] border border-slate-200 dark:border-slate-800 hover:border-sky-400/60 dark:hover:border-sky-500/30 transition-all duration-300 shadow-sm dark:shadow-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#0a0f18] border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-lg flex-shrink-0">
                    🌐
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-xs tracking-wider font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-sky-700 dark:text-sky-400 border border-slate-200 dark:border-slate-700/50">
                        NW
                      </span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition text-xs font-sans truncate block">
                      ネスペ直前対策ナビ
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 truncate">
                      午後記述 / DNS / 要点まとめ
                    </p>
                  </div>
                </div>
              </a>

              {/* リンク7: 組込みES対策ラボ */}
              <a
                href="/es/"
                className="group flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 dark:bg-[#0f1522] hover:bg-teal-50/50 dark:hover:bg-[#131b2c] border border-slate-200 dark:border-slate-800 hover:border-teal-400/60 dark:hover:border-teal-500/30 transition-all duration-300 shadow-sm dark:shadow-lg hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#0a0f18] border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-lg flex-shrink-0">
                    💾
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-xs tracking-wider font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-teal-700 dark:text-teal-400 border border-slate-200 dark:border-slate-700/50">
                        ES
                      </span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition text-xs font-sans truncate block">
                      組込みES対策ラボ
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 truncate">
                      組込みスペシャリスト合格戦略
                    </p>
                  </div>
                </div>
              </a>

              {/* リンク8: AIパスポートラボ */}
              <a
                href="/ai-passport/"
                className="group flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 dark:bg-[#0f1522] hover:bg-cyan-50/50 dark:hover:bg-[#131b2c] border border-slate-200 dark:border-slate-800 hover:border-cyan-400/60 dark:hover:border-cyan-500/30 transition-all duration-300 shadow-sm dark:shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#0a0f18] border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-lg flex-shrink-0">
                    🤖
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-xs tracking-wider font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-cyan-700 dark:text-cyan-400 border border-slate-200 dark:border-slate-700/50">
                        AI
                      </span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition text-xs font-sans truncate block">
                      AIパスポートラボ
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 truncate">
                      生成AIシラバス / 400問演習
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* 運営体制・技術監修 */}
          <div className="pt-2 pb-1 max-w-2xl mx-auto text-xs text-slate-600 dark:text-slate-400 font-sans space-y-1.5">
            <div className="flex items-center justify-center gap-2 text-slate-800 dark:text-slate-300 font-semibold flex-wrap">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 border border-slate-300 dark:border-slate-700 text-xs font-mono">
                技術監修・品質保証
              </span>
              <span>シロクマQt×C++ラボ 技術編集部</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
              現役C++ソフトウェアエンジニア（組込み制御・システム開発実務経験）が全カリキュラムを設計・監修。<br className="hidden sm:inline" />
              Linux環境でのHMI・計器ソフトウェア開発のノウハウを体系化。Qt/QML/C++によるマルチスレッドとリアルタイム描画の実践知識を提供します。
            </p>
          </div>

          {/* プライバシーポリシー */}
          <div className="pt-4 flex items-center justify-center gap-4 text-xs font-sans">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>プライバシーポリシー ＆ 技術監修・免責事項</span>
            </button>
          </div>

          <p className="text-slate-500 flex items-center justify-center gap-1 text-xs pt-4 font-mono">
            <span>© 2026 シロクマQt×C++ラボ (shirokuma-tech.jp/qt). All rights reserved.</span>
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


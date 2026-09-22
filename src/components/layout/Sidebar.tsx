import React from 'react';
import { X } from 'lucide-react';
import { ALL_CHAPTERS } from '../../data/chapters';

interface SidebarProps {
  currentChapterSlug: string;
  onSelectChapter: (slug: string) => void;
  isOpen: boolean;
  onClose: () => void;
  completedChapters: number[];
  onToggleComplete: (id: number) => void;
  onOpenMilestoneModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentChapterSlug,
  onSelectChapter,
  isOpen,
  onClose,
  // completedChapters,
  // onToggleComplete,
  // onOpenMilestoneModal
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 max-w-[85vw] bg-[#0a0f18] border-r border-slate-800/60 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/60 bg-gradient-to-r from-[#0d121c] to-[#0a0f18]">
          <span className="font-sans font-bold text-slate-100 flex items-center gap-2">
            <img src="/images/characters/shirokuma_sensei.png" alt="シロクマ先生" className="w-6 h-6 rounded-full object-cover border border-cyan-400/50 shadow inline-block" />
            <span>シロクマQt×C++ラボ</span>
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white lg:hidden transition-colors"
            aria-label="メニューを閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar flex flex-col justify-between">
          
          <div>
            <div className="px-4 mb-2 mt-2">
              <button
                onClick={() => {
                  onSelectChapter('top');
                  onClose();
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-3 ${
                  currentChapterSlug === 'top'
                    ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                サイトTOPへ戻る
              </button>
            </div>
            <div className="px-4 mb-4 mt-2">

              <div className="text-xs font-bold text-cyan-500/80 uppercase tracking-wider mb-2 px-2">カリキュラム</div>
              <ul className="space-y-1">
                {ALL_CHAPTERS.map(ch => (
                  <li key={ch.id}>
                    <button
                      onClick={() => {
                        onSelectChapter(ch.slug);
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex flex-col gap-1 ${
                        currentChapterSlug === ch.slug
                          ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-slate-500">CHAPTER {ch.id}</span>
                      <span className="font-bold line-clamp-2 leading-snug">{ch.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 総合ポータル ＆ 姉妹メディア・相互リンク */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 space-y-2 mt-4">
            <div className="text-[10px] font-mono text-slate-400 font-bold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span>🔗</span>
                <span>技術学習エコシステム</span>
              </span>
            </div>

            {/* 0. 総合トップ */}
            <a
              href="/"
              className="group flex items-center justify-between p-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400/60 transition shadow-sm"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🏛️</span>
                  <div className="text-xs font-bold text-cyan-300 group-hover:text-white font-sans truncate">
                    総合ポータル
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate font-sans">
                  全4ラボの学習記録を集約
                </div>
              </div>
              <span className="text-xs text-cyan-400 group-hover:text-white font-mono flex-shrink-0">
                ➔
              </span>
            </a>

            {/* 1. シロクマC++ラボ */}
            <a
              href="/cpp/"
              className="group flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 transition shadow-sm"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">👾</span>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 font-sans truncate">
                    シロクマC++ラボ
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate font-sans">
                  ゲーム開発で学ぶC++設計
                </div>
              </div>
              <span className="text-xs text-slate-500 group-hover:text-cyan-400 font-mono flex-shrink-0">
                ↗
              </span>
            </a>

            {/* 2. シロクマC++自動化ラボ */}
            <a
              href="/auto/"
              className="group flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 transition shadow-sm"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">⚡</span>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 font-sans truncate">
                    シロクマC++自動化ラボ
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate font-sans">
                  Docker / pybind11 / 自動評価
                </div>
              </div>
              <span className="text-xs text-slate-500 group-hover:text-amber-400 font-mono flex-shrink-0">
                ↗
              </span>
            </a>

            {/* 3. 水中音響・ソナー技術入門 */}
            <a
              href="/sonar/"
              className="group flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 transition shadow-sm"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🌊</span>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-blue-300 font-sans truncate">
                    水中音響・ソナー入門
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate font-sans">
                  波の物理 / FFT / 音響解析
                </div>
              </div>
              <span className="text-xs text-slate-500 group-hover:text-blue-400 font-mono flex-shrink-0">
                ↗
              </span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};


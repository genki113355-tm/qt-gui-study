import React from 'react';
import { X } from 'lucide-react';
import { ALL_CHAPTERS } from '../../data/chapters';
import { ThemeToggle } from '../common/ThemeToggle';

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
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 z-30 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 max-w-[85vw] bg-white/95 dark:bg-[#0a0f18] text-slate-800 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800/60 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col shadow-xl lg:shadow-none`}
      >
        {/* サイドバーヘッダー */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 dark:border-slate-800/60 bg-gradient-to-r from-sky-50/80 to-white dark:from-[#0d121c] dark:to-[#0a0f18]">
          <span className="font-sans font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <img
              src="/images/characters/shirokuma_sensei.png"
              alt="シロクマ先生"
              className="w-7 h-7 rounded-full object-cover border border-sky-400/50 shadow-xs inline-block"
            />
            <span className="text-sm">シロクマQt×C++ラボ</span>
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white lg:hidden transition-colors"
            aria-label="メニューを閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* スクロールエリア */}
        <div className="flex-1 overflow-y-auto py-3 custom-scrollbar flex flex-col justify-between">
          <div>
            {/* モバイル用 テーマ切り替え & TOPリンク */}
            <div className="px-3 mb-3 flex items-center justify-between gap-2 lg:hidden">
              <button
                onClick={() => {
                  onSelectChapter('top');
                  onClose();
                }}
                className={`flex-1 text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  currentChapterSlug === 'top'
                    ? 'bg-sky-100 dark:bg-cyan-950/60 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>🏠</span>
                <span>サイトTOP</span>
              </button>
              <ThemeToggle showLabel={false} />
            </div>

            {/* PC用 TOPリンク */}
            <div className="px-3 mb-3 hidden lg:block">
              <button
                onClick={() => {
                  onSelectChapter('top');
                  onClose();
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 ${
                  currentChapterSlug === 'top'
                    ? 'bg-sky-100 dark:bg-cyan-950/60 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/40 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>🏠</span>
                <span>サイトTOPへ戻る</span>
              </button>
            </div>

            {/* カリキュラム章一覧 */}
            <div className="px-3 mb-4">
              <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-cyan-400/90 uppercase tracking-wider mb-2 px-2">
                カリキュラム一覧
              </div>
              <ul className="space-y-1">
                {ALL_CHAPTERS.map((ch) => (
                  <li key={ch.id}>
                    <button
                      onClick={() => {
                        onSelectChapter(ch.slug);
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm transition-all flex flex-col gap-1 cursor-pointer ${
                        currentChapterSlug === ch.slug
                          ? 'bg-sky-100/90 dark:bg-cyan-950/60 text-sky-900 dark:text-cyan-200 border border-sky-300 dark:border-cyan-500/40 shadow-xs font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:text-sky-700 dark:hover:text-white hover:bg-sky-50/70 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {ch.id === 0 ? (
                        <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                          <span>🔰</span>
                          <span>準備編（環境構築）</span>
                        </span>
                      ) : (
                        <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                          CHAPTER {ch.id}
                        </span>
                      )}
                      <span className="line-clamp-2 leading-snug">{ch.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 総合ポータル ＆ 姉妹メディア・相互リンク */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 space-y-2 mt-2">
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span>🔗</span>
                <span>技術学習エコシステム</span>
              </span>
            </div>

            {/* 0. 総合トップ */}
            <a
              href="/"
              className="group flex items-center justify-between p-2 rounded-xl bg-sky-100/60 dark:bg-cyan-950/40 hover:bg-sky-100 dark:hover:bg-cyan-900/50 border border-sky-200 dark:border-cyan-500/30 transition shadow-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🏛️</span>
                  <div className="text-xs font-bold text-sky-800 dark:text-cyan-300 group-hover:text-sky-950 dark:group-hover:text-white font-sans truncate">
                    総合ポータル
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate font-sans">
                  全4ラボの学習記録を集約
                </div>
              </div>
              <span className="text-xs text-sky-600 dark:text-cyan-400 font-mono flex-shrink-0">➔</span>
            </a>

            {/* 1. シロクマC++ラボ */}
            <a
              href="/cpp/"
              className="group flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-cyan-500/40 transition shadow-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">👾</span>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-cyan-300 font-sans truncate">
                    シロクマC++ラボ
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate font-sans">
                  ゲーム開発で学ぶC++設計
                </div>
              </div>
              <span className="text-xs text-slate-400 group-hover:text-sky-500 dark:group-hover:text-cyan-400 font-mono flex-shrink-0">↗</span>
            </a>

            {/* 2. シロクマC++自動化ラボ */}
            <a
              href="/auto/"
              className="group flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-amber-50/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-500/40 transition shadow-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">⚡</span>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-300 font-sans truncate">
                    シロクマC++自動化ラボ
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate font-sans">
                  Docker / pybind11 / 自動評価
                </div>
              </div>
              <span className="text-xs text-slate-400 group-hover:text-amber-500 dark:group-hover:text-amber-400 font-mono flex-shrink-0">↗</span>
            </a>

            {/* 3. 水中音響・ソナー技術入門 */}
            <a
              href="/sonar/"
              className="group flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-blue-50/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/40 transition shadow-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🌊</span>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 font-sans truncate">
                    水中音響・ソナー入門
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate font-sans">
                  波の物理 / FFT / 音響解析
                </div>
              </div>
              <span className="text-xs text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 font-mono flex-shrink-0">↗</span>
            </a>
          </div>

          {/* キャラクター紹介（シロクマ先生 & ペンギン生徒） */}
          <div className="border-t border-slate-200 dark:border-cyan-500/20 p-3.5 pb-5 bg-sky-50/60 dark:bg-[#080d1a]/80 space-y-2.5 shrink-0 mt-1">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/characters/shirokuma_sensei.png"
                alt="シロクマ先生"
                className="w-9 h-9 rounded-full border border-sky-400 dark:border-cyan-500 object-cover shadow-xs"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mb-0.5">
                  シロクマ先生
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  シニアアーキテクト
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <img
                src="/images/characters/penguin_student.jpg"
                alt="ペンギン生徒"
                className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-600 object-cover shadow-xs"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mb-0.5">
                  ペンギン生徒
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  新米エンジニア
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

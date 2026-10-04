import React from 'react';
import { ThemeToggle } from '../common/ThemeToggle';
import { Home, Menu, Code2, Terminal } from 'lucide-react';

interface NavbarProps {
  currentChapterId: number;
  onSelectChapter: (slug: string) => void;
  onToggleSidebar: () => void;
  onOpenSourceModal: () => void;
  onOpenPlaygroundModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectChapter,
  onToggleSidebar,
  onOpenSourceModal,
  onOpenPlaygroundModal,
}) => {
  return (
    <header className="h-14 bg-white/85 dark:bg-[#0a0f18]/95 backdrop-blur-md border-b border-slate-200 dark:border-cyan-500/20 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-50 transition-colors duration-300 shadow-sm">
      {/* 左エリア：サイドバー開閉 ＆ TOPボタン ＆ サイトタイトル */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-400 lg:hidden rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          aria-label="メニューを開く"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={() => onSelectChapter('top')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-cyan-950/50 border border-sky-200 dark:border-cyan-500/30 text-sky-700 dark:text-cyan-300 hover:bg-sky-100 dark:hover:bg-cyan-900/60 transition-all font-mono font-bold text-xs sm:text-sm shadow-xs cursor-pointer active:scale-95"
          aria-label="トップページへ戻る"
        >
          <Home className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
          <span>TOP</span>
        </button>

        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <img
            src="/images/characters/shirokuma_sensei.png"
            alt="シロクマ先生"
            className="w-6 h-6 rounded-full object-cover border border-sky-400/50 shadow-xs"
          />
          <span className="font-bold font-sans text-sm text-slate-800 dark:text-slate-200 tracking-tight">
            シロクマQt×C++ラボ
          </span>
          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-cyan-950 text-sky-700 dark:text-cyan-300 border border-sky-200 dark:border-cyan-500/30">
            Qt 6 / C++17
          </span>
        </div>
      </div>

      {/* 右エリア：便利ツール ＆ ☀️/🌙 テーマ切り替えトグル */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* ソースコード一括モーダル */}
        <button
          onClick={onOpenSourceModal}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-300 dark:border-slate-700 cursor-pointer"
          title="全章のソースコード一覧を見る"
        >
          <Code2 className="w-4 h-4 text-sky-500 dark:text-cyan-400" />
          <span>ソース一覧</span>
        </button>

        {/* C++ Playgroundモーダル */}
        <button
          onClick={onOpenPlaygroundModal}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-300 dark:border-slate-700 cursor-pointer"
          title="オンラインC++コード実行ラボ"
        >
          <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Playground</span>
        </button>

        {/* ☀️ / 🌙 テーマ切り替えトグル（重要） */}
        <ThemeToggle showLabel={true} />
      </div>
    </header>
  );
};

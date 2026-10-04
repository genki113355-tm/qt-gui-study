import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-sm border ${
        isLight
          ? 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border-slate-200 hover:border-sky-300 shadow-sky-950/5'
          : 'bg-white/90 dark:bg-slate-900/90 hover:bg-slate-850 text-slate-700 dark:text-slate-300 hover:text-cyan-300 border-slate-300 dark:border-slate-700 hover:border-cyan-500/50'
      } ${className}`}
      aria-label={`テーマを${isLight ? 'ダークモード' : 'ライトモード'}に切り替える`}
      title={`テーマ切替: 現在は【${isLight ? 'ライトモード（白銀）' : 'ダークモード（極夜）'}】です`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isLight ? (
          <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>

      <span className="text-xs font-mono font-bold select-none">
        {isLight ? 'LIGHT' : 'DARK'}
      </span>

      {showLabel && (
        <span className="text-xs text-slate-500 font-sans hidden sm:inline">
          {isLight ? '白銀モード' : '極夜モード'}
        </span>
      )}
    </button>
  );
};

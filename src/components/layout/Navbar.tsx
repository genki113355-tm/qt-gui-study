import React from 'react';

interface NavbarProps {
  currentChapterId: number;
  onSelectChapter: (slug: string) => void;
  onToggleSidebar: () => void;
  onOpenSourceModal: () => void;
  onOpenPlaygroundModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectChapter, onToggleSidebar }) => {
  return (
    <header className="h-14 bg-[#0a0f18]/95 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="p-2 text-slate-400 hover:text-cyan-400 lg:hidden rounded-lg hover:bg-slate-800/50">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <button onClick={() => onSelectChapter('top')} className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/60 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-xs font-bold font-mono">TOP</span>
        </button>
      </div>
    </header>
  );
};

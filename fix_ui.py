import os
import re

def replace_in_file(filepath, pattern, replacement):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Footer.tsx
replace_in_file('src/components/layout/Footer.tsx',
    r'〜ゲーム開発で学ぶオブジェクト指向開発 レガシー設計からモダン設計まで〜',
    r'〜Linuxで動くリアルタイム計器・GUI開発〜')
replace_in_file('src/components/layout/Footer.tsx',
    r'現場で求められるメモリ管理・ポインタ安全性・RAIIモダン設計の知見を、直感的なゲーム教材として体系化。主要3大コンパイラ（GCC 13\+ / Clang 17\+ / MSVC 2022, C\+\+11〜C\+\+20準拠）にて動作検証済みです。',
    r'Linux環境でのHMI・計器ソフトウェア開発のノウハウを体系化。Qt/QML/C++によるマルチスレッドとリアルタイム描画の実践知識を提供します。')

# useSEO.ts
replace_in_file('src/hooks/useSEO.ts',
    r'シロクマC\+\+ラボ 〜ゲーム開発で学ぶオブジェクト指向開発 レガシー設計からモダン設計まで〜',
    r'シロクマQt×C++ラボ 〜Linuxで動くリアルタイム計器・GUI開発〜')
replace_in_file('src/hooks/useSEO.ts',
    r'インベーダーゲーム風の固定画面シューティング開発の実践を通じて、レガシーC\+\+（C\+\+03・生ポインタ）からモダンC\+\+（C\+\+17・スマートポインタ・ECS設計・TDD・UML設計書）までを体系的に学べるオブジェクト指向プログラミング実践学習メディア。',
    r'Linux環境で動くプロフェッショナルなHMIやリアルタイム計器・GUIをQt C++で構築するための実践学習メディア。シグナル＆スロット、マルチスレッド、QMLフロントエンド分離などを体系的に学べます。')

# App.tsx
replace_in_file('src/App.tsx',
    r'シロクマC\+\+ラボ 〜ゲーム開発で学ぶオブジェクト指向開発 レガシー設計からモダン設計まで〜',
    r'シロクマQt×C++ラボ 〜Linuxで動くリアルタイム計器・GUI開発〜')
replace_in_file('src/App.tsx',
    r'\| シロクマC\+\+ラボ',
    r'| シロクマQt×C++ラボ')

# Sidebar.tsx - 複雑な置き換え（コースのハードコードを消す）
sidebar_code = """import React from 'react';
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
  completedChapters,
  onToggleComplete,
  onOpenMilestoneModal
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-[#0a0f18] border-r border-slate-800/60 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-800/60 bg-gradient-to-r from-[#0d121c] to-[#0a0f18]">
          <span className="font-sans font-bold text-slate-100 flex items-center gap-2">
            <span className="text-xl">🐻‍❄️</span> シロクマQt×C++ラボ
          </span>
        </div>
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <div className="px-4 mb-4">
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
      </aside>
    </>
  );
};
"""
with open('src/components/layout/Sidebar.tsx', 'w', encoding='utf-8') as f:
    f.write(sidebar_code)

# Navbar.tsx - シンプル化
navbar_code = """import React from 'react';

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
"""
with open('src/components/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(navbar_code)

print("Done")

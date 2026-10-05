import React, { useState, useEffect } from 'react';
import { ALL_CHAPTERS, getChapterBySlug } from './data/chapters';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ArcticBackground } from './components/layout/ArcticBackground';
import { RightSidebarBanners } from './components/layout/RightSidebarBanners';
import { ThemeProvider } from './contexts/ThemeContext';
import { useSEO } from './hooks/useSEO';

// コード分割（Code Splitting）による初期読み込みの超軽量化
const TopPageView = React.lazy(() => 
  import('./components/curriculum/TopPageView').then((m) => ({ default: m.TopPageView }))
);
const ChapterView = React.lazy(() => 
  import('./components/curriculum/ChapterView').then((m) => ({ default: m.ChapterView }))
);
const SourceModal = React.lazy(() => 
  import('./components/layout/SourceModal').then((m) => ({ default: m.SourceModal }))
);
const OnlinePlaygroundModal = React.lazy(() => 
  import('./components/playground/OnlinePlaygroundModal').then((m) => ({ default: m.OnlinePlaygroundModal }))
);
const MilestoneModal = React.lazy(() => 
  import('./components/curriculum/MilestoneModal').then((m) => ({ default: m.MilestoneModal }))
);

const PageLoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-cyan-400 font-mono">
    <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    <span className="text-sm tracking-widest text-slate-600 dark:text-slate-400">LOADING CURRICULUM...</span>
  </div>
);

const getSlugFromUrl = (): string => {
  let path = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  if (path === 'qt') return 'top';
  if (path.startsWith('qt/')) path = path.slice(3);

  if (path && getChapterBySlug(path)) return path;

  const hash = window.location.hash.replace('#', '');
  if (hash && getChapterBySlug(hash)) return hash;

  return 'top';
};

const AppContent: React.FC = () => {
  const [currentSlug, setCurrentSlug] = useState<string>(getSlugFromUrl);

  const [completedChapters, setCompletedChapters] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('qt_completed_chapters') || localStorage.getItem('cpp_completed_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState<boolean>(false);
  const [isPlaygroundModalOpen, setIsPlaygroundModalOpen] = useState<boolean>(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState<boolean>(false);

  // 初回ロード時のURL正規化（旧ハッシュURLで訪問された場合にクリーンパスへ補正）
  useEffect(() => {
    const isSub = window.location.pathname.startsWith('/qt');
    const prefix = isSub ? '/qt' : '';
    const hash = window.location.hash.replace('#', '');
    if (hash && getChapterBySlug(hash)) {
      window.history.replaceState(null, '', `${prefix}/${hash}`);
    } else if (currentSlug === 'top' && window.location.hash) {
      window.history.replaceState(null, '', prefix || '/');
    }
  }, []);

  // ブラウザの「戻る」「進む」キー操作（popstate）対応
  useEffect(() => {
    const handlePopState = () => {
      setCurrentSlug(getSlugFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentChapter = getChapterBySlug(currentSlug);

  // SEOメタ情報（title, description, OGP, canonical, JSON-LD）の動的同期
  useSEO({ currentSlug, chapter: currentChapter });

  // Google アナリティクス (GA4) ページビュー送信
  useEffect(() => {
    const siteBaseTitle = 'シロクマQt×C++ラボ 〜Linuxで動くリアルタイム計器・GUI開発〜';
    const pageTitle = currentSlug === 'top' || !currentChapter
      ? siteBaseTitle
      : `${currentChapter.title} | シロクマQt×C++ラボ`;

    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: currentSlug === 'top' ? '/' : `/${currentSlug}`,
      });
    }
  }, [currentSlug, currentChapter]);

  // 完了状態の保存
  const handleToggleComplete = (id: number) => {
    setCompletedChapters((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem('qt_completed_chapters', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleMarkComplete = (id: number) => {
    setCompletedChapters((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem('qt_completed_chapters', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const activeChapter = currentChapter || ALL_CHAPTERS[0];
  const currentChapterId = currentSlug === 'top' ? 0 : activeChapter.id;

  // 章選択時のクリーンURL遷移（HTML5 pushState、/qt/ サブディレクトリを自動考慮）
  const handleSelectChapter = (slug: string) => {
    setCurrentSlug(slug);
    const isSub = window.location.pathname.startsWith('/qt');
    const prefix = isSub ? '/qt' : '';
    const targetPath = slug === 'top' ? (prefix || '/') : `${prefix}/${slug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080d1a] text-slate-900 dark:text-slate-100 flex flex-col font-sans overflow-x-clip relative transition-colors duration-300">
      {/* 🏔️ ほんのり薄い氷山＆オーロラ背景ビジュアル（ライト/ダーク両対応） */}
      <ArcticBackground />

      {/* ナビゲーションバー */}
      <Navbar
        currentChapterId={currentChapterId}
        onSelectChapter={handleSelectChapter}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onOpenSourceModal={() => setIsSourceModalOpen(true)}
        onOpenPlaygroundModal={() => setIsPlaygroundModalOpen(true)}
      />

      {/* メインエリア：サイドバー ＋ カリキュラム本文 */}
      <div className="flex-1 flex w-full min-w-0 relative z-10">
        <Sidebar
          currentChapterSlug={currentSlug}
          onSelectChapter={handleSelectChapter}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          completedChapters={completedChapters}
          onToggleComplete={handleToggleComplete}
          onOpenMilestoneModal={() => setIsMilestoneModalOpen(true)}
        />

        <main className="flex-1 min-w-0 pb-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <React.Suspense fallback={<PageLoadingFallback />}>
            {currentSlug === 'top' ? (
              <TopPageView
                onSelectChapter={handleSelectChapter}
                completedChapters={completedChapters}
                onOpenPlaygroundModal={() => setIsPlaygroundModalOpen(true)}
                onOpenMilestoneModal={() => setIsMilestoneModalOpen(true)}
              />
            ) : (
              <ChapterView
                chapter={activeChapter}
                onNavigate={handleSelectChapter}
                onComplete={handleMarkComplete}
                isCompleted={completedChapters.includes(activeChapter.id)}
              />
            )}
          </React.Suspense>
        </main>

        {/* 右サイドバー：おすすめ学習・転職・旅行バナー（PC大画面 xl: 以上で sticky 追従表示） */}
        <aside className="hidden xl:block shrink-0 sticky top-14 self-start py-6 pl-3 pr-4 sm:pr-6 max-h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar border-l border-slate-200/60 dark:border-slate-800/60">
          <RightSidebarBanners
            currentChapterSlug={currentSlug}
            onSelectChapter={handleSelectChapter}
          />
        </aside>
      </div>

      {/* フッター */}
      <Footer />

      {/* ソースコードガイドモーダル（開かれた時のみ遅延ロード） */}
      {isSourceModalOpen && (
        <React.Suspense fallback={null}>
          <SourceModal
            isOpen={isSourceModalOpen}
            onClose={() => setIsSourceModalOpen(false)}
          />
        </React.Suspense>
      )}

      {/* C++オンライン実行ラボ（Playground）モーダル（開かれた時のみ遅延ロード） */}
      {isPlaygroundModalOpen && (
        <React.Suspense fallback={null}>
          <OnlinePlaygroundModal
            isOpen={isPlaygroundModalOpen}
            onClose={() => setIsPlaygroundModalOpen(false)}
          />
        </React.Suspense>
      )}

      {/* 公式修了証・マイルストーン達成モーダル（開かれた時のみ遅延ロード） */}
      {isMilestoneModalOpen && (
        <React.Suspense fallback={null}>
          <MilestoneModal
            isOpen={isMilestoneModalOpen}
            onClose={() => setIsMilestoneModalOpen(false)}
            completedChapters={completedChapters}
          />
        </React.Suspense>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};
export default App;


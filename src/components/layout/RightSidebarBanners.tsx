import React, { useState } from 'react';
import {
  SCHOOL_BANNERS,
  CAREER_BANNERS,
  TRAVEL_BANNERS,
  A8BannerItem,
} from '../../data/affiliateBanners';
import {
  Sparkles,
  Award,
  Briefcase,
  Building2,
  CalendarCheck2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Layers,
} from 'lucide-react';

interface RightSidebarBannersProps {
  currentChapterSlug: string;
  onSelectChapter?: (slug: string) => void;
}

// 章ごとのシロクマ先生ワンポイントアドバイス
const getChapterMascotTip = (slug: string): string => {
  switch (slug) {
    case 'top':
      return 'Linux×C++で動くリアルタイムHMI！まずはChapter 0から環境を整えてスタートじゃ！';
    case 'chapter-0':
      return 'まずはQt Creatorの画面構成とビルドボタンを把握するのじゃ！焦らず一歩ずつ進めば怖くないぞ！';
    case 'chapter-1':
      return 'CMakeLists.txtのfind_packageとtarget_link_librariesがQt開発の要じゃ！';
    case 'chapter-2':
      return 'シグナルとスロット接続はQtの心臓部！引数の型とコネクトのタイミングを意識するのじゃ！';
    case 'chapter-3':
      return 'QHBoxLayoutとQVBoxLayoutを組み合わせれば、美しいレスポンシブGUIが作れるぞ！';
    case 'chapter-4':
      return 'QPainterのカスタム描画で自作ゲージやメーターの表現力が一気に広がるのじゃ！';
    case 'chapter-5':
      return 'QAbstractTableModelで大量データを扱えば、メモリ効率も描画速度も段違いじゃ！';
    case 'chapter-6':
      return 'ワーカースレッドから直接UIを弄ってはならぬ！シグナル経由でメインスレッドに通知するのじゃ！';
    case 'chapter-7':
      return 'QMLの滑らかでモダンなUI記述は一度体験すると病みつきになるぞ！';
    case 'chapter-8':
      return 'QMLとC++のプロパティバインディングこそ、高機能HMIの最高峰アーキテクチャじゃ！';
    case 'chapter-9':
      return 'QNetworkAccessManagerでAPIと非同期通信！リアルタイムデータとGUIを繋ぐのじゃ！';
    case 'chapter-10':
      return '総合実践プロジェクト！これまでの学びを総動員して自作メーターを動かすのじゃ！';
    case 'chapter-11':
      return 'linuxdeployqtとC++最適化で、現場で配布できる実戦アプリケーションへ仕上げるのじゃ！';
    default:
      return 'C++とQtの組み合わせはGUI開発の最強タッグ！着実に手を動かして習得するのじゃ！';
  }
};

export const RightSidebarBanners: React.FC<RightSidebarBannersProps> = ({
  currentChapterSlug,
  onSelectChapter,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // 代表的なおすすめバナーを選定
  const schoolBanner: A8BannerItem = SCHOOL_BANNERS.banners[0]; // デイトラ
  const careerBanner: A8BannerItem = CAREER_BANNERS.banners[0]; // TECH GO
  const onstudyBanner: A8BannerItem = SCHOOL_BANNERS.banners[1]; // オンスク.JP
  const travelBanner: A8BannerItem = TRAVEL_BANNERS.banners[1]; // Yahoo!トラベル

  // 折りたたみ時：コンパクトな復帰バーを表示
  if (isCollapsed) {
    return (
      <div className="w-11 shrink-0 flex flex-col items-center">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 dark:hover:border-cyan-500/50 shadow-md transition-all flex flex-col items-center gap-2 cursor-pointer group"
          title="おすすめサイドバーを展開"
          aria-label="おすすめサイドバーを展開"
        >
          <ChevronLeft className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-[10px] font-bold [writing-mode:vertical-rl] tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
            おすすめ情報
          </span>
          <img
            src="/images/characters/shirokuma_sensei.png"
            alt="シロクマ先生"
            className="w-6 h-6 rounded-full object-cover border border-cyan-400/50 shadow-xs"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[316px] shrink-0 space-y-4 font-sans select-none">
      {/* 0. ヘッダー ＆ 折りたたみボタン */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
          <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>学習・キャリア応援</span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          title="サイドバーを折りたたむ"
          aria-label="サイドバーを折りたたむ"
        >
          <span>閉じる</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 1. シロクマ先生の直前エール & クイックナビ */}
      <div className="rounded-2xl border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-br from-cyan-50/80 via-white to-sky-50/40 dark:from-slate-900/90 dark:via-[#0c121e] dark:to-slate-950 p-3.5 shadow-sm space-y-2.5">
        <div className="flex items-start gap-2.5">
          <img
            src="/images/characters/shirokuma_sensei.png"
            alt="シロクマ先生"
            className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400 shadow-xs shrink-0 mt-0.5"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-900 dark:text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>シロクマ学習アドバイス</span>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug mt-1 font-sans">
              {getChapterMascotTip(currentChapterSlug)}
            </p>
          </div>
        </div>

        {/* 主要章へのショートカット */}
        {onSelectChapter && (
          <div className="pt-2 border-t border-cyan-100 dark:border-slate-800 grid grid-cols-2 gap-1.5 text-xs">
            <button
              onClick={() => onSelectChapter('chapter-0')}
              className={`p-2 rounded-xl text-left transition-all font-semibold flex items-center justify-between cursor-pointer ${
                currentChapterSlug === 'chapter-0'
                  ? 'bg-cyan-600 dark:bg-cyan-500 text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-slate-700'
              }`}
            >
              <span>🔰 Chapter 0</span>
              <span className="text-[10px] opacity-75 font-mono">環境</span>
            </button>
            <button
              onClick={() => onSelectChapter('chapter-2')}
              className={`p-2 rounded-xl text-left transition-all font-semibold flex items-center justify-between cursor-pointer ${
                currentChapterSlug === 'chapter-2'
                  ? 'bg-cyan-600 dark:bg-cyan-500 text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-slate-700'
              }`}
            >
              <span>⚡ Chapter 2</span>
              <span className="text-[10px] opacity-75 font-mono">Signal</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. ITスクール・プログラミング支援 PRバナー */}
      {schoolBanner && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e]/90 p-3 shadow-sm space-y-2 transition-all hover:border-cyan-300 dark:hover:border-cyan-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>{schoolBanner.badge || 'プログラミング学習'}</span>
            </span>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
              PR
            </span>
          </div>

          <div className="relative group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center justify-center">
            <a
              href={schoolBanner.linkUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="block w-full transition-transform duration-200 group-hover:scale-[1.02]"
            >
              <img
                src={schoolBanner.bannerImgUrl}
                alt={schoolBanner.name}
                width={schoolBanner.width}
                height={schoolBanner.height}
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
              />
            </a>
            <img
              src={schoolBanner.trackingPixelUrl}
              width="1"
              height="1"
              alt=""
              className="hidden"
            />
          </div>

          <div>
            <a
              href={schoolBanner.linkUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-between gap-1"
            >
              <span>{schoolBanner.name}</span>
              <ExternalLink className="w-3 h-3 text-slate-600 dark:text-slate-400 shrink-0" />
            </a>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
              {schoolBanner.description}
            </p>
          </div>
        </div>
      )}

      {/* 3. エンジニア転職・キャリア支援 PRバナー */}
      {careerBanner && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e]/90 p-3 shadow-sm space-y-2 transition-all hover:border-purple-300 dark:hover:border-purple-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span>{careerBanner.badge || 'IT転職・キャリア支援'}</span>
            </span>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
              PR
            </span>
          </div>

          <div className="relative group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center justify-center">
            <a
              href={careerBanner.linkUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="block w-full transition-transform duration-200 group-hover:scale-[1.02]"
            >
              <img
                src={careerBanner.bannerImgUrl}
                alt={careerBanner.name}
                width={careerBanner.width}
                height={careerBanner.height}
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
              />
            </a>
            <img
              src={careerBanner.trackingPixelUrl}
              width="1"
              height="1"
              alt=""
              className="hidden"
            />
          </div>

          <div>
            <a
              href={careerBanner.linkUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-between gap-1"
            >
              <span>{careerBanner.name}</span>
              <ExternalLink className="w-3 h-3 text-slate-600 dark:text-slate-400 shrink-0" />
            </a>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
              {careerBanner.description}
            </p>
          </div>
        </div>
      )}

      {/* 4. スキマ時間月額定額学習 PRバナー */}
      {onstudyBanner && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e]/90 p-3 shadow-sm space-y-2 transition-all hover:border-emerald-300 dark:hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CalendarCheck2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{onstudyBanner.badge || '定額スキルアップ'}</span>
            </span>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
              PR
            </span>
          </div>

          <div className="relative group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center justify-center">
            <a
              href={onstudyBanner.linkUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="block w-full transition-transform duration-200 group-hover:scale-[1.02]"
            >
              <img
                src={onstudyBanner.bannerImgUrl}
                alt={onstudyBanner.name}
                width={onstudyBanner.width}
                height={onstudyBanner.height}
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
              />
            </a>
            <img
              src={onstudyBanner.trackingPixelUrl}
              width="1"
              height="1"
              alt=""
              className="hidden"
            />
          </div>

          <div>
            <a
              href={onstudyBanner.linkUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-between gap-1"
            >
              <span>{onstudyBanner.name}</span>
              <ExternalLink className="w-3 h-3 text-slate-600 dark:text-slate-400 shrink-0" />
            </a>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
              {onstudyBanner.description}
            </p>
          </div>
        </div>
      )}

      {/* 5. 宿泊・開発合宿・リフレッシュ旅 PRバナー */}
      {travelBanner && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e]/90 p-3 shadow-sm space-y-2 transition-all hover:border-amber-300 dark:hover:border-amber-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Building2 className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>{travelBanner.badge || '宿泊・開発合宿'}</span>
            </span>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
              PR
            </span>
          </div>

          <div className="relative group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center justify-center">
            <a
              href={travelBanner.linkUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="block w-full transition-transform duration-200 group-hover:scale-[1.02]"
            >
              <img
                src={travelBanner.bannerImgUrl}
                alt={travelBanner.name}
                width={travelBanner.width}
                height={travelBanner.height}
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
              />
            </a>
            <img
              src={travelBanner.trackingPixelUrl}
              width="1"
              height="1"
              alt=""
              className="hidden"
            />
          </div>

          <div>
            <a
              href={travelBanner.linkUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center justify-between gap-1"
            >
              <span>{travelBanner.name}</span>
              <ExternalLink className="w-3 h-3 text-slate-600 dark:text-slate-400 shrink-0" />
            </a>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
              {travelBanner.description}
            </p>
          </div>
        </div>
      )}

      {/* 6. シロクマ キャンパスラボ 姉妹サイト */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-3.5 space-y-2.5">
        <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          <Layers className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
          <span>SHIROKUMA CAMPUS LABS</span>
        </div>
        <div className="space-y-1.5 text-xs">
          <a
            href="/cpp/"
            className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-cyan-300 dark:hover:border-cyan-500/50 hover:bg-cyan-50/50 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-300"
          >
            <span className="font-semibold">👾 C++設計ラボ</span>
            <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono">OOP実践 ➔</span>
          </a>
          <a
            href="/nw/"
            className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-300"
          >
            <span className="font-semibold">🌐 ネスペ特訓ラボ</span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">午後記述 ➔</span>
          </a>
          <a
            href="/sonar/"
            className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-300"
          >
            <span className="font-semibold">🌊 水中音響ソナー</span>
            <span className="text-[10px] text-blue-700 dark:text-blue-400 font-mono">FFT信号 ➔</span>
          </a>
          <a
            href="/auto/"
            className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-amber-300 dark:hover:border-amber-500/50 hover:bg-amber-50/50 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-300"
          >
            <span className="font-semibold">⚡ 開発自動化ラボ</span>
            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">CI/CD ➔</span>
          </a>
        </div>
      </div>
    </div>
  );
};

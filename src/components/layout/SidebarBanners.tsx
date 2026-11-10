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
  ChevronDown,
  ChevronUp,
  GraduationCap,
} from 'lucide-react';

interface SidebarBannersProps {
  currentChapterSlug: string;
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

export const SidebarBanners: React.FC<SidebarBannersProps> = ({
  currentChapterSlug,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const schoolBanner: A8BannerItem = SCHOOL_BANNERS.banners[0]; // デイトラ
  const careerBanner: A8BannerItem = CAREER_BANNERS.banners[0]; // TECH GO
  const onstudyBanner: A8BannerItem = SCHOOL_BANNERS.banners[1]; // オンスク.JP
  const travelBanner: A8BannerItem = TRAVEL_BANNERS.banners[1]; // Yahoo!トラベル

  return (
    <div className="w-full space-y-3 font-sans select-none">
      {/* 折りたたみトグルヘッダー */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between p-2 rounded-xl text-left bg-sky-50/80 dark:bg-slate-900/90 border border-sky-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-cyan-300 dark:hover:border-cyan-500/50 transition cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2 text-xs font-bold text-sky-900 dark:text-cyan-300">
          <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span>学習・キャリア応援 (PR)</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-3 animate-fadeIn">
          {/* シロクマ先生の章別アドバイス */}
          <div className="rounded-2xl border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-br from-cyan-50/80 via-white to-sky-50/40 dark:from-slate-900/90 dark:via-[#0c121e] dark:to-slate-950 p-3 shadow-xs space-y-2">
            <div className="flex items-start gap-2.5">
              <img
                src="/images/characters/shirokuma_sensei.png"
                alt="シロクマ先生"
                className="w-9 h-9 rounded-full object-cover border-2 border-cyan-400 shadow-xs shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-xs font-bold text-cyan-900 dark:text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>シロクマ学習アドバイス</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed mt-1 font-sans">
                  {getChapterMascotTip(currentChapterSlug)}
                </p>
              </div>
            </div>
          </div>

          {/* 1. ITスクール PRバナー */}
          {schoolBanner && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e]/90 p-3 shadow-xs space-y-2 transition-all hover:border-cyan-300 dark:hover:border-cyan-500/40">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                  <span>{schoolBanner.badge || 'プログラミング学習'}</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800">
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
              </div>

              <div>
                <a
                  href={schoolBanner.linkUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-between gap-1"
                >
                  <span className="truncate">{schoolBanner.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                </a>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
                  {schoolBanner.description}
                </p>
              </div>
            </div>
          )}

          {/* 2. IT転職・キャリア支援 PRバナー */}
          {careerBanner && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e]/90 p-3 shadow-xs space-y-2 transition-all hover:border-purple-300 dark:hover:border-purple-500/40">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  <span>{careerBanner.badge || 'IT転職・キャリア'}</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800">
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
              </div>

              <div>
                <a
                  href={careerBanner.linkUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-between gap-1"
                >
                  <span className="truncate">{careerBanner.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                </a>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
                  {careerBanner.description}
                </p>
              </div>
            </div>
          )}

          {/* 3. 定額資格・スキルアップ PRバナー */}
          {onstudyBanner && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e]/90 p-3 shadow-xs space-y-2 transition-all hover:border-emerald-300 dark:hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CalendarCheck2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{onstudyBanner.badge || '定額スキルアップ'}</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800">
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
              </div>

              <div>
                <a
                  href={onstudyBanner.linkUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-between gap-1"
                >
                  <span className="truncate">{onstudyBanner.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                </a>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
                  {onstudyBanner.description}
                </p>
              </div>
            </div>
          )}

          {/* 4. 宿泊・開発合宿 PRバナー */}
          {travelBanner && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e]/90 p-3 shadow-xs space-y-2 transition-all hover:border-amber-300 dark:hover:border-amber-500/40">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>{travelBanner.badge || '宿泊・開発合宿'}</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800">
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
              </div>

              <div>
                <a
                  href={travelBanner.linkUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center justify-between gap-1"
                >
                  <span className="truncate">{travelBanner.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                </a>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
                  {travelBanner.description}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

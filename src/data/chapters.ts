import { Chapter, CourseTrack } from '../types/curriculum';
import { chapter0 } from './chapters/chapter0';
import { chapter1 } from './chapters/chapter1';
import { chapter2 } from './chapters/chapter2';
import { chapter3 } from './chapters/chapter3';
import { chapter4 } from './chapters/chapter4';
import { chapter5 } from './chapters/chapter5';
import { chapter6 } from './chapters/chapter6';
import { chapter7 } from './chapters/chapter7';
import { chapter8 } from './chapters/chapter8';
import { guiFrameworkComparison } from './guides/guiFrameworkComparison';

export const CLASSIC_CHAPTERS: Chapter[] = [
  chapter0,
  chapter1,
  chapter2,
  chapter3,
  chapter4
];

export const MODERN_CHAPTERS: Chapter[] = [
  chapter5,
  chapter6,
  chapter7,
  chapter8
];

export const READING_CHAPTERS: Chapter[] = [
  {
    id: 9,
    slug: 'chapter-9',
    courseTrack: 'reading',
    title: '第9章：Qtアプリのテスト：Qt TestフレームワークとUIの自動テスト',
    subtitle: '単体テストとGUIシミュレート',
    badge: '第3部：品質・デプロイ',
    description: 'ロジックの単体テスト（Unit Test）と、GUIのボタンクリックなどをシミュレートする自動テストの実装。',
    sections: []
  },
  {
    id: 10,
    slug: 'chapter-10',
    courseTrack: 'reading',
    title: '第10章：Linux環境でのパフォーマンス・プロファイリング（Hotspot / Valgrind）',
    subtitle: 'ボトルネックの解析とフレーム安定化',
    badge: '第3部：品質・デプロイ',
    description: 'アプリが重い・メモリを食う時の原因特定。ボトルネックの解析とフレームレート安定化の手法。',
    sections: []
  },
  {
    id: 11,
    slug: 'chapter-11',
    courseTrack: 'reading',
    title: '第11章：実機配備：LinuxでのQtアプリケーションのデプロイ（linuxdeployqt等）',
    subtitle: 'パッケージング技術と.soの同梱',
    badge: '第3部：品質・デプロイ',
    description: '依存する共有ライブラリ（.so）を一つのパッケージにまとめ、別のLinux PCでもそのまま動くようにするパッケージング技術。',
    sections: []
  },
  {
    id: 12,
    slug: 'chapter-12',
    courseTrack: 'reading',
    title: '第12章：実践：産業用ダッシュボード・リアルタイムGUIを完成させる',
    subtitle: '全知識を結集した統合システム',
    badge: '第3部：品質・デプロイ',
    description: '全ての知識を結集し、レーダーチャート、円形メーター、波形オシロスコープを備えた統合システムを完成させる。',
    sections: []
  }
];

export const SPECIAL_GUIDES: Chapter[] = [
  guiFrameworkComparison
];

export const ALL_CHAPTERS: Chapter[] = [...CLASSIC_CHAPTERS, ...MODERN_CHAPTERS, ...READING_CHAPTERS, ...SPECIAL_GUIDES];
export const ALL_ARTICLES: Chapter[] = [...CLASSIC_CHAPTERS, ...MODERN_CHAPTERS, ...READING_CHAPTERS, ...SPECIAL_GUIDES];

export const UPCOMING_CHAPTERS: any[] = [];

export function getChaptersByCourse(track: CourseTrack): Chapter[] {
  if (track === 'classic') return CLASSIC_CHAPTERS;
  if (track === 'modern') return MODERN_CHAPTERS;
  if (track === 'reading') return READING_CHAPTERS;
  return [];
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return ALL_ARTICLES.find(c => c.slug === slug);
}

import { Chapter } from '../types/curriculum';
import { chapter0 } from './chapters/chapter0';
import { chapter1 } from './chapters/chapter1';
import { chapter2 } from './chapters/chapter2';
import { chapter3 } from './chapters/chapter3';
import { chapter4 } from './chapters/chapter4';
import { chapter5 } from './chapters/chapter5';
import { chapter6 } from './chapters/chapter6';
import { chapter7 } from './chapters/chapter7';
import { chapter8 } from './chapters/chapter8';
import { chapter9 } from './chapters/chapter9';
import { chapter10 } from './chapters/chapter10';
import { chapter11 } from './chapters/chapter11';
import { chapter12 } from './chapters/chapter12';
import { guiFrameworkComparison } from './guides/guiFrameworkComparison';

export const QT_CHAPTERS: Chapter[] = [
  chapter0,
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  chapter9,
  chapter10,
  chapter11,
  chapter12
];

export const SPECIAL_GUIDES: Chapter[] = [
  guiFrameworkComparison
];

// 動的に prev/next を設定する
for (let i = 0; i < QT_CHAPTERS.length; i++) {
  if (i > 0) {
    QT_CHAPTERS[i].prevChapterSlug = QT_CHAPTERS[i - 1].slug;
  }
  if (i < QT_CHAPTERS.length - 1) {
    QT_CHAPTERS[i].nextChapterSlug = QT_CHAPTERS[i + 1].slug;
  }
}

export const ALL_CHAPTERS: Chapter[] = [...QT_CHAPTERS, ...SPECIAL_GUIDES];
export const ALL_ARTICLES: Chapter[] = [...QT_CHAPTERS, ...SPECIAL_GUIDES];

export const UPCOMING_CHAPTERS: any[] = [];

export function getChapterBySlug(slug: string): Chapter | undefined {
  return ALL_ARTICLES.find(c => c.slug === slug);
}

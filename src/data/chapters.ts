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
import { chapter9 } from './chapters/chapter9';
import { chapter10 } from './chapters/chapter10';
import { chapter11 } from './chapters/chapter11';
import { chapter12 } from './chapters/chapter12';
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
  chapter9,
  chapter10,
  chapter11,
  chapter12
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

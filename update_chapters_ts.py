import os
import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\data\chapters.ts"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# import文を追加
imports = """import { chapter9 } from './chapters/chapter9';
import { chapter10 } from './chapters/chapter10';
import { chapter11 } from './chapters/chapter11';
import { chapter12 } from './chapters/chapter12';
import { guiFrameworkComparison } from './guides/guiFrameworkComparison';"""

content = re.sub(r"import \{ guiFrameworkComparison \} from './guides/guiFrameworkComparison';", imports, content)


# READING_CHAPTERSのインライン定義を置き換える
old_reading_pattern = r'export const READING_CHAPTERS: Chapter\[\] = \[\s*\{\s*id: 9,[\s\S]*?\}\s*\];'

new_reading = """export const READING_CHAPTERS: Chapter[] = [
  chapter9,
  chapter10,
  chapter11,
  chapter12
];"""

content = re.sub(old_reading_pattern, new_reading, content)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated chapters.ts")

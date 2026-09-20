import os

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\TopPageView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

intro_start = content.find('{/* Introduction / Overview Section */}')
if intro_start == -1:
    print("Introduction section not found")
    exit(1)

# Find the end of the intro section by looking for the next section
next_section = content.find('カリキュラム一覧', intro_start)
intro_end = content.rfind('</section>', intro_start, next_section) + len('</section>')

intro_block = content[intro_start:intro_end]

# Remove the intro block from its original position
content = content[:intro_start] + content[intro_end:]

# Find the insertion point (after the hero section)
# Hero section ends with </section> just before the characters section
hero_end = content.find('</section>') + len('</section>')

# Insert the intro block after the hero section
content = content[:hero_end] + "\n\n      " + intro_block + content[hero_end:]

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Moved intro block successfully")

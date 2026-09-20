import os

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\curriculum\ChapterView.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 閉じていなかった div を閉じる
old_tail = """                  </div>
                ))}
              </div>
            </div>"""

new_tail = """                  </div>
                ))}
              </div>
              </div>
            </div>"""

if old_tail in content:
    content = content.replace(old_tail, new_tail)
else:
    print("Could not find tail")

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed tags")

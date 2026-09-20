import json

path = "C:/Users/ziu12/Documents/Qt-study/package.json"

with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 既存のデプロイ用スクリプトを更新する
data["scripts"]["deploy"] = "npm run build && wrangler pages deploy dist --project-name qt-gui-study"

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Updated package.json for deployment")

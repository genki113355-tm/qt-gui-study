import re

filepath = 'src/components/curriculum/ChapterView.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove imports
content = re.sub(r'const GameEmulator = React\.lazy\(\(\) =>[\s\S]*?import\(\'\.\./emulator/GameEmulator\'\)\.then\(\(m\) => \(\{ default: m\.GameEmulator \}\)\)\n\);', '', content)
content = re.sub(r'import \{ AffiliatePromoBanner \} from \'\.\./affiliate/AffiliatePromoBanner\';', '', content)

# Remove GameEmulator tags
content = re.sub(r'<GameEmulator[^>]*/>', '', content)

# Remove AffiliatePromoBanner tags
content = re.sub(r'<AffiliatePromoBanner[^>]*/>', '', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

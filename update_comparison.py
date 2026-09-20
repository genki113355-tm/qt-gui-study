import os

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\data\guides\guiFrameworkComparison.ts"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_text = """それぞれのフレームワークには「適材適所」があります。

**1. 業務アプリ・チャットツール（Electron / Tauri等）**
SlackやVSCodeのように、多少メモリを食ってもUI開発のスピードとクロスプラットフォーム性を最優先したい場合に最適です。

**2. Windows特化の社内ツール（WPF / WinForms / C#）**
ターゲットOSがWindowsのみと決まっており、業務システムと連携する場合は、現在でも非常に強力な選択肢です。

**3. ゲーム内UIやデバッグツール（Dear ImGui）**
状態を持たない即値モード（Immediate Mode）GUI。ゲームエンジン開発など、とにかく早くUIを出したい時に重宝します。

**4. 産業用HMI・組み込み機器（Qt / C++）**
本サイトで扱う領域です。**「絶対にクラッシュしてはならない」「限られたハードウェアリソースで60fpsを維持する」「ハードウェアへの低レイテンシなアクセスが必要」**という、妥協が許されないプロフェッショナルな現場では、Qtが事実上の業界標準（デファクトスタンダード）として君臨しています。"""

new_text = """それぞれのフレームワークには「適材適所」があります。以下のマトリックスで、代表的なGUIフレームワークの得意領域と特徴を比較します。

| フレームワーク | 代表言語 | 主な用途・得意領域 | メリット | デメリット |
| :--- | :--- | :--- | :--- | :--- |
| **Electron / Tauri** | JS / TS / Rust | デスクトップアプリ一般 (Slack, VSCode 等) | Web技術が流用可能、UIが自由 | メモリ消費大、リアルタイム性低 |
| **WPF / WinForms** | C# | Windows特化の業務ツール、社内システム | Windowsとの親和性、C#の生産性 | マルチプラットフォーム非対応 |
| **Dear ImGui** | C++ | ゲーム内UI、デバッグツール、プロトタイプ | 導入が超軽量、即値モード | 複雑なアニメーションやレイアウト設計には不向き |
| **Qt / QML** | C++ | **産業用HMI、医療機器、車載システム等** | **最高速の描画、リアルタイム制御、クロス環境** | 学習コスト（MOCや独自クラス群）が高い |

本サイトで扱うのは、表の一番下にある **産業用HMI・組み込み機器（Qt / C++）** の領域です。
**「絶対にクラッシュしてはならない」「限られたハードウェアリソースで60fpsを維持する」「ハードウェアへの低レイテンシなアクセスが必要」**という妥協が許されない現場において、Qtは事実上の業界標準（デファクトスタンダード）として君臨しています。"""

if old_text in content:
    content = content.replace(old_text, new_text)
else:
    print("Could not find the target text to replace.")

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

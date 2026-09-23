# シロクマQt×C++ラボ (qt-gui-study) 基本設計書

## 1. システム概要

### 1.1 プロジェクトの目的
本システムは、「Linux環境におけるQt / C++を用いたリアルタイム計器・GUI開発」を学習するためのオンラインカリキュラムプラットフォームです。読者は、ブラウザ上で解説テキストや図解、対話形式のシナリオ、タブ切り替え可能なソースコードを閲覧しながら、実践的なC++ GUIアーキテクチャを体系的に学習できます。

### 1.2 ターゲットユーザー
* 組み込みLinuxやデスクトップ向けに、高いパフォーマンスを要求されるGUI（HMI・ダッシュボード等）を開発するソフトウェアエンジニア
* C++の基本を終え、実用的なフレームワーク（Qt/QML）の活用方法を学びたい学習者

---

## 2. アーキテクチャと技術スタック

### 2.1 技術スタック
* **フロントエンド・フレームワーク**: React 18, TypeScript
* **ビルドツール・SSG**: Vite, Node.js (カスタムスクリプトによる静的SEOページ生成)
* **スタイリング**: Tailwind CSS
* **アイコン・UI補助**: Lucide React
* **コードシンタックスハイライト**: Prism.js
* **デプロイ・ホスティング**: Cloudflare Pages (GitHub連携によるCI/CD自動デプロイ)

### 2.2 システムアーキテクチャの特徴
* **SPA (Single Page Application)**: React Routerを使用せず、状態管理によって画面（章）を切り替える高速なブラウジング体験を提供。
* **SSG (Static Site Generation)**: SEO要件を満たすため、ビルド時（`scripts/generate-seo.mjs`）に各カリキュラムのデータを読み込み、クローラー用の静的HTMLファイルを `dist` ディレクトリに事前生成するハイブリッド構成。

---

## 3. ディレクトリ構成

```text
qt-gui-study/
 ├─ public/               # 静的アセット（画像、favicon等）
 │   ├─ images/           # キャラクターアイコンやOGP画像
 │   └─ feed.xml          # RSSフィード（ビルド時に自動生成）
 ├─ scripts/
 │   └─ generate-seo.mjs  # SEO用の静的HTML・Sitemap・RSS生成スクリプト
 ├─ src/
 │   ├─ components/       # Reactコンポーネント群
 │   │   ├─ common/       # 共有部品（ShareButtons等）
 │   │   ├─ curriculum/   # 学習機能（CodeViewer, DialogueBubble, TopPageView等）
 │   │   └─ layout/       # レイアウト（Navbar, Sidebar, Footer等）
 │   ├─ data/             # カリキュラムのコンテンツデータ
 │   │   ├─ chapters/     # 各章のテキスト・コードデータ（chapter0.ts 〜 chapter12.ts）
 │   │   └─ chapters.ts   # 全章のエントリーポイント
 │   ├─ types/
 │   │   └─ curriculum.ts # TypeScriptの型定義（Chapter, Section, CodeFile等）
 │   ├─ App.tsx           # アプリケーションのルート（状態管理とルーティング制御）
 │   └─ main.tsx          # Reactのマウントポイント
 ├─ index.html            # SPAのベースHTML（メタタグ、構造化データ定義）
 ├─ package.json          # 依存関係とnpmスクリプト
 ├─ tailwind.config.js    # Tailwindのテーマ設定
 └─ tsconfig.json         # TypeScript設定
```

---

## 4. データ設計（ドメインモデリング）

本システムはバックエンドやデータベースを持たず、全てのコンテンツはTypeScriptのオブジェクトとして静的に定義されます（`src/types/curriculum.ts`）。

### 4.1 主要インターフェース
* **`Chapter`**: 章の単位。タイトル、バッジ、各セクションの配列を持つ。
* **`Section`**: 節の単位。解説テキスト(`explanationText`)、ハイライト事項(`takeaways`)、ソースコード(`codeFiles`)、手順(`processSteps`)、対話シナリオ(`dialogues`)等を含む。
* **`CodeFile`**: ソースコード情報。ファイル名、言語（cpp, bash等）、コード本文を保持する。Prism.jsによってシンタックスハイライトされる。

---

## 5. 主要コンポーネント設計

### 5.1 App (状態管理とルーティング)
* `currentChapterSlug`: 現在表示中の章IDを管理。`'top'` の場合はトップページ（`TopPageView`）を描画し、それ以外は `ChapterView` を描画する。
* 姉妹サイトへの遷移や、プライバシーポリシー（モーダル）の開閉状態も管理。

### 5.2 Layout (レイアウト層)
* **`Sidebar`**: モバイル時はハンバーガーメニューからドロワーとして引き出され、PC時は左側に固定表示されるナビゲーション。
* **`Footer`**: 姉妹メディア（シロクマC++ラボ、シロクマC++自動化ラボ、水中音響・ソナー入門）への相互リンクパネルをGridレイアウトで配置。

### 5.3 Curriculum (コンテンツ層)
* **`TopPageView`**: サイトのランディングページ。TailwindのグラデーションやCSS描画による疑似グラフを用いたリッチなヒーローセクションと、キャラクターの吹き出しによる紹介エリアを持つ。
* **`ChapterView`**: 各章の本文を描画。バッジ、パンくずリスト、セクションのマップ展開を行う。
* **`CodeViewer`**: 複数のファイル（ヘッダファイルとソースファイルなど）をタブで切り替えて表示。モバイル対応として横スクロール(`overflow-x-auto`)と背景ハイライトの崩れ防止(`min-w-full`)を実装。
* **`DialogueBubble`**: 2人のキャラクター（シロクマ教官、ペンギン先輩）による対話UI。CSS Borderによる吹き出しのしっぽを表現。

---

## 6. ビルド・デプロイメント設計

### 6.1 デプロイメント・フロー
1. 開発者が `main` ブランチにプッシュ。
2. Cloudflare Pages の自動ビルドがトリガーされる。
3. `npm run build` が実行される。
   * `tsc && vite build`: React SPAのビルド。
   * `node scripts/generate-seo.mjs`: `src/data/chapters` のデータをパースし、クローラー向けに各章の静的HTMLファイル、`sitemap.xml`、`feed.xml` を `dist` フォルダに生成する。
4. ビルド成果物（`dist`）がエッジサーバーにデプロイされ、公開される。

### 6.2 SEO対策
* **OGP / Twitter Card**: `index.html` にハードコードされたメタタグにより、SNSシェア時にリッチなカードが表示される。
* **Dynamic Prerendering**: クローラーが JavaScript を解釈できなくても内容を読めるよう、`generate-seo.mjs` によって本文テキストやソースコードをプレーンなHTMLとして出力している。
* **独自ドメイン**: ムームードメインで取得した `shirokuma-qt-cpp.jp` をCloudflare DNSに紐付け、自動でSSL化とCDNキャッシュを行っている。

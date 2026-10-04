import { Chapter } from '../../types/curriculum';

export const chapter0: Chapter = {
  id: 0,
  slug: 'chapter-0',
  courseTrack: 'classic',
  courseChapterCode: '準備編',
  title: '🔰 準備編：開発環境セットアップとモダンQtワークフロー',
  subtitle: 'Qt 6、モダンCMake、Ninja、Qt Creator / VS Code の完全導入',
  badge: '🔰 準備編',
  description: 'Qtを使った本格的なC++ GUI開発を始める前に、Linux/WSL2環境でモダンなビルドシステム (CMake + Ninja) とコーディング環境 (VSCode/Qt Creator) を構築する手順を解説します。',
  seoDescription: 'Qt 6、モダンCMake、Ninja、Qt Creator/VS Codeの開発環境セットアップ手順。Linux/WSL2環境でのビルド設定とQt 5からの移行ポイントを徹底解説。',
  githubSnapshot: {
    tagOrBranch: 'ch00-setup',
    folderPath: 'examples/ch00-env-setup',
    url: 'https://github.com/genki113355-tm/qt-gui-study/tree/main/examples/ch00-env-setup',
    cloneCommand: 'git clone https://github.com/genki113355-tm/qt-gui-study.git && cd qt-gui-study/examples/ch00-env-setup'
  },
  prerequisites: [
    { title: 'C++17の基本文法（auto, 構造体, 参照）' },
    { title: 'LinuxターミナルまたはWSLの基本コマンド操作（cd, ls, mkdir）' },
    { title: 'CMakeのビルドターゲットとリンクの基礎概念', labLink: '/auto/chapter/2', labLabel: 'Autoラボ第2章で復習' }
  ],
  relatedLabs: [
    {
      title: 'モダンCMakeとビルド自動化',
      labName: 'シロクマC++自動化ラボ',
      url: '/auto/chapter/2',
      badge: 'Chap 2',
      description: 'Docker環境でのCMakeLists.txt記述、Ninja高速ビルド、依存ライブラリのリンク手法を体系的に学習できます。',
      icon: '⚡'
    }
  ],
  sections: [
    {
      id: 'sec-0-1',
      title: '0.1 なぜLinux環境でQtなのか？',
      explanationText: '防衛・宇宙・医療・産業機械など、ミッションクリティカルな現場の制御端末（HMI）では、高い安定性とリアルタイム性を持つLinuxベースのOSが広く採用されています。\n\nLinux上でネイティブに動作し、かつ高速な描画と美しいUIを実現できるフレームワークとして、Qt（C++）は業界標準とも言える存在です。本チュートリアルでは、実際の産業現場と同じように Linux（基本はUbuntu） 上で開発を進めていきます。',
      takeaways: [
        {
          title: 'Linuxが選ばれる理由',
          description: 'Windowsのような強制アップデートによる意図しない再起動がなく、稼働の安定性が極めて高いため。'
        }
      ]
    },
    {
      id: 'sec-0-2',
      title: '0.2 【重要】Windows上のLinux環境構築（WSL2 + WSLg）',
      explanationText: '「LinuxのGUIアプリを作るなら、VirtualBoxなどの重い仮想マシンを入れるか、デュアルブートにしないといけないのでは？」……それは数年前の常識です。\n\n現在は **WSLg (Windows Subsystem for Linux GUI)** という強力な機能がWindows 10/11に標準搭載されています。これにより、WindowsのターミナルからUbuntuを立ち上げ、そこでQtアプリをビルドして実行するだけで、**Windowsのデスクトップ上にポンッと直接GUI画面が表示されます**。さらにGPUアクセラレーションも効くため、高速な波形描画もサクサク動きます。\n\n> 🐧 ペンギン生徒: 昔LinuxでGUIを動かそうとしたらX11転送やVNCの設定で丸一日溶けました…！WSLgならコマンドを叩くだけでWindowsのネイティブウィンドウとして画面が出るんですね！\n\n> 🐻‍❄️ シロクマ先生: うむ！面倒なディスプレイサーバー設定はすべてWSLgが自動で面倒を見てくれるぞ。まずはUbuntuのターミナルを立ち上げて、GUI開発の第一歩を踏み出すのじゃ！',
      takeaways: [
        {
          title: 'WSL2 + VSCode (Remote-WSL) が現代のデファクトスタンダード',
          description: '開発作業はWindowsのVSCodeで行い、裏側のコンパイルと実行はWSL上のUbuntuが行う。これが最もストレスのない最強の組み合わせです。'
        }
      ]
    },
    {
      id: 'sec-0-3',
      title: '0.3 【補足】各環境（WSL2 / 仮想マシン / 実機）の役割分担',
      explanationText: '組み込み・産業用開発において、すべての作業を1つの環境で行うことはありません。プロの現場では以下の3つの環境の「得意・不得意」を理解し、使い分けます。\n\n**1. WSL2（本サイトのメイン環境）**\n得意：VSCodeとの連携による最速のコーディング、GUIのレイアウト作成、マルチスレッド等の基本ロジック検証。\n苦手：独自のLinuxカーネルドライバの開発や、厳密なリアルタイム処理。\n\n**2. 完全仮想マシン（VirtualBox / VMWare）**\n得意：独自のカーネルモジュールのロード、OSの完全なデスクトップ画面の表示、複雑なネットワークルーティング（ブリッジ接続等）の検証。\n苦手：グラフィック描画（GPU仮想化が弱くQt Graphs等が重い）、ホスト(Windows)とのシームレスなファイル連携。\n\n**3. 実機（産業用PC / ターゲットボード）**\n得意：リアルタイムOSとしての厳密なタイマー処理（マイクロ秒単位）、GPIOや実センサーとの物理通信、最終的なハードウェアリソース下でのプロファイリング。\n苦手：実機上での重いコンパイル作業（クロスコンパイルして実行ファイルだけを送るのが基本）。',
      takeaways: [
        {
          title: '開発の黄金パターン',
          description: '全体の90%のコーディングをWSL2で行い、ネットワークやドライバの特殊な検証をVirtualBoxで行い、最後のシビアなリアルタイムテストを実機で行う、という役割分担が鉄則です。'
        }
      ]
    },
    {
      id: 'sec-0-4',
      title: '0.4 必須パッケージのインストール (Ubuntuの場合)',
      explanationText: 'それでは、WSL2上のUbuntuターミナルを開き、C++のコンパイラとQtの開発用ライブラリ、そしてビルドツールのCMakeをインストールします。',
      codeFiles: [
        {
          filename: 'Terminal',
          language: 'bash',
          description: '以下のコマンドを実行して必要なツール群を一括インストールします。',
          code: 'sudo apt update\nsudo apt install -y build-essential cmake gdb\nsudo apt install -y qtbase5-dev qtchooser qt5-qmake qtbase5-dev-tools\nsudo apt install -y qtdeclarative5-dev qml-module-qtquick-controls2'
        }
      ],
      takeaways: [
        {
          title: '【コラム】実務でRedHat系（AlmaLinux / Rocky Linux）を使いたい場合',
          description: '実務のターゲット機器がRedHat系の場合、開発環境もそちらに合わせたいことがあります。Microsoft StoreからAlmaLinux等をWSL2にインストール可能ですが、以下の違いに注意してください。\n\n1. コマンドとパッケージ名の違い: `sudo dnf install gcc-c++ qt5-qtbase-devel qt5-qtdeclarative-devel` のように読み替えます。\n2. Qtバージョンの罠: RedHat系の標準リポジトリはQtが古い(Qt5.9等)ことが多いです。最新のQtを使う場合は「EPELリポジトリ」を追加するか、Qt公式サイトのインストーラー(.run)を使って直接インストールする工夫が必要です。'
        },
        {
          title: '【重要コラム】実務における Qt 5 と Qt 6 の違い・移行ポイント',
          description: '本カリキュラムではUbuntu標準リポジトリで最も安定して導入できる Qt 5.15系 を基準に解説していますが、実務で最新の Qt 6 を扱う場合もアーキテクチャの根幹は共通です。以下の違いだけ頭に入れておけばスムーズに移行できます。\n\n1. **CMakeターゲット名**: Qt5では `Qt5::Widgets Qt5::Quick` と書きますが、Qt6では `Qt6::Widgets Qt6::Quick`（または `Qt::Widgets`）と記述します。\n2. **QMLのバージョン記述**: Qt5では `import QtQuick 2.15` のように明示しますが、Qt6ではバージョン番号を省略した `import QtQuick` が標準になります。\n3. **グラフィックスAPI**: Qt5はOpenGLが主軸でしたが、Qt6ではVulkan/Metal/DirectXを抽象化する「RHI (Rendering Hardware Interface)」が導入され、より高効率にGPUを活用できます。'
        }
      ]
    },
    {
      id: 'sec-0-5',
      title: '0.5 VSCodeとCMake Toolsのセットアップ',
      explanationText: '次に、コードエディタとしてVisual Studio Code (VSCode) を設定します。\n\nVSCodeを開き、以下の拡張機能をインストールしてください。\n\n1. **WSL** (Microsoft) - WindowsからWSLに接続するため\n2. **C/C++** (Microsoft)\n3. **CMake Tools** (Microsoft)\n4. **QML** (シンタックスハイライト用)\n\n※実務において「開発者ごとのPC環境差」を完全に撲滅し、CI/CDでヘッドレス自動ビルドを行う場合はDockerコンテナ化が鉄則です。コンテナ環境の構築手順は、姉妹メディア[シロクマC++開発自動化ラボ 第2章（Docker環境構築）](/auto/chapter/2)をご参照ください。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'ワークスペースの作成',
          description: 'WSLのターミナル上で開発用のフォルダ（例：`mkdir ~/qt_dashboard && cd ~/qt_dashboard`）を作成し、`code .` コマンドを叩いてVSCodeを開きます。',
          impact: 'ここがすべてのコードのルートディレクトリになります。'
        },
        {
          stepNumber: 2,
          title: 'CMakeキットの選択',
          description: 'VSCodeのコマンドパレット (Ctrl+Shift+P) から `CMake: Select a Kit` を選び、`GCC` (または `Clang`) を選択します。',
          impact: 'CMakeが自動的にコンパイラのパスを認識し、ビルド準備を整えます。'
        }
      ]
    },
    {
      id: 'sec-0-6',
      title: '0.6 最初のプロジェクト構成 (CMakeLists.txt)',
      explanationText: '環境が整ったか確認するため、最小構成のQtプロジェクトを作成します。以下の2つのファイルを作成してください。',
      codeFiles: [
        {
          filename: 'CMakeLists.txt',
          language: 'cmake',
          description: 'Qt5をリンクし、自動でMOC（Meta-Object Compiler）を走らせるCMake設定',
          code: 'cmake_minimum_required(VERSION 3.10)\nproject(QtDashboard VERSION 1.0.0 LANGUAGES CXX)\n\nset(CMAKE_CXX_STANDARD 17)\nset(CMAKE_CXX_STANDARD_REQUIRED ON)\n\n# QtのMOC, RCC, UICを自動化\nset(CMAKE_AUTOMOC ON)\nset(CMAKE_AUTORCC ON)\nset(CMAKE_AUTOUIC ON)\n\n# Qt5の必要なモジュールを検索\nfind_package(Qt5 COMPONENTS Widgets Quick REQUIRED)\n\nadd_executable(QtDashboard\n    main.cpp\n)\n\ntarget_link_libraries(QtDashboard\n  PRIVATE Qt5::Widgets Qt5::Quick\n)'
        },
        {
          filename: 'main.cpp',
          language: 'cpp',
          description: '空のウィンドウを表示する最小のQtコード',
          code: '#include <QApplication>\n#include <QWidget>\n\nint main(int argc, char *argv[]) {\n    QApplication app(argc, argv);\n\n    QWidget window;\n    window.resize(400, 300);\n    window.setWindowTitle("シロクマQt環境構築テスト");\n    window.show();\n\n    return app.exec();\n}'
        }
      ]
    },
    {
      id: 'sec-0-7',
      title: '0.7 【公式IDE】Qt Creatorの基本画面構成と操作ガイド（完全図解）',
      leadText: 'Qtの公式統合開発環境（IDE）である「Qt Creator」の実際の操作方法を徹底解説します。プロジェクトの開き方から、コード編集、ビルド・実行、デバッグ、エラー発生時の確認方法まで、実際の画面を見ながらマスターしましょう。',
      explanationText: `C++とQtによる本格的なGUI開発では、公式IDEである **Qt Creator** が現場で最も広く愛用されています。

ここでは、実際の開発プロジェクト（ソナー制御コンソール：\`SonarApp\`）を例に、Qt Creatorの基本操作をステップバイステップで解説します。

---

### 1. Qt Creatorの起動と基本レイアウト

Qt Creatorを開くと、左側にツールバー、中央にエディタ、下部に出力パネルが配置された直感的なワークスペースが表示されます。

![【図1】Qt Creatorの全体レイアウト（左端モードバー、左側プロジェクトツリー、中央エディタ、下部ステータスパネル）](/images/qtcreator/qtcreator_main_window.png)

#### ■ 画面を構成する4つの主要エリア
1. **左端モードセレクター (Mode Selector)**
   - **編集 (Ctrl+2)**: C++やQMLのソースコードを読み書きする基本画面（通常はここを使用）。
   - **デザイン (Ctrl+3)**: UIフォーム（.ui）やQMLをマウスドラッグ＆ドロップで視覚的に配置する「Qt Quick Designer / Qt Designer」。
   - **デバッグ (Ctrl+4)**: ブレークポイント停止時のスタックトレースや変数ウォッチ画面。
   - **プロジェクト (Ctrl+5)**: CMakeのビルド設定、実行時の引数、コンパイラKitの構成管理。
2. **プロジェクトツリー (Project Explorer)**
   - 開いているプロジェクトのフォルダ・ファイル構成を階層ツリーで表示します。
3. **中央エディタエリア (Editor Area)**
   - ファイルを開いていない時は、ショートカット検索（Ctrl+K）や直近開いたファイルの案内が表示されます。
4. **下部出力バー (Output Pane)**
   - ビルド結果、コンパイルエラー、実行時ログ（\`qDebug()\`）などを確認できます。

---

### 2. プロジェクトの展開とソースコードの開き方

左ペインのプロジェクト名（\`SonarApp\`）をクリックして展開すると、プロジェクトを構成するファイル群がカテゴリごとに一覧表示されます。

![【図2】SonarAppプロジェクトのツリー展開とmain.cppエディタ画面](/images/qtcreator/qtcreator_editor_tree.png)

- **\`CMakeLists.txt\`**: プロジェクトのビルド定義ファイル。ライブラリの追加やC++標準（C++17等）の設定を行います。
- **\`Header Files\`**: クラスの定義や関数のプロトタイプ宣言（\`mainwindow.h\`など）。
- **\`Source Files\`**: C++の実装コード（\`main.cpp\`, \`mainwindow.cpp\`など）。ダブルクリックすると中央エディタで即座に開いて編集できます。
- **\`Forms\`**: Qt Designerで視覚的に編集できるGUIレイアウトファイル（\`mainwindow.ui\`）。

> 🐧 ペンギン生徒: \`main.cpp\` を開くと、シンタックスハイライトが効いてC++のコードがとても見やすいです！上部に現在開いているファイル名と関数シンボルのジャンプメニュー（<Select Symbol>）があるのも便利ですね！

---

### 3. ビルドと実行（最重要アクションボタン）

Qt Creatorで最も頻繁に使う操作が、**画面左下に配置された3大アクションボタン**です。

| ボタン / アイコン | 操作名 | ショートカット | 役割と動作 |
| :--- | :--- | :--- | :--- |
| 🔨 **金槌アイコン** | **ビルド (Build)** | \`Ctrl+B\` (Mac: \`⌘+B\`) | コンパイルのみを実行。文法エラーやリンクエラーがないかを事前チェックします。 |
| ▶️ **緑の三角アイコン** | **実行 (Run)** | \`Ctrl+R\` (Mac: \`⌘+R\`) | **最重要操作！** 差分を自動ビルドした上でアプリを即座に起動します。 |
| 🐞 **虫付き緑三角** | **デバッグ開始** | \`F5\` | GDB/LLDBデバッガをアタッチして起動。ブレークポイントで一時停止できます。 |
| 💻 **PCアイコン** | **Kit / ターゲット切替** | - | \`Debug\`（開発用・最適化なし）と \`Release\`（製品配布用・高速実行）を切り替えます。 |

---

### 4. アプリケーションの起動確認（Sonar Control Console）

左下の **▶️（実行ボタン）** または **\`Ctrl+R\`** を押すと、バックグラウンドで高速なNinja/CMakeビルドが走り、ネイティブウィンドウがデスクトップ上に立ち上がります！

![【図3】ビルド・実行されたネイティブGUI画面（Sonar Control Console - Step 1）](/images/qtcreator/qtcreator_running_app.png)

実機やLinux上で動作する産業用ソナー制御画面（\`Sonar Control Console\`）のウィンドウが表示されました！
- **ソナー送信制御 (GroupBox)**: \`Ping 送信 (単発)\`、\`スキャン開始\` ボタン、ゲイン調整スライダー（0〜100 dB）
- **ステータス・通信ログ (Log Console)**: ミリ秒精度のタイムスタンプ付き動作ログ出力と消去機能

ボタンを押した時の画面の更新やスライダー操作は、すべてQtの核である **「シグナル＆スロット (Signals & Slots)」** 機構によってC++ロジックと連動しています（第1章・第3章で詳しく実装していきます）。

---

### 5. エラーが出たときの対処法（下部出力タブの活用）

ビルドに失敗したり、画面がうまく起動しない場合は、画面下部のタブを確認するのが鉄則です。

1. **\`4 コンパイル出力\` (Alt+4)**
   - コンパイラ（g++ / clang++）やCMakeから出力された生のメッセージが流れます。
   - エラーが発生すると**タブの文字が赤色**になります。赤文字で表示されたエラー行をダブルクリックすると、該当するソースコードの行に一瞬でジャンプできます。
2. **\`1 問題\` (Alt+1)**
   - コンパイルエラーや警告（Warning）がファイル名・行番号ごとに表形式で整理されて表示されます。
3. **\`3 アプリケーション出力\` (Alt+3)**
   - アプリケーションが実行中に \`qDebug()\` や \`std::cout\` で出力したログがリアルタイムに表示されます。

> 🐻‍❄️ シロクマ先生の指南: 「VSCodeとQt Creator、どちらを使うべきか？」という質問をよく受けるが、**Qt Quick/QMLのビジュアルデザイン機能や、C++のメモリ・シグナル追跡デバッガの親和性はQt Creatorが圧倒的**じゃ。普段はQt CreatorでGUIを作り、Webバックエンド連携や日常のメモ編集はVSCode、と両方の良さを使い分けるのがプロの流儀じゃぞ！`,
      takeaways: [
        {
          title: '開発の基本ループは「編集 → Ctrl+R（実行）」',
          description: 'コードを変更したら、左下の▶️ボタンを押すか `Ctrl+R` を叩くだけで、自動でCMakeビルドが走り即座に画面が起動します。'
        },
        {
          title: 'ビルドエラー時は「4 コンパイル出力」をダブルクリック',
          description: '赤文字でエラーが出たら、下部の「コンパイル出力」タブにあるエラーメッセージをダブルクリックすれば、原因のコード行へ一瞬でジャンプできます。'
        }
      ]
    }
  ]
};

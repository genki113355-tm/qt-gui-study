import { Chapter } from '../../types/curriculum';

export const x11LinuxGraphics: Chapter = {
  id: 98,
  slug: 'x11-wayland-linux-graphics',
  courseTrack: 'guide',
  category: 'column',
  title: '【特別付録】Linux GUIの心臓部：X11・MotifからモダンQtへ',
  subtitle: 'ソナー卓・産業管制の歴史から紐解くXlib/OpenGL・QPAアーキテクチャ',
  badge: '特別コラム',
  description: 'なぜLinuxのGUIは「サーバー・クライアント方式」なのか？ソナーや防衛・管制の現場で使われてきたX11＋MotifやXlib＋OpenGLの歴史と、Linux開発者が必ず直面する「xcbエラー」の深層、現代Qtへの進化を徹底解説します。',
  sections: [
    {
      id: 'sec-x11-1',
      title: '1. なぜLinuxのGUIは「サーバー・クライアント方式」なのか？',
      explanationText: `WindowsやmacOSのGUIに慣れた開発者がLinuxのGUIプログラミングに触れたとき、最初に戸惑うのが**「X Window System（X11）」のクライアント・サーバー構造**です。

通常、「サーバー」と聞くとネットワークの向こう側にあるWebサーバーなどを想像しますが、X11では用語の定義が日常感覚と逆になります。

\`\`\`text
【X Server（画面側）】: ディスプレイ、GPU、マウス、キーボードを直接握る親玉プロセス
      ▲
      │  X11 プロトコル（描画要求・マウス入力イベント）
      │  Unixドメインソケット: /tmp/.X11-unix/X0  または  TCP/IP
      ▼
【X Client（アプリ側）】: あなたが書いたQtアプリ、Firefox、端末エミュレータなど
\`\`\`

### 「DISPLAY=:0」の正体
LinuxでGUIアプリを起動するとき、シェル環境変数に \`DISPLAY=:0\` や \`DISPLAY=localhost:10.0\` が設定されているのを見たことがあるはずです。

- **\`DISPLAY=:0\`**: ローカルマシンの「0番目のディスプレイ」。実際には \`/tmp/.X11-unix/X0\` という**高速なUnixドメインソケット**を通じてローカルのX Serverと通信します。
- **\`DISPLAY=192.168.1.10:0\`**: ネットワーク越しのTCPポート（6000 + ディスプレイ番号）を通じて、別マシンの画面へ描画パケットを送信します。

### ネットワーク透過性と「SSH X11フォワーディング」
この「画面表示とアプリ本体がプロトコルで完全に分かれている」という思想のおかげで、Linuxでは極めて強力な運用が可能です。

例えば、工場内の制御盤や無人観測船に積まれたヘッドレス（ディスプレイ無接続）のLinuxサーバーに対し、手元のPCから以下のようにSSH接続します。

\`\`\`bash
ssh -X user@sonar-sensor-node
./my_qt_dashboard
\`\`\`

すると、**プログラムの計算処理は遠隔のサーバー上で行われつつ、ウィンドウの枠とボタンだけが手元のPCの画面に転送されて立ち上がります**。これこそがX11が40年にわたり産業インフラで生き残り続けている「ネットワーク透過性」の強みです。

> **💡 Windows 11 の「WSLg」も同じ仕組み**  
> Windows 11のWSL2でLinux GUIアプリがそのままウィンドウとして立ち上がるのは、マイクロソフトがWSL2の裏で軽量なWayland/XWaylandサーバー（RAIL技術）を動かし、RDP（リモートデスクトップ）プロトコルでWindowsホスト側に描画を中継しているためです。`,
      takeaways: [
        {
          title: 'X Serverは「画面側」、Clientは「アプリ側」',
          description: 'X11のサーバーは画面・入力を司り、クライアント（Qt）がソケット経由で描画命令を送る。'
        },
        {
          title: 'ネットワーク透過性',
          description: '描画命令がプロトコル化されているため、SSH経由で遠隔サーバーのGUIを手元に飛ばすことができる。'
        }
      ]
    },
    {
      id: 'sec-x11-2',
      title: '2. ソナー・防衛管制GUIの歴史：X11 ＋ Motif（OSF/Motif）の時代',
      explanationText: `当サイトの姉妹サイトである[水中音響・ソナー技術入門](https://shirokuma-tech.jp/sonar/)で扱うようなソナーシステム、あるいは航空管制、レーダー画面、鉄道の運転指令システムなどのミッションクリティカルな現場では、どのようなGUIが使われてきたのでしょうか？

### 1990〜2000年代：UNIXワークステーションとOSF/Motif
かつて、これらのハイエンド管制画面は Sun Microsystems（Solaris）、SGI（IRIX）、HP（HP-UX）といった高信頼UNIXワークステーションで構築されていました。

その上で標準GUIツールキットとして君臨していたのが **OSF/Motif（Open Software Foundation / Motif）** です。

\`\`\`text
┌───────────────────────────────────────────────┐
│ [■] Sonar Acoustic Monitor (Motif 2.1)    [_][X]│
├───────────────────────────────────────────────┤
│ [ File ] [ Mode ] [ Frequency ] [ Alarm ]     │
├───────────────────────────────────────────────┤
│ ┌───────────────┐ ┌─────────────────────────┐ │
│ │  SENSOR STATUS│ │  WATERFALL DISPLAY (GL) │ │
│ │  [■] HYDRO-01 │ │                         │ │
│ │  [ ] HYDRO-02 │ │                         │ │
│ │  [▲] GAIN +3dB│ │  (LOFAR Spectral Lines) │ │
│ └───────────────┘ └─────────────────────────┘ │
└───────────────────────────────────────────────┘
\`\`\`

無骨なグレーの立体ベベル（Bevel）の付いたボタンやメニューバーは、世界中の軍用コンソールや管制卓の象徴でした。

### C言語の限界：「コールバック地獄」と危険なポインタ
Motifは極めて堅牢でしたが、**純粋なC言語のAPI**（X Toolkit Intrinsics = Xt）で書かれていました。

これが開発者にとって大きな苦痛を生んでいました。

\`\`\`c
/* Motifにおける旧来のコールバック登録（C言語） */
void on_button_clicked(Widget w, XtPointer client_data, XtPointer call_data) {
    /* void* を無理やり生ポインタにキャスト（型安全性がゼロ） */
    SonarEngine* engine = (SonarEngine*)client_data;
    if (engine) {
        engine->trigger_ping();
    }
}

/* ウィジェット生成とコールバック接続 */
XtAddCallback(pingButton, XmNactivateCallback, on_button_clicked, (XtPointer)engine);
\`\`\`

- **型安全性の欠如**: 引数がすべて \`XtPointer\`（\`void*\`）のため、間違った型を渡してもコンパイルエラーにならず、実行時にクラッシュ（Segmentation Fault）する。
- **オブジェクト指向との断絶**: C言語の関数ポインタと構造体の塊であり、状態管理がスパゲッティ化しやすい。

### なぜQtの「シグナル＆スロット」が革命だったのか？
このMotifのコールバック地獄に対し、ノルウェーのTrolltech社（現The Qt Company）が投入したのが **Qt** でした。

\`\`\`cpp
// モダンQt（C++）のシグナル＆スロット
// 型が一致しない場合はコンパイル時にエラーを検出し、スレッド境界も自動調停
connect(pingButton, &QPushButton::clicked, engine, &SonarEngine::triggerPing);
\`\`\`

1. **コンパイル時の厳密な型チェック**（間違った引数はビルドが通らない）
2. **メモリの自動管理**（QObjectの親子関係によるメモリリーク防止）
3. **スレッド間通信の自動調停**（別スレッドからの画面更新でも安全にキューイングされる）

これらにより、防衛・産業界のエンジニアは「Motifの泥臭いC言語配管工事」から解放され、GUI開発の主役は一気にQtへと移行しました。

> **🏛️ 現場の実態：今でも動く「Linux上のMotif」**  
> 完全にQtへ移行したかというと、そうではありません。防衛や原子力、鉄道などの認証済みシステムでは、GUIをQtで全面的に書き直すと「安全認証の再取得」に数億円〜数十億円のコストがかかります。  
> そのため、ハードウェアをUNIX機から汎用Linux（RHEL/AlmaLinux等）に更新しつつ、**GUIコードは当時のMotif（OpenMotif）のままLinux上で再コンパイルして延命させている現役システム**が現在でも多数稼働しています。`,
      takeaways: [
        {
          title: 'UNIX管制画面の王者：Motif',
          description: '1990〜2000年代のソナーや航空管制卓は、UNIX上のX11＋Motifで独占されていた。'
        },
        {
          title: 'Qtへのパラダイムシフト',
          description: 'C言語の型安全性のないコールバック地獄を、C++の型安全なシグナル＆スロットが刷新した。'
        }
      ]
    },
    {
      id: 'sec-x11-3',
      title: '3. 極限のリアルタイム描画：Xlib / XCB ＋ OpenGL の世界',
      explanationText: `「ボタンやダイアログなどの一般UI」はMotifやQtで作れますが、**ソナーのLOFAR（周波数×時間カスケード）やBTR（方位×時間ウォーターフォール）のような超高頻度の波形データ**はどう描いていたのでしょうか？

### GUIウィジェットを通さない「ダイレクト描画」
一般的なGUIフレームワークの部品（ラベルやキャンバス）に毎秒数万点の音響FFTデータを流し込むと、UIスレッドが即座にパンクして画面がフリーズします。

そこで現場の先人エンジニアたちが取った手法が、**「Xlib / XCB でウィンドウの枠だけを作り、中身はOpenGL（GLX）でGPUへ直結する」** という職人技でした。

\`\`\`text
┌────────────────────────────────────────────────────────┐
│  X11 Window (Xlib / XCB でサーフェス領域を確保)        │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  OpenGL コンテキスト (GLX / EGL)                 │  │
│  │                                                  │  │
│  │  毎秒数千本のFFTスペクトル線をテクスチャへ直接転送 │  │
│  │  GPUシェーダーでカラーマップ（熱グラデーション）化  │  │
│  │  CPUのUI処理を一切介さず、垂直同期60fpsで滑らかに流す │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Xlib（または現代のXCB）** を呼び、X Server上にウィンドウID（XID）を1つ払い出してもらう。
2. **GLX（OpenGL Extension to X）** を使い、そのウィンドウIDにOpenGLレンダリングコンテキストを直接バインド（\`glXMakeCurrent\`）する。
3. GUIのイベントループとは完全に切り離された専用スレッドから、GPUのフレームバッファへ直接ピクセルを描き殴る。

これこそが、かつてのSGIワークステーションやLinux計測器が誇った「絶対にカクつかないソナーウォーターフォール」の正体です。

### 現代のQtはどう進化したのか？
「じゃあ現代でも生X11とOpenGLを手書きしなければならないのか？」というと、全くそんなことはありません。

現代のモダンQt（Qt 6）では、この「GPU直結アーキテクチャ」がフレームワーク内部に完全に美しく統合されました。

- **\`QOpenGLWidget\`**: ウィジェット階層の中にシームレスにOpenGL描画領域を埋め込める。
- **\`QQuickPaintedItem\`**: QMLの滑らかなUI要素として、C++の高速描画コールバックを組み込める（本サイトの第6章で実践）。
- **\`Qt Graphs\` / \`QCustomPlot\`**: 数万〜数十万ポイントのリアルタイム波形描画を、数行のC++コードでGPUアクセラレーション付きで実現可能。

> **🌊 水中音響・ソナーの信号処理を学びたい方へ**  
> ソナーのLOFARグラムやBTR、ビームフォーミング、パッシブ／アクティブソナーの物理・数理アルゴリズムそのものについては、姉妹サイト**『[水中音響・ソナー技術入門](https://shirokuma-tech.jp/sonar/)』**にて徹底解説しています。音響物理から学びたい方はぜひあわせてご参照ください！`,
      takeaways: [
        {
          title: 'GLXによるサーフェス直結',
          description: '超高頻度な音響波形は、GUI部品を介さずXlib+OpenGLでGPUテクスチャへダイレクトに転送されていた。'
        },
        {
          title: '現代Qtにおける統合',
          description: 'Qt 6ではQOpenGLWidgetやQt Graphsによって、職人技だったGPU直結描画が安全なAPIとして使える。'
        }
      ]
    },
    {
      id: 'sec-x11-4',
      title: '4. Qtが裏側でX11を操る「QPA (Qt Platform Abstraction)」と超有名エラーの完全解剖',
      explanationText: `ここまでの話を踏まえると、「QtアプリはLinux上でどうやってX11と会話しているのか？」という疑問が解けます。

その秘密が、Qtの内部アーキテクチャである **QPA (Qt Platform Abstraction)** です。

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ あなたが書いたC++ / QMLコード (ボタン, グラフ, ロジック) │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│                    Qt Core / Qt GUI                    │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│        QPA (Qt Platform Abstraction: 抽象化層)         │
├─────────────┬─────────────┬─────────────┬──────────────┤
│ xcb (X11用) │   wayland   │ eglfs (組込)│ windows / coco│
└──────┬──────┴──────┬──────┴──────┬──────┴──────────────┘
       │             │             │
       ▼             ▼             ▼
   X11 Server     Wayland      Linux DRM/KMS
 (libxcb.so)     Compositor    (X11不要の直描)
\`\`\`

Qtは特定のOSに依存したコードを持っていません。実行時に **プラグイン（.soファイル）** としてOS差分を読み込みます。Linuxのデスクトップ環境でQtアプリを動かす場合、デフォルトで **\`xcb\` プラグイン**（\`libqxcb.so\`）がロードされます。

---

### 全Linuxエンジニアが一度は絶望する超有名エラー
Linuxで自作のQtアプリを実行したり、Dockerコンテナ内で動かそうとしたとき、99%の開発者が以下のエラーに遭遇して頭を抱えます。

\`\`\`text
qt.qpa.plugin: Could not load the Qt platform plugin "xcb" in "" even though it was found.
This application failed to start because no Qt platform plugin could be initialized.
Reinstalling the application may fix this problem.

Available platform plugins are: eglfs, linuxfb, minimal, minimalegl, offscreen, vnc, wayland-egl, wayland, wayland-xcomposite-egl, wayland-xcomposite-glx, xcb.
Aborted (core dumped)
\`\`\`

「xcbは見つかった（even though it was found）のに、ロードできなかった」という謎のメッセージです。

### なぜこのエラーが起きるのか？（真因の解剖）
原因はシンプルです。**「\`libqxcb.so\` 自体はあるが、その \`libqxcb.so\` が裏でリンクしているLinuxのX11共有ライブラリがOS側に足りていない」** からです。

Qtのプラグインは動的にロード（\`dlopen\`）されるため、依存ライブラリが1つでも欠けていると、起動時に無言でロード失敗します。

### プロのトラブルシューティング手順（3ステップ）

#### ステップ1: デバッグログを有効化する
ターミナルで以下の環境変数を設定してアプリを実行します。これだけで、どの共有ライブラリが見つかっていないのかが丸裸になります。

\`\`\`bash
export QT_DEBUG_PLUGINS=1
./your_qt_app
\`\`\`

ログの末尾に、以下のような決定的な証拠が出力されます：
\`\`\`text
Cannot load library /usr/lib/qt6/plugins/platforms/libqxcb.so: (libxcb-cursor.so.0: cannot open shared object file: No such file or directory)
\`\`\`

#### ステップ2: ldd コマンドで依存関係を確認する
プラグイン本体に対して \`ldd\` を実行し、\`not found\` になっているライブラリを特定します。

\`\`\`bash
ldd /usr/lib/x86_64-linux-gnu/qt6/plugins/platforms/libqxcb.so | grep "not found"
\`\`\`

#### ステップ3: 不足パッケージをaptで一括インストールする
Ubuntu/Debian環境の場合、以下のX11関連ライブラリ群をインストールすれば100%解決します。

\`\`\`bash
sudo apt update
sudo apt install -y \\
    libxcb-cursor0 \\
    libxcb-xinerama0 \\
    libxkbcommon-x11-0 \\
    libxcb-icccm4 \\
    libxcb-image0 \\
    libxcb-keysyms1 \\
    libxcb-render-util0 \\
    libxcb-shape0 \\
    libxcb-sync1 \\
    libxcb-xfixes0
\`\`\`

X11の仕組みとQPAの存在を知っていれば、このエラーは怖いものではなく、数分でスマートに対処できる日常のトラブルシューティングに変わります。`,
      takeaways: [
        {
          title: 'QPA (Qt Platform Abstraction)',
          description: 'QtがLinux/Windows/macOSの差分を吸収する動的プラグインレイヤー。Linuxでは主に「xcb」が動く。'
        },
        {
          title: 'xcbエラーの解決法',
          description: '「export QT_DEBUG_PLUGINS=1」で欠落している共有ライブラリを特定し、aptでlibxcb関連を入れる。'
        }
      ]
    },
    {
      id: 'sec-x11-5',
      title: '5. X11 vs Wayland：次世代Linux HMIと組込みの未来',
      explanationText: `最後に、これからのLinux GUIが向かう先について整理します。

1984年に誕生したX11は、実に40年以上にわたりLinuxの画面を支えてきました。しかし現代の超高精細ディスプレイやGPUコンピューティングの観点から、限界が訪れています。

### X11の抱える構造的課題
1. **画面のテアリング（描画のズレ）**:  
   X11は描画タイミングと画面更新（VSync）が厳密に同期しないため、高速スクロール時や動画・オシロスコープ波形の描画で横縞のノイズ（テアリング）が発生しやすい。
2. **セキュリティの甘さ**:  
   X11では「すべてのクライアントが同列」に扱われます。つまり、1つの悪意あるアプリが、画面全体のキーストローク（キーロガー）や他ウィンドウの内容を盗聴できてしまいます。
3. **無駄なプロトコルの往復オーバーヘッド**:  
   グラフィックスカードのメモリ（VRAM）が数十GBある現代において、いちいちXプロトコルでピクセル通信をするのは非効率です。

### 次世代標準「Wayland」への移行
これを解決するために誕生したのが **Wayland** です。

Ubuntu 22.04 LTS 以降でも、デフォルトのセッションはX11からWaylandへと切り替わりました。

\`\`\`text
【X11方式】
  Qtアプリ ──(Xプロトコル)──> X Server ──(描画)──> ウィンドウマネージャ ──> 画面

【Wayland方式（超シンプル・高効率）】
  Qtアプリ ──(共有バッファ)──> Waylandコンポジタ (OS画面) ──> 画面
\`\`\`

Qtは最初期からWaylandにフル対応しています。環境変数を1つ変えるだけで、コードを1行も変えずにWaylandネイティブ描画へ切り替えることが可能です。

\`\`\`bash
# Waylandネイティブで起動
export QT_QPA_PLATFORM=wayland
./my_dashboard

# 従来のX11（XWayland）で互換動作
export QT_QPA_PLATFORM=xcb
./my_dashboard
\`\`\`

### 組込みLinuxの究極形：X11もWaylandも使わない「eglfs」
工場用FA機器や車載メーター（デジタルクラスタ）などの組込みLinuxでは、さらに過激な手法が取られます。

**「そもそも画面には自社のQt計器アプリしか表示しないのだから、X11もWaylandも不要である」** という思想です。

\`\`\`bash
# X11もWaylandも介さず、LinuxカーネルのDRM/KMSに直接OpenGL描画！
./my_dashboard -platform eglfs
\`\`\`

QPAの **\`eglfs\`** プラグインを使うと、QtはX11サーバーを完全にバイパスし、Linuxカーネルの **DRM/KMS（Direct Rendering Manager / Kernel Mode Setting）** を通じてGPUのフレームバッファを直接占有します。

- ウィンドウシステムのオーバーヘッドが **ゼロ**。
- メモリ消費量が最小、起動時間は **1秒未満**。
- 電源投入と同時に、計器画面がミリ秒単位で立ち上がる。

自動車のメーターパネルや医療機器、そして現代の高性能ソナーコンソールがフリーズせず極限のレスポンスを維持できるのは、この「Linuxグラフィックススタックを最適化できるQtの柔軟性」があるからこそです。

---

### まとめ：低レイヤーを知るエンジニアは強い
Webブラウザ上で動くフロントエンド開発とは異なり、C++とLinuxでGUIを作るエンジニアの最大の武器は、**「OSのウィンドウシステム、GPUドライバ、メモリ構造の境界線を自在に行き来できること」** にあります。

- X11とMotifの堅牢な歴史を知り、
- なぜQtのシグナル＆スロットが優れているのかを理解し、
- いざエラーが起きたときはQPAとソケット通信の深層まで潜って解決できる。

本サイトのカリキュラムを通じて、ぜひこの骨太なネイティブエンジニアの技術力を手に入れてください！`,
      takeaways: [
        {
          title: 'Waylandへの移行',
          description: 'X11のテアリングやセキュリティ問題を解決し、共有バッファによる高効率描画を実現する次世代標準。'
        },
        {
          title: '組込みLinuxの「eglfs」',
          description: 'X11もWaylandも介さず、LinuxカーネルのDRM/KMSに直結して1秒未満で起動する産業用グラフィックス技術。'
        }
      ]
    }
  ]
};

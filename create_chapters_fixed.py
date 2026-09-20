import os

files = {
    r"src\data\chapters\chapter9.ts": r"""import { Chapter } from '../../types/curriculum';

export const chapter9: Chapter = {
  id: 9,
  slug: 'chapter-9',
  courseTrack: 'reading',
  title: '第9章：Qtアプリのテスト：Qt TestフレームワークとUIの自動テスト',
  subtitle: '単体テストとGUIシミュレート',
  badge: '第3部：品質・デプロイ',
  description: 'ロジックの単体テスト（Unit Test）と、GUIのボタンクリックなどをシミュレートする自動テストの実装。',
  sections: [
    {
      id: 'sec-9-1',
      title: '9.1 Qt Testフレームワークとは？',
      explanationText: '産業用ソフトウェアにおいて「ボタンを押したら確実に意図した動作をするか」を保証する自動テストは必須です。Qtには標準で **Qt Test** という強力なテスティングフレームワークが組み込まれており、C++のビジネスロジックのテストだけでなく、GUIのイベント（マウスクリックやキーボード入力）のシミュレートまで一貫して行えます。',
      takeaways: [
        {
          title: 'Google Testとの違い',
          description: 'C++のロジック層だけならGoogle Testも強力ですが、Qtのシグナル＆スロットの検証や、QML/QWidgetの描画イベントを伴うテストには Qt Test が圧倒的に有利です。'
        }
      ]
    },
    {
      id: 'sec-9-2',
      title: '9.2 ロジッククラスの単体テスト (Unit Test)',
      explanationText: 'まずは画面(GUI)を持たない、純粋なデータ処理クラス（例：センサーデータを解析するクラス）のテストを書いてみましょう。\n\n`QObject` を継承したテストクラスを作成し、`private slots:` の中にテストケースを記述します。',
      codeFiles: [
        {
          filename: 'TestSensorParser.cpp',
          language: 'cpp',
          description: 'QCOMPARE や QVERIFY マクロを使ったテストの基本',
          code: `#include <QtTest>\n#include "SensorParser.h"\n\nclass TestSensorParser : public QObject {\n    Q_OBJECT\n\nprivate slots:\n    // 最初に1回だけ呼ばれる\n    void initTestCase() {\n        qDebug("テストを開始します");\n    }\n\n    // 各テストケース\n    void testValidData() {\n        SensorParser parser;\n        bool ok = parser.parse("TEMP:45.5");\n        \n        QVERIFY(ok == true); // 成功するか\n        QCOMPARE(parser.getTemperature(), 45.5); // 値が正しいか\n    }\n\n    void testInvalidData() {\n        SensorParser parser;\n        bool ok = parser.parse("ERROR_DATA");\n        \n        QVERIFY(ok == false);\n    }\n};\n\n// テストのメイン関数を自動生成\nQTEST_MAIN(TestSensorParser)\n#include "TestSensorParser.moc"`
        }
      ]
    },
    {
      id: 'sec-9-3',
      title: '9.3 GUI操作のシミュレーション',
      explanationText: 'Qt Testの真骨頂は、実際に画面を表示しなくても（ヘッドレスで）マウスクリックなどのUI操作をエミュレートできる点です。これにより、「ボタンを押したらテキストが切り替わるか」といったE2Eに近いテストをCI上で自動化できます。',
      codeFiles: [
        {
          filename: 'TestLoginWindow.cpp',
          language: 'cpp',
          description: 'QTest::mouseClick を使ったUIイベントのテスト',
          code: `void TestLoginWindow::testLoginButtonClick() {\n    LoginWindow window;\n    // ウィンドウを生成（表示はしなくてもよい）\n    \n    // 初期状態の確認\n    QCOMPARE(window.getStatusText(), QString("Please Login"));\n\n    // UI部品を取得\n    QPushButton *loginBtn = window.findChild<QPushButton*>("loginButton");\n    QVERIFY(loginBtn != nullptr);\n\n    // マウスクリックをシミュレート\n    QTest::mouseClick(loginBtn, Qt::LeftButton);\n\n    // クリック後の状態遷移を確認\n    QCOMPARE(window.getStatusText(), QString("Connecting..."));\n}`
        }
      ]
    },
    {
      id: 'sec-9-4',
      title: '9.4 CMakeとの統合 (CTest)',
      explanationText: '作成したテストは、CMakeの標準テストツールである `CTest` に登録することで、コマンド一発で全テストを走らせることができます。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'CMakeLists.txt への追記',
          description: '`enable_testing()` を宣言し、`add_test()` でテスト実行ファイルを登録します。',
          impact: 'これによりCI（GitHub Actionsなど）での自動化が容易になります。'
        },
        {
          stepNumber: 2,
          title: 'テストの実行',
          description: 'ターミナルで `make test` または `ctest -V` を実行すると、全テストのPass/Failが一覧表示されます。',
          impact: 'ビルドごとに品質を保証できます。'
        }
      ]
    }
  ]
};
""",
    r"src\data\chapters\chapter10.ts": r"""import { Chapter } from '../../types/curriculum';

export const chapter10: Chapter = {
  id: 10,
  slug: 'chapter-10',
  courseTrack: 'reading',
  title: '第10章：Linux環境でのパフォーマンス・プロファイリング',
  subtitle: 'ボトルネックの解析とフレーム安定化',
  badge: '第3部：品質・デプロイ',
  description: 'アプリが重い・メモリを食う時の原因特定。ボトルネックの解析とフレームレート安定化の手法。',
  sections: [
    {
      id: 'sec-10-1',
      title: '10.1 C++とメモリリークの恐怖',
      explanationText: 'C++開発において最も恐ろしいバグの一つが「メモリリーク」です。長時間稼働する計器ダッシュボードでメモリリークが発生すると、数日後にシステムがクラッシュし、重大な事故に繋がります。\n\nQtは親オブジェクトが子を破棄するツリー構造（Object Tree）を持っていますが、親を設定し忘れた `new` や、生ポインタの管理ミスによって容易にリークが発生します。',
      takeaways: [
        {
          title: 'スマートポインタの活用',
          description: '第8章で学んだ通り、現代のC++では生ポインタの `new/delete` を避け、`std::unique_ptr` や `std::shared_ptr` を使うのが基本の防衛策です。'
        }
      ]
    },
    {
      id: 'sec-10-2',
      title: '10.2 Valgrind (Memcheck) によるメモリ解析',
      explanationText: 'Linux環境には、メモリリークを検出するための最強のツール **Valgrind** が存在します。プログラムをValgrind経由で起動するだけで、終了時に「どこで確保されたメモリが解放されていないか」をソースコードの行番号付きで指摘してくれます。',
      codeFiles: [
        {
          filename: 'Terminal',
          language: 'bash',
          description: 'Valgrindを使ったメモリ解析コマンド',
          code: `# インストール\nsudo apt install valgrind\n\n# Memcheckツールを使ってQtアプリを起動\nvalgrind --leak-check=full --show-leak-kinds=all ./QtDashboard`
        }
      ]
    },
    {
      id: 'sec-10-3',
      title: '10.3 HotspotとperfによるCPUボトルネック解析',
      explanationText: '「画面の描画がカクつく（60fps出ない）」「ボタンの反応が遅い」といったパフォーマンス問題（ボトルネック）を特定するには、Linux標準のプロファイラである `perf` を使用します。\n\nしかし `perf` の出力は人間には読みにくいため、GUIで結果を可視化する **Hotspot** というツール（実はこれもQtで作られています）を組み合わせて分析するのがモダンな手法です。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'perf でデータを記録',
          description: '`perf record -g ./QtDashboard` コマンドでアプリを起動し、重い操作を実行してから終了します。`perf.data` という記録ファイルが生成されます。',
          impact: 'アプリのどの関数に何ミリ秒かかったかのコールスタックが記録されます。'
        },
        {
          stepNumber: 2,
          title: 'Hotspot でフレームグラフを開く',
          description: 'Hotspotアプリで `perf.data` を開くと、「Flame Graph（炎のようなグラフ）」が表示され、一番幅が広い（時間を食っている）関数が一目で特定できます。',
          impact: '「なんとなくここが重そう」という勘ではなく、データに基づいた確実なコード最適化が可能になります。'
        }
      ]
    },
    {
      id: 'sec-10-4',
      title: '10.4 GUIスレッドのブロックを避ける',
      explanationText: 'ボトルネック解析で最もよく見つかるアンチパターンが、「GUIスレッド（メインスレッド）の中で重いループ計算やネットワーク通信を行っている」というものです。\n\nこれを見つけたら、第5章で学んだ `QThread` と Worker パターンを使って処理を別スレッドに逃がし、GUIのフレームレートを安定させることが重要です。',
      takeaways: []
    }
  ]
};
""",
    r"src\data\chapters\chapter11.ts": r"""import { Chapter } from '../../types/curriculum';

export const chapter11: Chapter = {
  id: 11,
  slug: 'chapter-11',
  courseTrack: 'reading',
  title: '第11章：LinuxでのQtアプリのデプロイ（linuxdeployqt）',
  subtitle: 'パッケージング技術と.soの同梱',
  badge: '第3部：品質・デプロイ',
  description: '依存する共有ライブラリ（.so）を一つのパッケージにまとめ、別のLinux PCでもそのまま動くようにするパッケージング技術。',
  sections: [
    {
      id: 'sec-11-1',
      title: '11.1 Linuxの「依存関係地獄 (Dependency Hell)」',
      explanationText: 'Windowsではアプリに必要な `.dll` を同じフォルダに入れて配布するのが一般的ですが、Linuxの世界ではシステム全体の共有ライブラリ（`/usr/lib/` などの `.so` ファイル）に依存して動くのが基本です。\n\nそのため、「開発機（Ubuntu 22.04）でビルドした実行ファイルを、客先の別のLinux PCにコピーして実行したら、ライブラリのバージョンが違って起動しない」というトラブルが日常茶飯事です。',
      takeaways: [
        {
          title: '動的リンクの罠',
          description: '`ldd ./QtDashboard` というコマンドを叩くと、アプリが依存している膨大な数の `.so` ファイルのリストが表示されます。これらがターゲット機にも全く同じように存在している必要があります。'
        }
      ]
    },
    {
      id: 'sec-11-2',
      title: '11.2 linuxdeployqt の活用',
      explanationText: 'この問題を解決するために、Qtが提供しているのが（コミュニティ製ツールの） **`linuxdeployqt`** です。これは、Windows版の `windeployqt` のLinux版に相当します。\n\nこのツールは、実行ファイルが必要とするQtの共有ライブラリ（`libQt5Core.so` など）やプラグインを自動でかき集め、実行ファイルと同じフォルダにパッキングしてくれます。',
      codeFiles: [
        {
          filename: 'Terminal',
          language: 'bash',
          description: 'linuxdeployqt を使ったパッケージング',
          code: `# 1. ツールをダウンロードして実行権限を付与\nwget -c "https://github.com/probonopd/linuxdeployqt/releases/download/continuous/linuxdeployqt-continuous-x86_64.AppImage"\nchmod a+x linuxdeployqt-continuous-x86_64.AppImage\n\n# 2. パッケージングを実行\n./linuxdeployqt-continuous-x86_64.AppImage ./bin/QtDashboard -appimage`
        }
      ]
    },
    {
      id: 'sec-11-3',
      title: '11.3 AppImage 形式での配布',
      explanationText: '上記のコマンドで `-appimage` オプションをつけることで、Linux向けのポータブルアプリフォーマットである **AppImage** ファイル（例：`QtDashboard-x86_64.AppImage`）が生成されます。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'AppImageの特徴',
          description: 'Macの `.dmg` やWindowsの `.exe` (ポータブル版) のように、インストール不要で、ファイルをダブルクリック（またはターミナルから実行）するだけで動きます。',
          impact: '内部に必要なライブラリがすべて内包されているため、OSのバージョン違いによるトラブルを劇的に減らせます。'
        },
        {
          stepNumber: 2,
          title: 'より強固な手段（Docker / Flatpak）',
          description: 'さらに現代的なアプローチとして、GUIごとDockerコンテナに封じ込める手法や、Flatpakを利用したサンドボックス型配布もエンタープライズ領域で普及してきています。',
          impact: 'ターゲットマシンの要件（組み込み機器か、デスクトップPCか）に合わせて最適なデプロイ手法を選択します。'
        }
      ]
    }
  ]
};
""",
    r"src\data\chapters\chapter12.ts": r"""import { Chapter } from '../../types/curriculum';

export const chapter12: Chapter = {
  id: 12,
  slug: 'chapter-12',
  courseTrack: 'reading',
  title: '第12章：実践：産業用ダッシュボードを完成させる',
  subtitle: '全知識を結集した統合システム',
  badge: '第3部：品質・デプロイ',
  description: '全ての知識を結集し、レーダーチャート、円形メーター、波形オシロスコープを備えた統合システムを完成させる。',
  sections: [
    {
      id: 'sec-12-1',
      title: '12.1 アーキテクチャの総括',
      explanationText: 'これまでの章で学んできた技術をすべて統合し、ひとつの強固な「産業用ダッシュボード（HMI）」を完成させます。\n\nシステム全体は以下のような美しい3層アーキテクチャで構成されています。',
      takeaways: [
        {
          title: '1. フロントエンド層 (QML / Qt Quick)',
          description: 'GPUアクセラレーションを効かせた滑らかなアニメーションとレイアウト。C++のロジックを一切持たず、プロパティのバインディングだけで状態を表示します。'
        },
        {
          title: '2. プレゼンテーション層 (C++ QObject)',
          description: '`Q_PROPERTY` と `Q_INVOKABLE` を使って、QMLとバックエンドを繋ぐ橋渡し（ViewModel）の役割を果たします。'
        },
        {
          title: '3. バックエンド・ワーカ層 (C++ QThread)',
          description: 'TCP/UDPでのセンサーデータの受信や、重い波形処理の計算を別スレッドで実行し、安全にシグナルで結果をUIに伝達します。'
        }
      ]
    },
    {
      id: 'sec-12-2',
      title: '12.2 最終プロダクトの仕様',
      explanationText: '完成したダッシュボードは、以下の要件を満たすミッションクリティカルな仕様となっています。\n\n* **リアルタイム波形描画**: QCustomPlot / Qt Graphs を用いた60fpsのセンサー波形表示\n* **マルチスレッド処理**: データのパース処理による画面フリーズを完全に排除\n* **メモリ安全**: モダンC++ (スマートポインタ) を駆使したリークのない運用\n* **Linuxネイティブ**: WSL2(Ubuntu) 上で開発し、パッケージ化されたポータブル仕様',
      codeFiles: []
    },
    {
      id: 'sec-12-3',
      title: '12.3 次のステップ：組み込みLinux（Yocto）への道',
      explanationText: 'おめでとうございます！これであなたは、PC（Linuxデスクトップ）上で動作するプロ水準のQt GUIアプリケーションを作れるようになりました。\n\nここから先のプロフェッショナルな領域として、**「クロスコンパイル」** があります。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'クロスコンパイル環境の構築',
          description: 'ターゲットとなる実機（Raspberry Pi や NXP i.MX系ボードなど）のCPUアーキテクチャ（ARMなど）向けに、PC上でコンパイルを行う技術です。',
          impact: '「Yocto Project」や「Buildroot」といった組み込みLinuxのビルドシステムと組み合わせることで、OSからGUIアプリまでを一体化した専用ファームウェアを作ることができます。'
        },
        {
          stepNumber: 2,
          title: '終わらない技術探求',
          description: 'Qtは自動車のデジタルメーターパネル（IVI）や、医療用ディスプレイ、フライトシミュレータなど、世界中の最先端の現場で使われ続けています。ここで得たC++とアーキテクチャの知識は、どんな複雑なシステム開発でもあなたの最強の武器となるはずです。',
          impact: '素晴らしいHMIエンジニアリングの世界へようこそ！'
        }
      ]
    }
  ]
};
"""
}

for path, content in files.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Created chapters 9-12 with raw strings and backticks for code blocks")

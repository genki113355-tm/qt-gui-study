import { Chapter } from '../../types/curriculum';

export const chapter9: Chapter = {
  id: 9,
  slug: 'chapter-9',
  courseTrack: 'reading',
  courseChapterCode: 'Ch.9',
  title: '第9章：Qtアプリのテスト：Qt TestフレームワークとUIの自動テスト',
  subtitle: '単体テストとGUIシミュレート',
  badge: '第3部：品質・デプロイ',
  seoDescription: 'Qt Test（QTest）フレームワークを用いたC++単体テストとGUIシミュレート自動テスト。QCOMPARE、QSignalSpy、QTest::mouseClickの使い方を解説。',
  githubSnapshot: {
    tagOrBranch: 'ch09-test',
    folderPath: 'examples/ch09-test-automation',
    url: 'https://github.com/genki113355-tm/qt-gui-study/tree/main/examples/ch09-test-automation',
    description: '第9章の完成コード（Qt Testによる単体テスト・QSignalSpy・GUIシミュレーション）',
    cloneCommand: 'git clone https://github.com/genki113355-tm/qt-gui-study.git && cd qt-gui-study/examples/ch09-test-automation',
  },
  prerequisites: [
    {
      title: 'Qt Testフレームワークとテスト駆動開発',
      term: 'Qt Test (QTest)',
      description: 'Qt公式の単体テスト・GUI統合テストフレームワーク。private slotsが自動的に各テストケースとして実行されます。',
      labLink: '/auto/chapter-3',
      labLabel: 'Autoラボ第3章で復習',
    },
    {
      title: 'QSignalSpyによる非同期シグナル検証',
      term: 'QSignalSpy',
      description: 'Qtシグナルの発火回数や引数の値を記録・検証できるテスト用ヘルパークラス。',
    },
    {
      title: 'QVERIFY / QCOMPAREによるアサーション',
      term: 'アサーションマクロ',
      description: 'QVERIFY（条件判定）やQCOMPARE（値一致検証）などのテスト判定マクロ。',
    },
  ],
  relatedLabs: [
    {
      title: 'pytestによるPythonテスト自動化の基礎',
      labName: 'シロクマC++自動化ラボ',
      badge: 'Chap 3',
      url: '/auto/chapter-3',
      description: 'テスト駆動開発（TDD）の基礎とフィクスチャを用いた単体テスト構築手法を学びます。',
      icon: '🧪',
    },
    {
      title: 'PlaywrightによるWeb UI自動テストの実践',
      labName: 'シロクマC++自動化ラボ',
      badge: 'Chap 5',
      url: '/auto/chapter-5',
      description: 'GUI自動テストとCIパイプライン統合のノウハウを深掘りします。',
      icon: '🎭',
    },
  ],
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
          code: `#include <QtTest>
#include "SensorParser.h"

class TestSensorParser : public QObject {
    Q_OBJECT

private slots:
    // 最初に1回だけ呼ばれる
    void initTestCase() {
        qDebug("テストを開始します");
    }

    // 各テストケース
    void testValidData() {
        SensorParser parser;
        bool ok = parser.parse("TEMP:45.5");
        
        QVERIFY(ok == true); // 成功するか
        QCOMPARE(parser.getTemperature(), 45.5); // 値が正しいか
    }

    void testInvalidData() {
        SensorParser parser;
        bool ok = parser.parse("ERROR_DATA");
        
        QVERIFY(ok == false);
    }
};

// テストのメイン関数を自動生成
QTEST_MAIN(TestSensorParser)
#include "TestSensorParser.moc"`
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
          code: `void TestLoginWindow::testLoginButtonClick() {
    LoginWindow window;
    // ウィンドウを生成（表示はしなくてもよい）
    
    // 初期状態の確認
    QCOMPARE(window.getStatusText(), QString("Please Login"));

    // UI部品を取得
    QPushButton *loginBtn = window.findChild<QPushButton*>("loginButton");
    QVERIFY(loginBtn != nullptr);

    // マウスクリックをシミュレート
    QTest::mouseClick(loginBtn, Qt::LeftButton);

    // クリック後の状態遷移を確認
    QCOMPARE(window.getStatusText(), QString("Connecting..."));
}`
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

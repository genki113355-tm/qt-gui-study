import { Chapter } from '../../types/curriculum';

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

import { Chapter } from '../../types/curriculum';

export const chapter3: Chapter = {
  id: 3,
  slug: 'chapter-3',
  courseTrack: 'classic',
  courseChapterCode: 'Ch.3',
  title: '第3章：Qtの根幹「シグナル＆スロット」とオブジェクト指向設計',
  subtitle: 'コールバック地獄を解消する疎結合アーキテクチャ',
  badge: '第1部：Qtアーキテクチャ',
  description: 'コールバック地獄を解消するQt最大の発明。コンポーネント間の疎結合なイベント駆動アーキテクチャを学びます。',
  seoDescription: 'Qtの核となるシグナル＆スロット機構。新旧connect構文の型安全性比較とMOCの仕組み、疎結合なイベント駆動アーキテクチャを解説。',
  githubSnapshot: {
    tagOrBranch: 'ch02-signals',
    folderPath: 'examples/ch02-signals-slots',
    url: 'https://github.com/genki113355-tm/qt-gui-study/tree/main/examples/ch02-signals-slots',
    cloneCommand: 'git clone https://github.com/genki113355-tm/qt-gui-study.git && cd qt-gui-study/examples/ch02-signals-slots'
  },
  prerequisites: [
    { title: 'C++の関数ポインタとコールバック関数の基本概念', labLink: '/cpp/chapter-classic-8-function-pointers-callbacks', labLabel: 'C++ラボ第8章で復習' },
    { title: 'オブジェクト指向におけるObserver（オブザーバー）パターンの役割' },
    { title: '第2章までのQMLレイアウト基本構文' }
  ],
  relatedLabs: [
    {
      title: 'コールバックと関数ポインタの基礎',
      labName: 'シロクマC++ラボ',
      url: '/cpp/chapter-classic-8-function-pointers-callbacks',
      badge: 'Classic 8',
      description: 'C言語スタイルの関数ポインタからモダンC++のstd::function、ラムダ式、Observerパターンへの進化を学べます。',
      icon: '👾'
    }
  ],
  umlDiagram: {
    diagramType: 'sequence',
    title: 'C++ ↔ QML シグナル＆スロット データフロー シーケンス図',
    subtitle: 'フロントエンド(QML)の操作からC++ロジック実行、およびバックエンド通知までの疎結合フロー',
    description: 'QMLのボタンイベント発火からC++スロット実行、およびC++シグナル発火によるQML状態更新の完全なやり取りを示します。',
    sequenceParticipants: [
      'Operator (User)',
      'QML UI (Button / View)',
      'BackendSystem (QObject)',
      'Engine (Core Loop)'
    ],
    sequenceMessages: [
      {
        from: 'Operator (User)',
        to: 'QML UI (Button / View)',
        message: 'Click "Start Engine" Button',
        cppCodeSnippet: 'onClicked: backend.startSystem()'
      },
      {
        from: 'QML UI (Button / View)',
        to: 'BackendSystem (QObject)',
        message: 'Invoke Slot startSystem()',
        cppCodeSnippet: 'void startSystem() override'
      },
      {
        from: 'BackendSystem (QObject)',
        to: 'Engine (Core Loop)',
        message: 'Execute Hardware Initialization',
        cppCodeSnippet: 'hardware->initialize()'
      },
      {
        from: 'Engine (Core Loop)',
        to: 'BackendSystem (QObject)',
        message: 'Init Succeeded (Status: RUNNING)',
        isReturn: true
      },
      {
        from: 'BackendSystem (QObject)',
        to: 'QML UI (Button / View)',
        message: 'emit systemStatusChanged("RUNNING")',
        cppCodeSnippet: 'emit systemStatusChanged("RUNNING")'
      },
      {
        from: 'QML UI (Button / View)',
        to: 'QML UI (Button / View)',
        message: 'Update UI Badge & Glow Animation'
      }
    ],
    codeMappingNotes: [
      'UI側はC++の内部実装（ハードウェア通信やタイマー）を一切知らず、ただSlotを呼ぶだけ。',
      'C++側もUI側の画面構成（文字色やボタン配置）を一切知らず、ただSignalをemitするだけ。',
      'この完全な疎結合性（Observerパターン）により、GUIデザインの刷新とC++コアロジックの改善を完全並行で進められます。'
    ]
  },
  sections: [
    {
      id: 'sec3-1',
      title: 'コールバック関数の限界と「疎結合」の必要性',
      explanationText: 'C言語や従来のシステムプログラミングにおいて、イベント（例：ボタンが押された、データを受信した）を通知する際には「関数ポインタ」を用いたコールバックがよく使われます。\n\nしかし、この方式では「ボタン」が「アクションを実行する関数」のポインタを直接知っている必要があり、部品間の結合度が極めて高くなってしまいます（密結合）。これでは、UIを変更するたびにバックエンドのコードも修正しなければならず、スパゲティコードの温床になります。\n\n※この「送信側と受信側を切り離す（疎結合化）」という思想は、オブジェクト指向設計における**Observerパターン**そのものです。モダンC++での関数オブジェクトやObserverパターンの実装メカニズムは、姉妹メディア[シロクマC++ラボ（オブジェクト指向・デザインパターン解説）](/cpp/)で詳しく体系化されています。',
      takeaways: [
        {
          title: '密結合の罠',
          description: 'Aが起きたらBをする、という処理を直接繋ぐと、プロジェクトが巨大化した際に保守が不可能になります。'
        }
      ]
    },
    {
      id: 'sec3-2',
      title: 'Qtの切り札「シグナル＆スロット」',
      explanationText: 'Qtはこの問題を解決するために**「シグナル（Signal）」と「スロット（Slot）」**という独自の概念を導入しました。\n\n- **シグナル**: 「何かが起きた！」という放送（ブロードキャスト）です。誰が聞いているかは気にしません。\n- **スロット**: その放送を受信した時に実行される処理（関数）です。\n\nこれらは `QObject::connect()` という仕組みで後から繋ぎ合わせることができます。つまり、UI（ボタン）はただ「押された（clicked）」というシグナルを投げるだけでよく、C++のバックエンド処理について一切知らなくて良いのです。',
      codeFiles: [
        {
          filename: 'BackendSystem.h',
          language: 'cpp',
          description: 'バックエンドクラス（シグナルとスロットの定義）',
          code: `#pragma once
#include <QObject>
#include <QDebug>

class BackendSystem : public QObject
{
    // WHY: [Q_OBJECT マクロ]
    // QtのMOC（メタオブジェクトコンパイラ）を起動させ、シグナル/スロットやリフレクションコードを自動生成させるために必須！
    Q_OBJECT

public:
    explicit BackendSystem(QObject *parent = nullptr) : QObject(parent) {}

public slots:
    // WHY: [public slots] QMLや他オブジェクトからシグナル経由で呼び出されるハンドラ
    void startSystem() {
        qDebug() << "システムが起動しました。エンジン点火！";
        // WHY: [emit] シグナル発火。接続されている全スロットへメッセージがブロードキャストされる
        emit systemStatusChanged("RUNNING");
    }

signals:
    // WHY: [signals] 宣言のみ行い、実装コードはMOCが自動生成する。戻り値は常にvoid
    void systemStatusChanged(const QString &status);
};`
        },
        {
          filename: 'ConnectSyntaxComparison.cpp',
          language: 'cpp',
          description: '新旧 connect 構文の違いと型安全性',
          code: `// WHY: [旧記法 (Qt 4以前 / 文字列ベースマクロ)]
// QObject::connect(sender, SIGNAL(valueChanged(int)), receiver, SLOT(updateValue(int)));
// 欠点: 文字列展開のため、シグナル名や引数型のタイポがあってもコンパイルは成功してしまい、
// 実行時に初めてコンソールに "No such slot" と警告が出て接続が失敗する致命的リスクがあった。

// WHY: [新記法 (Qt 5/6推奨 / メンバ関数ポインタ)]
// QObject::connect(sender, &Sender::valueChanged, receiver, &Receiver::updateValue);
// 利点: C++11メンバ関数ポインタを活用するため、引数型の不一致や関数名の誤りが
// コンパイル時に100%エラーとして捕捉される！また、ラムダ式をスロットとして直接渡すことも可能。
QObject::connect(&backend, &BackendSystem::systemStatusChanged, [](const QString &status) {
    qDebug() << "ステータス更新検知 (ラムダスロット):" << status;
});`
        },
        {
          filename: 'main.cpp',
          language: 'cpp',
          description: 'バックエンドとQMLを繋ぎ合わせるエントリーポイント',
          code: `#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include "BackendSystem.h"

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);
    QQmlApplicationEngine engine;

    BackendSystem backend;

    // WHY: [setContextProperty] C++インスタンスをQMLのグローバルスコープに"backend"名で公開
    engine.rootContext()->setContextProperty("backend", &backend);

    engine.load(QUrl(QStringLiteral("qrc:/main.qml")));
    if (engine.rootObjects().isEmpty())
        return -1;

    return app.exec();
}`
        }
      ],
      takeaways: [
        {
          title: 'Q_OBJECT マクロ',
          description: 'シグナル＆スロットを使用するクラスには必ず Q_OBJECT マクロを記述します。これによりMOC（Meta-Object Compiler）が裏で必要なコードを自動生成してくれます。'
        },
        {
          title: '型安全な新connect構文の徹底',
          description: '旧来のSIGNAL()/SLOT()マクロは避け、&Sender::signalName を使ったメンバ関数ポインタ構文を使うことで、タイポを実行時ではなくコンパイル時に100%検出できます。'
        }
      ]
    }
  ]
};

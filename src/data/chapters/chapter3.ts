import { Chapter } from '../../types/curriculum';

export const chapter3: Chapter = {
  id: 3,
  slug: 'chapter-3',
  courseTrack: 'classic',
  title: '第3章：Qtの根幹「シグナル＆スロット」とオブジェクト指向設計',
  subtitle: 'コールバック地獄を解消する疎結合アーキテクチャ',
  badge: '第1部：Qtアーキテクチャ',
  description: 'コールバック地獄を解消するQt最大の発明。コンポーネント間の疎結合なイベント駆動アーキテクチャを学びます。',
  sections: [
    {
      id: 'sec3-1',
      title: 'コールバック関数の限界と「疎結合」の必要性',
      explanationText: 'C言語や従来のシステムプログラミングにおいて、イベント（例：ボタンが押された、データを受信した）を通知する際には「関数ポインタ」を用いたコールバックがよく使われます。\n\nしかし、この方式では「ボタン」が「アクションを実行する関数」のポインタを直接知っている必要があり、部品間の結合度が極めて高くなってしまいます（密結合）。これでは、UIを変更するたびにバックエンドのコードも修正しなければならず、スパゲティコードの温床になります。',
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
    Q_OBJECT // Qtのメタオブジェクトシステムを有効化する魔法のマクロ

public:
    explicit BackendSystem(QObject *parent = nullptr) : QObject(parent) {}

public slots:
    // QML（フロントエンド）から呼ばれる処理
    void startSystem() {
        qDebug() << "システムが起動しました。エンジン点火！";
        // 処理が終わったら、フロントエンドに結果を通知する
        emit systemStatusChanged("RUNNING");
    }

signals:
    // C++からQMLへ状態の変化を伝えるシグナル
    void systemStatusChanged(const QString &status);
};`
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

    // バックエンドクラスをインスタンス化
    BackendSystem backend;

    // QML側から "backend" という名前でこのインスタンスにアクセスできるように登録
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
          title: 'emit キーワード',
          description: 'シグナルを発火する際には emit というキーワードを使います（実態はただのマクロですが、可読性を高めます）。'
        }
      ]
    }
  ]
};

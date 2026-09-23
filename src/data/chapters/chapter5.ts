import { Chapter } from '../../types/curriculum';

export const chapter5: Chapter = {
  id: 5,
  slug: 'chapter-5',
  courseTrack: 'modern',
  courseChapterCode: 'Ch.5',
  title: '第5章：マルチスレッド設計：信号処理スレッドからGUIへの安全なデータ転送',
  subtitle: 'フリーズさせない非同期処理',
  badge: '第2部：マルチスレッド',
  seoDescription: 'Qt 6におけるマルチスレッドプログラミングとQueuedConnection、QThread::moveToThreadパターン、GUIスレッドをフリーズさせない安全な非同期データ転送を解説。',
  githubSnapshot: {
    tagOrBranch: 'ch05-multithread',
    folderPath: 'examples/ch05-multithreading',
    url: 'https://github.com/genki113355-tm/qt-gui-study/tree/main/examples/ch05-multithreading',
    description: '第5章の完成コード（QThread::moveToThreadによる非同期ワーカースレッド設計）',
    cloneCommand: 'git clone https://github.com/genki113355-tm/qt-gui-study.git && cd qt-gui-study/examples/ch05-multithreading',
  },
  prerequisites: [
    {
      title: 'QueuedConnection（スレッド間シグナル＆スロット）',
      term: 'QueuedConnection',
      description: 'スレッドをまたぐシグナル＆スロットで自動適用される通信方式。引数はイベントキューを介して受信側スレッドで安全にディスパッチされます。',
    },
    {
      title: 'スレッドアフィニティとmoveToThread',
      term: 'スレッドアフィニティ',
      description: 'QObjectが属するスレッド。moveToThread()により、そのオブジェクトのスロットが実行されるスレッドを変更できます。',
    },
    {
      title: 'GUIスレッド（メインスレッド）の非ブロッキング原則',
      term: 'メイン（GUI）スレッド',
      description: 'UIイベントループを処理するスレッド。ここで重い処理を行うと画面フリーズ（応答なし）が発生します。',
      labLink: '/cpp/classic/chapter-17',
      labLabel: 'C++ラボ第17章で復習',
    },
  ],
  relatedLabs: [
    {
      title: 'std::threadと並行処理の基礎',
      labName: 'シロクマC++ラボ',
      badge: 'Classic 17',
      url: '/cpp/classic/chapter-17',
      description: '標準C++のstd::threadやstd::mutex、レースコンディションの回避方法を体系的に学びます。',
      icon: '🧵',
    },
  ],
  description: 'GUIをフリーズさせない！ワーカースレッドの構築と、スレッド間でのシグナル・スロットを通じた安全なデータ受け渡しを学びます。',
  sections: [
    {
      id: 'sec5-1',
      title: 'メインスレッド（GUIスレッド）の掟',
      explanationText: 'Qtに限らず、すべてのGUIフレームワークには鉄則があります。\n\n**「GUIスレッド（メインスレッド）をブロックしてはいけない」**\n\nファイル読み込み、ネットワーク通信、重い画像処理、複雑な数理アルゴリズム計算などをメインスレッドで実行してしまうと、その計算が終わるまで画面の描画（イベントループ）が止まり、アプリケーションが「フリーズ（応答なし）」してしまいます。',
      takeaways: [
        {
          title: '重い処理は別スレッドへ',
          description: '画面の描画やボタンのクリック判定を行うGUIスレッドは常に身軽にしておき、重い処理は裏側（ワーカースレッド）に投げなければなりません。'
        }
      ]
    },
    {
      id: 'sec5-2',
      title: 'スレッド間の安全なデータ転送（Queued Connection）',
      explanationText: '別スレッドで計算が終わった後、その結果を画面に表示するために、ワーカースレッドから直接 `label->setText()` のようなGUI操作を行ってはいけません。GUI部品はメインスレッドからしか触れないからです（クラッシュの原因になります）。\n\nここで再び**シグナル＆スロット**が輝きます。Qtのシグナル＆スロットは、**送信元と受信者が別のスレッドにいる場合、自動的にスレッドセーフなキューイング（Queued Connection）**を行ってくれます。つまり、ワーカースレッドから `emit resultReady(data)` と叫ぶだけで、メインスレッドのイベントループがそれを受け取り、安全にGUIを更新してくれるのです。',
      codeFiles: [
        {
          filename: 'Worker.h',
          language: 'cpp',
          description: '重い処理を担当するワーカースレッドのクラス',
          code: `#pragma once
#include <QObject>
#include <QThread>

class Worker : public QObject {
    Q_OBJECT
public slots:
    void doHeavyWork() {
        // 重い計算のシミュレーション
        QThread::sleep(5); 
        
        // 処理が終わったら、メインスレッドへシグナルで結果を渡す
        emit workFinished("計算完了！");
    }
signals:
    void workFinished(const QString &result);
};`
        },
        {
          filename: 'Controller.cpp',
          language: 'cpp',
          description: 'メインスレッドでスレッドを立ち上げて接続する',
          code: `// スレッドオブジェクトとワーカーを作成
QThread* thread = new QThread();
Worker* worker = new Worker();

// WHY: QThreadのサブクラス化ではなくQObjectワーカー＋moveToThreadを使うことで、スレッドのライフサイクル管理とロジックを疎結合に保てます（Qt推奨パターン）。
// ワーカーを別スレッドに移動させる
worker->moveToThread(thread);

// 1. スレッドが開始されたら、重い処理を始める
connect(thread, &QThread::started, worker, &Worker::doHeavyWork);

// WHY: 送信側(Worker)と受信側(this)が異なるスレッドに存在するため、Qtは自動でQueuedConnectionを適用します。ミューテックス不要でGUIスレッドへ安全にメッセージが配送されます。
// 2. 処理が終わったシグナルを受け取り、GUIスレッドで結果を処理する
connect(worker, &Worker::workFinished, this, [](const QString &result){
    qDebug() << "GUI更新:" << result;
    // ここはメインスレッドで実行されるので安全！
});

// スレッド始動
thread->start();`
        }
      ]
    }
  ]
};


import { Chapter } from '../../types/curriculum';

export const chapter5: Chapter = {
  id: 5,
  slug: 'chapter-5',
  courseTrack: 'modern',
  title: '第5章：マルチスレッド設計：信号処理スレッドからGUIへの安全なデータ転送',
  subtitle: 'フリーズさせない非同期処理',
  badge: '第2部：マルチスレッド',
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

// ワーカーを別スレッドに移動させる
worker->moveToThread(thread);

// 1. スレッドが開始されたら、重い処理を始める
connect(thread, &QThread::started, worker, &Worker::doHeavyWork);

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

#pragma once

#include <QObject>
#include <QThread>

// WHY: [Workerオブジェクトパターン]
// QThreadを継承してrun()をオーバーライドする旧記法は、QThreadインスタンス自体が「親スレッド」に所属し続けるため、
// シグナル・スロットの実行コンテキストが混ざりデッドロックの原因になりやすい。
// QObject派生クラスを作り moveToThread(&workerThread) することで、全スロットが確実に別スレッドのイベントループ上で実行される。
class WorkerObject : public QObject {
    Q_OBJECT

public:
    explicit WorkerObject(QObject *parent = nullptr);

public slots:
    void doHeavyTask();

signals:
    void progressUpdated(int percent);
    void taskFinished(const QString &result);
};

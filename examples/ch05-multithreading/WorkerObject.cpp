#include "WorkerObject.h"
#include <QThread>
#include <QDebug>

WorkerObject::WorkerObject(QObject *parent)
    : QObject(parent) {}

void WorkerObject::doHeavyTask() {
    qDebug() << "[Worker] 重い処理を別スレッドで開始。Thread ID:" << QThread::currentThreadId();

    for (int i = 1; i <= 100; ++i) {
        QThread::msleep(30); // 擬似的な高負荷処理
        if (i % 10 == 0) {
            emit progressUpdated(i);
        }
    }

    emit taskFinished("処理完了（GUIは一切停止しませんでした）");
}

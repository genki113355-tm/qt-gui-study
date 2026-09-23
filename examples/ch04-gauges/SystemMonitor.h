#pragma once
#include <QObject>
#include <QTimer>

class SystemMonitor : public QObject
{
    Q_OBJECT
    // WHY: Q_PROPERTYにREADとNOTIFYを定義することで、QML側はポーリング不要で値の変化を検知し自動再描画します。
    Q_PROPERTY(int cpuLoad READ cpuLoad NOTIFY cpuLoadChanged)

public:
    explicit SystemMonitor(QObject *parent = nullptr)
        : QObject(parent), m_cpuLoad(15)
    {
        // 疑似CPU負荷更新タイマー
        auto timer = new QTimer(this);
        connect(timer, &QTimer::timeout, this, [this]() {
            int delta = (qrand() % 11) - 5;
            updateLoad(qBound(5, m_cpuLoad + delta, 95));
        });
        timer->start(1000);
    }

    int cpuLoad() const { return m_cpuLoad; }

public slots:
    void updateLoad(int newLoad) {
        // WHY: 前回の値と異なる場合のみ代入してシグナルを発行（ガード節）。無用なQMLの再バインド・再描画ループを防ぐQtの必須プラクティスです。
        if (m_cpuLoad != newLoad) {
            m_cpuLoad = newLoad;
            emit cpuLoadChanged();
        }
    }

signals:
    void cpuLoadChanged();

private:
    int m_cpuLoad;
};

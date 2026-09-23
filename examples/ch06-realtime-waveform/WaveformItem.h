#pragma once
#include <QQuickPaintedItem>
#include <QPainter>
#include <QColor>
#include "RingBuffer.h"

// WHY: [QQuickPaintedItemの採用理由]
// QMLの標準Itemでは毎秒数千点のポリライン描画を高フレームレートで維持できない。
// C++側でQQuickPaintedItemを継承し、QPainterのアンチエイリアスとネオングロー描画を
// 16.6ms（60Hz）タイマーで制御することでGPUとCPUの負荷を最小化する。
class WaveformItem : public QQuickPaintedItem {
    Q_OBJECT
    Q_PROPERTY(QColor lineColor READ lineColor WRITE setLineColor NOTIFY lineColorChanged)

public:
    explicit WaveformItem(QQuickItem *parent = nullptr);

    void paint(QPainter *painter) override;
    void addDataPoint(float value);

    QColor lineColor() const { return m_lineColor; }
    void setLineColor(const QColor &color);

signals:
    void lineColorChanged();

private:
    RingBuffer<float, 500> m_ringBuffer;
    QColor m_lineColor{QColor(34, 211, 238)}; // ネオンシアン
};

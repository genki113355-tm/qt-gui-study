#pragma once
#include <QQuickPaintedItem>
#include <QPainter>
#include <QColor>
#include "RingBuffer.h"

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
    RingBuffer<float, 600> m_ringBuffer;
    QColor m_lineColor{QColor(34, 211, 238)};
};

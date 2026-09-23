#include "WaveformItem.h"

WaveformItem::WaveformItem(QQuickItem *parent)
    : QQuickPaintedItem(parent) {
    setAntialiasing(true);
}

void WaveformItem::addDataPoint(float value) {
    m_ringBuffer.push(value);
}

void WaveformItem::paint(QPainter *painter) {
    const auto data = m_ringBuffer.snapshot();
    if (data.empty()) return;

    painter->setRenderHint(QPainter::Antialiasing);
    painter->fillRect(boundingRect(), QColor(10, 15, 29, 230));

    QPolygonF polyline;
    float stepX = static_cast<float>(width()) / 600.0f;
    float midY = static_cast<float>(height()) / 2.0f;

    for (size_t i = 0; i < data.size(); ++i) {
        float x = static_cast<float>(i) * stepX;
        float y = midY - (data[i] * (height() / 2.5f));
        polyline << QPointF(x, y);
    }

    QPen glowPen(m_lineColor);
    glowPen.setWidth(4);
    glowPen.setColor(QColor(m_lineColor.red(), m_lineColor.green(), m_lineColor.blue(), 50));
    painter->setPen(glowPen);
    painter->drawPolyline(polyline);

    QPen corePen(m_lineColor);
    corePen.setWidth(2);
    painter->setPen(corePen);
    painter->drawPolyline(polyline);
}

void WaveformItem::setLineColor(const QColor &color) {
    if (m_lineColor != color) {
        m_lineColor = color;
        emit lineColorChanged();
        update();
    }
}

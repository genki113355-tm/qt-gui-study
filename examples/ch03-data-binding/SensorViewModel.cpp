#include "SensorViewModel.h"
#include <QDebug>

SensorViewModel::SensorViewModel(QObject *parent)
    : QObject(parent) {}

void SensorViewModel::setTemperature(double temp) {
    // WHY: [同一値ガード] 前回と同じ値であれば即座にreturnする。これを怠ると、シグナル発火 → QMLバインディング再評価 → setter呼び出しの無限ループに陥りCPU100%クラッシュを引き起こすため必須！
    if (qFuzzyCompare(m_temperature, temp)) {
        return;
    }

    m_temperature = temp;
    emit temperatureChanged(m_temperature);

    if (m_temperature > 75.0 && m_status != "CRITICAL") {
        m_status = "CRITICAL";
        emit statusChanged(m_status);
        emit alertTriggered("CRITICAL", QString("温度過昇検知: %1℃").arg(m_temperature, 0, 'f', 1));
    } else if (m_temperature <= 75.0 && m_status != "NORMAL") {
        m_status = "NORMAL";
        emit statusChanged(m_status);
    }
}

void SensorViewModel::startCalibration() {
    qDebug() << "[C++ Backend] キャリブレーション開始（Q_INVOKABLE呼び出し）";
    setTemperature(25.0);
}

void SensorViewModel::resetAlert() {
    qDebug() << "[C++ Backend] アラートリセット";
    m_status = "NORMAL";
    emit statusChanged(m_status);
}

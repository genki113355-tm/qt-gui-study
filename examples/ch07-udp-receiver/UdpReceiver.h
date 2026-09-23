#pragma once
#include <QObject>
#include <QUdpSocket>
#include "SensorPacket.h"

class UdpReceiver : public QObject {
    Q_OBJECT
public:
    explicit UdpReceiver(quint16 port = 8888, QObject *parent = nullptr);

signals:
    void packetReceived(const SensorPacket &packet);
    void temperatureAlarm(float temp);

private slots:
    void processPendingDatagrams();

private:
    QUdpSocket *m_socket;
};

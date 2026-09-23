#include "UdpReceiver.h"
#include <QNetworkDatagram>
#include <QDebug>

UdpReceiver::UdpReceiver(quint16 port, QObject *parent)
    : QObject(parent), m_port(port) {}

void UdpReceiver::startListening() {
    m_socket = new QUdpSocket(this);
    m_socket->bind(QHostAddress::AnyIPv4, m_port, QUdpSocket::ShareAddress);

    connect(m_socket, &QUdpSocket::readyRead, this, &UdpReceiver::onReadyRead);

    m_watchdogTimer = new QTimer(this);
    m_watchdogTimer->setInterval(3000); // 3秒間パケットなしで途絶判定
    connect(m_watchdogTimer, &QTimer::timeout, this, &UdpReceiver::onWatchdogTimeout);
    m_watchdogTimer->start();

    qDebug() << "[UDP Receiver] ポート" << m_port << "で非同期リスニング開始";
}

void UdpReceiver::onReadyRead() {
    m_watchdogTimer->start(); // タイマーリセット

    while (m_socket->hasPendingDatagrams()) {
        QNetworkDatagram datagram = m_socket->receiveDatagram();
        QByteArray data = datagram.data();

        if (static_cast<size_t>(data.size()) < sizeof(SensorPacket)) {
            continue;
        }

        const auto *pkt = reinterpret_cast<const SensorPacket*>(data.constData());
        if (pkt->magic != 0x51545F36) {
            continue;
        }

        emit dataReceived(pkt->temperature, pkt->pressure, pkt->waveformValue);

        if (pkt->temperature > 85.0f) {
            emit alarmTriggered("CRITICAL", QString("温度危険レベル超過: %1 ℃").arg(pkt->temperature, 0, 'f', 1));
        } else if (pkt->temperature > 70.0f) {
            emit alarmTriggered("WARNING", QString("温度上昇注意: %1 ℃").arg(pkt->temperature, 0, 'f', 1));
        }
    }
}

void UdpReceiver::onWatchdogTimeout() {
    qWarning() << "[UDP Receiver] 通信途絶検知！3秒間パケットなし";
    emit connectionLost();
}

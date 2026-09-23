#include "UdpReceiver.h"
#include <QDebug>

UdpReceiver::UdpReceiver(quint16 port, QObject *parent)
    : QObject(parent), m_socket(new QUdpSocket(this))
{
    // WHY: readyReadシグナルをQtイベントループに紐付けることで、ビジーループや同期ブロッキングを排除し、パケット到着時のみ低負荷でスロットを実行します。
    m_socket->bind(QHostAddress::Any, port, QUdpSocket::ShareAddress);
    connect(m_socket, &QUdpSocket::readyRead, this, &UdpReceiver::processPendingDatagrams);
}

void UdpReceiver::processPendingDatagrams()
{
    while (m_socket->hasPendingDatagrams()) {
        QByteArray datagram;
        datagram.resize(m_socket->pendingDatagramSize());
        m_socket->readDatagram(datagram.data(), datagram.size());

        if (datagram.size() == sizeof(SensorPacket)) {
            SensorPacket packet;
            std::memcpy(&packet, datagram.constData(), sizeof(SensorPacket));

            // マジックナンバー検証 (0x53454E53 == 'SENS')
            if (packet.magic == 0x53454E53) {
                emit packetReceived(packet);
                if (packet.temperature > 85.0f) {
                    emit temperatureAlarm(packet.temperature);
                }
            }
        }
    }
}

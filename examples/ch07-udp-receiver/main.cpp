#include <QCoreApplication>
#include <QDebug>
#include "UdpReceiver.h"

int main(int argc, char *argv[])
{
    QCoreApplication app(argc, argv);

    UdpReceiver receiver(8888);
    QObject::connect(&receiver, &UdpReceiver::packetReceived, [](const SensorPacket &pkt) {
        qDebug() << "[UDP] Temp:" << pkt.temperature << "℃, Press:" << pkt.pressure << "kPa";
    });
    QObject::connect(&receiver, &UdpReceiver::temperatureAlarm, [](float temp) {
        qCritical() << "🚨 [ALARM] High temperature detected:" << temp << "℃";
    });

    qDebug() << "Listening for SensorPackets on UDP port 8888...";
    return app.exec();
}

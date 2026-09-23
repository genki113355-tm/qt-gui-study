#pragma once
#include <QObject>
#include <QUdpSocket>
#include <QTimer>

#pragma pack(push, 1)
struct SensorPacket {
    uint32_t magic;      // 0x51545F36 ("QT_6")
    uint32_t sequence;   // 連番
    float temperature;   // 温度 (℃)
    float pressure;      // 圧力 (kPa)
    float waveformValue; // 振動波形サンプル
    uint8_t flags;       // 0x01: Error, 0x02: Warning
};
#pragma pack(pop)

class UdpReceiver : public QObject {
    Q_OBJECT

public:
    explicit UdpReceiver(quint16 port = 9000, QObject *parent = nullptr);

public slots:
    void startListening();

signals:
    void dataReceived(float temp, float pressure, float waveVal);
    void alarmTriggered(const QString &level, const QString &message);
    void connectionLost();

private slots:
    void onReadyRead();
    void onWatchdogTimeout();

private:
    quint16 m_port;
    QUdpSocket *m_socket{nullptr};
    QTimer *m_watchdogTimer{nullptr};
};

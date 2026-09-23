#include <QApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QThread>
#include <QTimer>
#include "WaveformItem.h"
#include "UdpReceiver.h"

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);

    QQmlApplicationEngine engine;

    // UDP受信用ワーカースレッドの構築
    QThread *netThread = new QThread(&app);
    UdpReceiver *udpReceiver = new UdpReceiver(9000);
    udpReceiver->moveToThread(netThread);

    QObject::connect(netThread, &QThread::started, udpReceiver, &UdpReceiver::startListening);
    QObject::connect(netThread, &QThread::finished, udpReceiver, &QObject::deleteLater);

    netThread->start();

    const QUrl url(u"qrc:/qt/qml/TelemetryDashboard/DashboardMain.qml"_s);
    QObject::connect(&engine, &QQmlApplicationEngine::objectCreationFailed,
        &app, []() { QCoreApplication::exit(-1); },
        Qt::QueuedConnection);
    engine.load(url);

    int ret = app.exec();

    netThread->quit();
    netThread->wait();

    return ret;
}

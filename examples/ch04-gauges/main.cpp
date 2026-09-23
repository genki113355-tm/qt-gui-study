#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include "SystemMonitor.h"

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    SystemMonitor monitor;

    // WHY: C++インスタンスをコンテキストプロパティとして公開し、QMLから直接参照可能にします
    engine.rootContext()->setContextProperty("sysMonitor", &monitor);

    engine.load(QUrl(QStringLiteral("qrc:/Main.qml")));
    if (engine.rootObjects().isEmpty())
        return -1;

    return app.exec();
}

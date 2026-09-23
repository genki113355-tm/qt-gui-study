#include <QCoreApplication>
#include <QDebug>

int main(int argc, char *argv[]) {
    QCoreApplication app(argc, argv);
    
    qDebug() << "========================================";
    qDebug() << "🐻‍❄️ シロクマQt×C++ラボ：開発環境セットアップ完了！";
    qDebug() << "Qt Version:" << qVersion();
    qDebug() << "========================================";
    
    return 0;
}

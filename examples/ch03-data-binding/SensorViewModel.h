#pragma once

#include <QObject>
#include <QString>
#include <qqmlintegration.h>

class SensorViewModel : public QObject {
    Q_OBJECT
    QML_ELEMENT

    // WHY: [READ] QMLエンジンがプロパティを評価・読み出す際に呼ぶC++ getter関数を指定。
    // WHY: [WRITE] QML側から値を代入した際に呼ばれるsetter関数を指定。
    // WHY: [NOTIFY] C++側で値が更新された際にemitするシグナルを指定。これを省略するとQML側の自動リアクティブバインディングが永久に発火せず画面が更新されないため必須！
    Q_PROPERTY(double temperature READ temperature WRITE setTemperature NOTIFY temperatureChanged)
    Q_PROPERTY(QString status READ status NOTIFY statusChanged)

public:
    explicit SensorViewModel(QObject *parent = nullptr);

    double temperature() const { return m_temperature; }
    void setTemperature(double temp);

    QString status() const { return m_status; }

    // WHY: [Q_INVOKABLE] 通常のC++メンバ関数はMOCの登録対象外。QMLのボタンイベント等から直接C++の業務ロジックを呼ぶには Q_INVOKABLE の明示が不可欠！
    Q_INVOKABLE void startCalibration();
    Q_INVOKABLE void resetAlert();

signals:
    void temperatureChanged(double newTemperature);
    void statusChanged(const QString &newStatus);
    void alertTriggered(const QString &level, const QString &message);

private:
    double m_temperature{25.0};
    QString m_status{"NORMAL"};
};

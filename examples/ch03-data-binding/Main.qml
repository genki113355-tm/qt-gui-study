import QtQuick
import QtQuick.Controls
import Ch03_DataBinding

Window {
    width: 600
    height: 400
    visible: true
    title: "Ch03: C++ & QML データバインディング"
    color: "#0a0f1d"

    // C++ ViewModelをQML側でインスタンス化
    SensorViewModel {
        id: sensorVM
    }

    Column {
        anchors.centerIn: parent
        spacing: 20

        Text {
            // WHY: [プロパティバインディング] sensorVM.temperatureが更新されると、QMLが自動検知して文言を再描画！
            text: "現在温度: " + sensorVM.temperature.toFixed(1) + " ℃"
            font.pixelSize: 28
            font.bold: true
            color: sensorVM.status === "CRITICAL" ? "#ef4444" : "#22d3ee"
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Text {
            text: "ステータス: " + sensorVM.status
            font.pixelSize: 18
            color: "#94a3b8"
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Row {
            spacing: 15
            anchors.horizontalCenter: parent.horizontalCenter

            Button {
                text: "温度上昇 (+10℃)"
                onClicked: sensorVM.temperature += 10.0
            }

            Button {
                text: "リセット (Q_INVOKABLE)"
                // WHY: [Q_INVOKABLE呼び出し] 通常のJavaScript関数呼び出しと同じ構文でC++メソッドを実行
                onClicked: sensorVM.startCalibration()
            }
        }
    }
}

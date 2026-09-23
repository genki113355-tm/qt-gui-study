import QtQuick
import QtQuick.Controls

Window {
    width: 640
    height: 480
    visible: true
    title: "Ch01: QML クイックスタート"
    color: "#0a0f1d"

    Column {
        anchors.centerIn: parent
        spacing: 20

        Text {
            text: "🐻‍❄️ シロクマQt×C++ラボ"
            font.pixelSize: 24
            font.bold: true
            color: "#38bdf8"
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Text {
            text: "C++ロジックと宣言型QMLのハイブリッドGUIへようこそ！"
            font.pixelSize: 14
            color: "#94a3b8"
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Button {
            text: "クリックして確認"
            anchors.horizontalCenter: parent.horizontalCenter
            onClicked: {
                console.log("ボタンがクリックされました！");
            }
        }
    }
}

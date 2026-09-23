import QtQuick
import QtQuick.Controls

Window {
    width: 480
    height: 320
    visible: true
    title: "Ch04: Q_PROPERTY MVVM Dashboard"
    color: "#0f172a"

    Column {
        anchors.centerIn: parent
        spacing: 20

        Text {
            anchors.horizontalCenter: parent.horizontalCenter
            text: "CPU LOAD MONITOR"
            color: "#94a3b8"
            font.pixelSize: 14
            font.bold: true
        }

        Text {
            anchors.horizontalCenter: parent.horizontalCenter
            text: sysMonitor.cpuLoad + " %"
            color: sysMonitor.cpuLoad > 80 ? "#ef4444" : "#38bdf8"
            font.pixelSize: 48
            font.bold: true
        }

        ProgressBar {
            anchors.horizontalCenter: parent.horizontalCenter
            width: 300
            value: sysMonitor.cpuLoad / 100.0
        }
    }
}

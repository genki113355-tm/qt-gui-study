import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import TelemetryDashboard

ApplicationWindow {
    id: rootWindow
    width: 1024
    height: 600
    visible: true
    title: "産業用リアルタイム計器ダッシュボード (Qt 6)"
    color: "#070b14"

    property real currentTemp: 24.5
    property real currentPressure: 101.3
    property string alertLevel: "NORMAL"
    property string alertText: "システム正常稼働中"

    Timer {
        interval: 16 // 60fps
        running: true
        repeat: true
        onTriggered: {
            // デモ用波形サンプリング
            let t = Date.now() / 150.0;
            let val = Math.sin(t) * 0.7 + (Math.random() - 0.5) * 0.2;
            waveformDisplay.addDataPoint(val);
            waveformDisplay.update();
        }
    }

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: 16
        spacing: 16

        // ヘッダーバー
        RowLayout {
            Layout.fillWidth: true
            spacing: 12

            Text {
                text: "🐻‍❄️ TELEMETRY SYSTEM MONITOR"
                color: "#38bdf8"
                font.bold: true
                font.pixelSize: 20
                font.family: "monospace"
            }

            Item { Layout.fillWidth: true }

            Rectangle {
                width: 140
                height: 36
                radius: 18
                color: alertLevel === "CRITICAL" ? "#ef4444" : "#10b981"

                Text {
                    anchors.centerIn: parent
                    text: alertLevel
                    color: "#ffffff"
                    font.bold: true
                }
            }
        }

        // 波形描画エリア
        WaveformItem {
            id: waveformDisplay
            Layout.fillWidth: true
            Layout.fillHeight: true
            lineColor: alertLevel === "CRITICAL" ? "#f87171" : "#22d3ee"
        }

        // 計器パネル
        RowLayout {
            Layout.fillWidth: true
            spacing: 20

            Rectangle {
                Layout.fillWidth: true
                height: 90
                radius: 12
                color: "#0f172a"
                border.color: "#1e293b"

                Column {
                    anchors.centerIn: parent
                    Text { text: "SENSOR TEMPERATURE"; color: "#94a3b8"; font.pixelSize: 11; font.bold: true }
                    Text { text: currentTemp.toFixed(1) + " ℃"; color: "#38bdf8"; font.pixelSize: 26; font.bold: true }
                }
            }

            Rectangle {
                Layout.fillWidth: true
                height: 90
                radius: 12
                color: "#0f172a"
                border.color: "#1e293b"

                Column {
                    anchors.centerIn: parent
                    Text { text: "HYDRAULIC PRESSURE"; color: "#94a3b8"; font.pixelSize: 11; font.bold: true }
                    Text { text: currentPressure.toFixed(1) + " kPa"; color: "#38bdf8"; font.pixelSize: 26; font.bold: true }
                }
            }
        }
    }
}

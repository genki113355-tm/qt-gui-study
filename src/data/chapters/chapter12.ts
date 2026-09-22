import { Chapter } from '../../types/curriculum';

export const chapter12: Chapter = {
  id: 12,
  slug: 'chapter-12',
  courseTrack: 'reading',
  title: '第12章：実践：産業用ダッシュボードを完成させる',
  subtitle: '全知識を結集した統合システム',
  badge: '第3部：品質・デプロイ',
  description: 'これまで学んだQML宣言的レイアウト、シグナル＆スロット、マルチスレッド、60fps波形描画、UDP非同期通信、アラーム判定の全知識を結集し、産業用ダッシュボードシステムを完成させます。',
  sections: [
    {
      id: 'sec-12-1',
      title: '12.1 アーキテクチャの総括',
      explanationText: 'これまでの章で学んできた技術をすべて統合し、ひとつの強固な「産業用ダッシュボード（HMI）」を完成させます。\n\nシステム全体は以下のような美しい3層アーキテクチャで構成されています。',
      takeaways: [
        {
          title: '1. フロントエンド層 (QML / Qt Quick)',
          description: 'GPUアクセラレーションを効かせた滑らかなアニメーションとレイアウト。C++のロジックを一切持たず、プロパティのバインディングだけで状態を表示します。'
        },
        {
          title: '2. プレゼンテーション層 (C++ QObject)',
          description: '`Q_PROPERTY` と `Q_INVOKABLE` を使って、QMLとバックエンドを繋ぐ橋渡し（ViewModel）の役割を果たします。'
        },
        {
          title: '3. バックエンド・ワーカ層 (C++ QThread)',
          description: 'TCP/UDPでのセンサーデータの受信や、重い波形処理の計算を別スレッドで実行し、安全にシグナルで結果をUIに伝達します。'
        }
      ]
    },
    {
      id: 'sec-12-2',
      title: '12.2 最終プロダクトの統合ソースコード',
      explanationText: '完成したダッシュボードは、以下の要件を満たすミッションクリティカルな仕様となっています。\n\n* **リアルタイム波形描画**: 第6章で実装した `WaveformItem`（リングバッファ付き）による60fpsの安定描画\n* **非同期UDP通信**: 第7章で実装した `UdpReceiver` によるパケット受信とウォッチドッグ監視\n* **アラーム通知**: 温度異常（>85℃）および通信途絶（3秒タイムアウト）時のQMLフラッシュ警告\n* **メモリ安全**: 第8章の知見に基づき、QObject親子ツリーとスマートポインタを正しく分離\n\n以下が、すべての部品を結合する `CMakeLists.txt`、`main.cpp`、および `DashboardMain.qml` です。',
      codeFiles: [
        {
          filename: 'CMakeLists.txt',
          language: 'cmake',
          description: 'Quick・Network・Widgetsを統合した完全なCMake設定',
          code: `cmake_minimum_required(VERSION 3.16)
project(IndustrialDashboard LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

find_package(Qt5 COMPONENTS Core Quick Network Widgets REQUIRED)

add_executable(IndustrialDashboard
    main.cpp
    WaveformItem.h
    WaveformItem.cpp
    RingBuffer.h
    UdpReceiver.h
    UdpReceiver.cpp
    qml.qrc
)

target_link_libraries(IndustrialDashboard
    PRIVATE
        Qt5::Core
        Qt5::Quick
        Qt5::Network
        Qt5::Widgets
)`
        },
        {
          filename: 'main.cpp',
          language: 'cpp',
          description: 'C++コンポーネントをQMLに公開しエンジンを起動するエントリーポイント',
          code: `#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include "WaveformItem.h"
#include "UdpReceiver.h"

int main(int argc, char *argv[]) {
    // 高DPIスケーリングを有効化
    QGuiApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
    QGuiApplication app(argc, argv);

    // 1. 自作の波形描画コンポーネントをQML型として登録
    qmlRegisterType<WaveformItem>("CustomControls", 1, 0, "WaveformItem");

    // 2. バックエンドのUDP通信ワーカーを生成
    UdpReceiver receiver(8888);

    QQmlApplicationEngine engine;

    // 3. QMLのグローバルコンテキストにバックエンドインスタンスを注入
    engine.rootContext()->setContextProperty("sensorBackend", &receiver);

    // 4. メインQML画面のロード
    const QUrl url(QStringLiteral("qrc:/DashboardMain.qml"));
    QObject::connect(&engine, &QQmlApplicationEngine::objectCreated,
                     &app, [url](QObject *obj, const QUrl &objUrl) {
        if (!obj && url == objUrl)
            QCoreApplication::exit(-1);
    }, Qt::QueuedConnection);

    engine.load(url);

    return app.exec();
}`
        },
        {
          filename: 'DashboardMain.qml',
          language: 'qml',
          description: '計器・オシロスコープ・アラームバナーを統合したダッシュボード画面',
          code: `import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Layouts 1.15
import CustomControls 1.0

Window {
    id: root
    width: 1024
    height: 700
    visible: true
    title: qsTr("シロクマ産業用計器ダッシュボード HMI")
    color: "#060a14"

    property real currentTemp: 0.0
    property real currentPressure: 0.0
    property bool hasAlarm: false
    property string alarmMessage: ""

    // C++バックエンドからのシグナルをハンドリング
    Connections {
        target: sensorBackend

        function onDataReceived(temperature, pressure, seq) {
            root.currentTemp = temperature;
            root.currentPressure = pressure;
            waveform.addDataPoint(pressure / 100.0); // 圧力値を正規化して波形に追加
            root.hasAlarm = false;
        }

        function onAlarmTriggered(level, message) {
            root.hasAlarm = true;
            root.alarmMessage = message;
        }
    }

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: 20
        spacing: 16

        // 1. トップヘッダー ＆ アラームバナー
        Rectangle {
            Layout.fillWidth: true
            Layout.preferredHeight: root.hasAlarm ? 50 : 40
            color: root.hasAlarm ? "#7f1d1d" : "#0f172a"
            border.color: root.hasAlarm ? "#ef4444" : "#1e293b"
            radius: 10
            Behavior on color { ColorAnimation { duration: 300 } }

            RowLayout {
                anchors.fill: parent
                anchors.margins: 12

                Text {
                    text: root.hasAlarm ? "🚨 " + root.alarmMessage : "⚡ HMI SYSTEM MONITOR: ONLINE"
                    color: root.hasAlarm ? "#fef2f2" : "#38bdf8"
                    font.bold: true
                    font.pixelSize: 14
                    font.family: "Monospace"
                }
            }
        }

        // 2. メイン計測エリア（計器パネル ＋ リアルタイム波形）
        RowLayout {
            Layout.fillWidth: true
            Layout.fillHeight: true
            spacing: 16

            // 左側: 温度・圧力デジタルインジケータ
            Rectangle {
                Layout.preferredWidth: 280
                Layout.fillHeight: true
                color: "#0a0f1d"
                border.color: "#1e293b"
                radius: 16
                padding: 16

                ColumnLayout {
                    anchors.fill: parent
                    spacing: 20

                    Text {
                        text: "TELEMETRY"
                        color: "#64748b"
                        font.bold: true
                        font.pixelSize: 12
                        font.family: "Monospace"
                    }

                    // 温度表示
                    Column {
                        Text { text: "SENSOR TEMP"; color: "#94a3b8"; font.pixelSize: 11 }
                        Text { 
                            text: root.currentTemp.toFixed(1) + " ℃"
                            color: root.currentTemp > 80 ? "#f87171" : "#22d3ee"
                            font.bold: true
                            font.pixelSize: 32
                            font.family: "Monospace"
                        }
                    }

                    // 圧力表示
                    Column {
                        Text { text: "PRESSURE"; color: "#94a3b8"; font.pixelSize: 11 }
                        Text { 
                            text: root.currentPressure.toFixed(1) + " kPa"
                            color: "#34d399"
                            font.bold: true
                            font.pixelSize: 32
                            font.family: "Monospace"
                        }
                    }

                    Item { Layout.fillHeight: true } // スペーサー
                }
            }

            // 右側: リアルタイム波形オシロスコープ（QQuickPaintedItem）
            Rectangle {
                Layout.fillWidth: true
                Layout.fillHeight: true
                color: "#03060f"
                border.color: "#1e293b"
                radius: 16
                clip: true

                WaveformItem {
                    id: waveform
                    anchors.fill: parent
                    anchors.margins: 10
                    lineColor: root.hasAlarm ? "#ef4444" : "#22d3ee"
                }

                // 60FPS描画リフレッシュタイマー
                Timer {
                    interval: 16
                    running: true
                    repeat: true
                    onTriggered: waveform.update()
                }
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'sec-12-3',
      title: '12.3 次のステップ：組み込みLinux（Yocto）への道',
      explanationText: 'おめでとうございます！これであなたは、PC（Linuxデスクトップ）上で動作するプロ水準のQt GUIアプリケーションを自力で構築できるようになりました。\n\nここから先のプロフェッショナルな領域として、**「クロスコンパイル」** があります。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'クロスコンパイル環境の構築',
          description: 'ターゲットとなる実機（Raspberry Pi や NXP i.MX系ボードなど）のCPUアーキテクチャ（ARMなど）向けに、PC上でコンパイルを行う技術です。',
          impact: '「Yocto Project」や「Buildroot」といった組み込みLinuxのビルドシステムと組み合わせることで、OSからGUIアプリまでを一体化した専用ファームウェアを作ることができます。'
        },
        {
          stepNumber: 2,
          title: '終わらない技術探求',
          description: 'Qtは自動車のデジタルメーターパネル（IVI）や、医療用ディスプレイ、フライトシミュレータなど、世界中の最先端の現場で使われ続けています。ここで得たC++とアーキテクチャの知識は、どんな複雑なシステム開発でもあなたの最強の武器となるはずです。',
          impact: '素晴らしいHMIエンジニアリングの世界へようこそ！'
        }
      ]
    }
  ]
};

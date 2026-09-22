import { Chapter } from '../../types/curriculum';

export const chapter7: Chapter = {
  id: 7,
  slug: 'chapter-7',
  courseTrack: 'modern',
  title: '第7章：Linuxのソケット通信（UDP/TCP）をQtのイベントループでスマートに受ける',
  subtitle: 'QUdpSocketによる非同期データ受信とALARM判定の実装',
  badge: '第2部：マルチスレッド',
  description: '外部センサーや制御機器から届く高速なUDPバイナリパケットを、GUIを一切フリーズさせずに非同期受信し、温度異常や通信断絶を即座に検知するアラーム機能を実装します。',
  sections: [
    {
      id: 'sec7-1',
      title: '7.1 POSIX Socket（ブロッキング） vs Qtイベントループ統合（非同期）',
      explanationText: 'Linux環境でC言語の標準的なソケット通信（`socket()`, `bind()`, `recvfrom()`）を書く場合、`recvfrom()` はデータがネットワークカードに届くまで関数内で待機（ブロッキング）します。\n\nこれをGUIスレッドで呼んでしまうと、センサーが通信を切断したりパケットが途切れた瞬間に画面全体が完全に停止（フリーズ）してしまいます。かといって、生POSIXソケットと `pthread` を手動で組み合わせてスレッド間キューを自作するのはバグの温床です。\n\nQtが誇る **`QUdpSocket`** は、Linux内部の多重I/O機構（`epoll`）をQtのイベントループに直結させています。データがNICに届いた瞬間だけ **`readyRead()` シグナル** が発火するため、CPUを浪費するビジーループ（ポーリング）もブロッキングも一切発生しません。\n\n※UDP通信で流れてくる物理波形データ（水中音響センサー等）の数理解析や周波数スペクトル変換（FFT）の背景については、姉妹メディア[水中音響・ソナー技術入門 第2章（音をグラフで見る）](/sonar/chapters/2)で詳しく解説されています。',
      takeaways: [
        {
          title: 'イベント駆動型ソケットの優位性',
          description: 'データが来ない間はスレッドが完全に休止（Sleep）し、パケットが着信したマイクロ秒の単位で `readyRead()` が発火するため、超低負荷・高レスポンスを実現します。'
        }
      ]
    },
    {
      id: 'sec7-2',
      title: '7.2 産業用UDPパケット受信用ワーカーの実装',
      explanationText: '産業機器から送られてくるセンサーデータは、JSONやテキストではなく、1バイトの無駄も許さない**固定長バイナリパケット**で通信するのが一般的です。\n\nパケットヘッダの検証（マジックナンバー）、ペイロードのアンパック、そしてGUI側へのシグナル通知を行う `UdpReceiver` クラスを実装します。',
      codeFiles: [
        {
          filename: 'SensorPacket.h',
          language: 'cpp',
          description: 'パディング（構造体のアライメント）を固定したバイナリパケット定義',
          code: `#pragma once
#include <cstdint>

#pragma pack(push, 1) // 1バイト境界でパッキング（通信パケットのズレ防止）
struct SensorPacket {
    uint32_t magic;       // マジックナンバー (例: 0x53454E53 = 'SENS')
    uint32_t sequence;    // パケット通番
    float temperature;   // センサー温度 (℃)
    float pressure;      // 計測圧力 (kPa)
    uint32_t timestamp;   // エポック秒
};
#pragma pack(pop)`
        },
        {
          filename: 'UdpReceiver.h',
          language: 'cpp',
          description: 'QUdpSocketを保持しシグナルを発行する通信クラス',
          code: `#pragma once
#include <QObject>
#include <QUdpSocket>
#include <QTimer>
#include "SensorPacket.h"

class UdpReceiver : public QObject {
    Q_OBJECT

public:
    explicit UdpReceiver(quint16 port = 8888, QObject *parent = nullptr);

signals:
    // 正常なデータを受信したときのシグナル
    void dataReceived(float temperature, float pressure, uint32_t sequence);

    // 異常を検知したときのアラームシグナル
    void alarmTriggered(const QString &level, const QString &message);

private slots:
    // ソケットにパケットが到着したときに呼ばれるスロット
    void onReadyRead();

    // 通信途絶（タイムアウト）を検出するスロット
    void onWatchdogTimeout();

private:
    QUdpSocket *socket_ = nullptr;
    QTimer *watchdogTimer_ = nullptr; // 3秒間通信が途切れたら発報
    const float TEMP_CRITICAL_THRESHOLD = 85.0f; // 85℃以上で高温警報
};`
        },
        {
          filename: 'UdpReceiver.cpp',
          language: 'cpp',
          description: 'バイナリパケットのパースとアラーム・タイムアウト判定',
          code: `#include "UdpReceiver.h"
#include <QDebug>

UdpReceiver::UdpReceiver(quint16 port, QObject *parent)
    : QObject(parent) {
    socket_ = new QUdpSocket(this);

    // ポート 8888 で全ネットワークインターフェースから待ち受け
    if (!socket_->bind(QHostAddress::Any, port)) {
        qWarning() << "UDPポートバインド失敗:" << socket_->errorString();
    }

    // パケット到着シグナルをスロットへ接続
    connect(socket_, &QUdpSocket::readyRead, this, &UdpReceiver::onReadyRead);

    // 通信断絶を監視するウォッチドッグタイマー（3000ms）
    watchdogTimer_ = new QTimer(this);
    watchdogTimer_->setInterval(3000);
    connect(watchdogTimer_, &QTimer::timeout, this, &UdpReceiver::onWatchdogTimeout);
    watchdogTimer_->start();
}

void UdpReceiver::onReadyRead() {
    // 待機中のすべてのデータグラムをループで吸い出す
    while (socket_->hasPendingDatagrams()) {
        QByteArray datagram;
        datagram.resize(socket_->pendingDatagramSize());
        QHostAddress sender;
        quint16 senderPort;

        socket_->readDatagram(datagram.data(), datagram.size(), &sender, &senderPort);

        // 1. パケットサイズの検証
        if (datagram.size() < sizeof(SensorPacket)) {
            continue; // 不正なショートパケットは破棄
        }

        const auto *packet = reinterpret_cast<const SensorPacket*>(datagram.constData());

        // 2. マジックナンバー検証 (0x53454E53)
        if (packet->magic != 0x53454E53) {
            continue;
        }

        // パケットが正常に着信したのでウォッチドッグタイマーをリセット
        watchdogTimer_->start();

        // 3. MISSION解決: 温度異常のリアルタイム判定
        if (packet->temperature >= TEMP_CRITICAL_THRESHOLD) {
            emit alarmTriggered("CRITICAL", 
                QString("高温異常検知: %1℃ (閾値: %2℃)")
                    .arg(packet->temperature, 0, 'f', 1)
                    .arg(TEMP_CRITICAL_THRESHOLD, 0, 'f', 1));
        }

        // 4. GUI側へ正常データを転送
        emit dataReceived(packet->temperature, packet->pressure, packet->sequence);
    }
}

void UdpReceiver::onWatchdogTimeout() {
    // 3秒間パケットが届かなかった場合
    emit alarmTriggered("WARNING", "通信タイムアウト: センサーパケットが途絶しました！");
}`
        }
      ]
    },
    {
      id: 'sec7-3',
      title: '7.3 トップページのMISSION解決：QML画面へのアラーム連動',
      explanationText: 'トップページで提示されていたMISSION覚えているでしょうか？\n\n> **MISSION**: この計器画面に「温度異常の警報(ALARM)」を追加してください。\n\n先ほど実装した `UdpReceiver` の `alarmTriggered` シグナルをQMLのプロパティにバインドすることで、計器画面の背景を赤色にフラッシュさせ、警告バナーを表示するUIを完成させます。',
      codeFiles: [
        {
          filename: 'AlarmBanner.qml',
          language: 'qml',
          description: 'C++のアラームシグナルを受けて点滅する警告コンポーネント',
          code: `import QtQuick 2.15

Rectangle {
    id: alarmBox
    width: parent.width
    height: 48
    color: isCritical ? "#7f1d1d" : "#78350f" // 危険: 赤 / 警告: 橙
    border.color: isCritical ? "#ef4444" : "#f59e0b"
    radius: 8
    visible: hasAlarm

    property bool hasAlarm: false
    property bool isCritical: true
    property string alarmText: ""

    Row {
        anchors.centerIn: parent
        spacing: 12

        Text {
            text: isCritical ? "🚨 CRITICAL ALARM:" : "⚠️ WARNING:"
            color: "white"
            font.bold: true
            font.pixelSize: 14
        }

        Text {
            text: alarmText
            color: "#fecaca"
            font.pixelSize: 13
        }
    }

    // アラーム発生時の警告パルスアニメーション
    SequentialAnimation on opacity {
        running: hasAlarm
        loops: Animation.Infinite
        NumberAnimation { to: 0.4; duration: 400 }
        NumberAnimation { to: 1.0; duration: 400 }
    }
}`
        }
      ],
      takeaways: [
        {
          title: '疎結合の極致',
          description: 'ソケット通信のパースを行うC++側は画面の描画API（QPainterやQML）を一切知らず、ただ `emit alarmTriggered(...)` を発行するだけ。QML側はシグナルを受け取って色を変えるだけ。これぞプロの責務分離です。'
        }
      ]
    }
  ],
  quiz: [
    {
      id: 'q7-1',
      question: 'QtでQUdpSocketを使ってセンサーデータを受信する際、最も優れているアーキテクチャはどれですか？',
      options: [
        'while(true) ループ内で recvfrom() を同期呼び出しし、データが来るまでスレッドを停止させる',
        'タイマーで毎秒100回 hasPendingDatagrams() をポーリングして調べる',
        'ソケットの readyRead() シグナルにスロットを接続し、OSからデータ到着の通知があった時だけ非同期で読み出す',
        'パケットが来ない間は例外をスローしてキャッチし続ける'
      ],
      correctIndex: 2,
      explanation: '正解！QUdpSocketの readyRead() シグナルは、Linux内部の epoll などの多重化I/Oと連動しており、データが届いた瞬間だけ効率的にスロットを呼び出します。ブロッキングも無駄なビジーポーリングも発生しません。'
    }
  ]
};

import { Chapter } from '../../types/curriculum';

export const chapter6: Chapter = {
  id: 6,
  slug: 'chapter-6',
  courseTrack: 'modern',
  title: '第6章：QCustomPlot / Qt Graphs を使った高速リアルタイム波形描画',
  subtitle: '60fpsを維持するリングバッファと間引き描画テクニック',
  badge: '第2部：マルチスレッド',
  description: 'オシロスコープやレーダー波形など、毎秒数千点の高頻度ストリームをGUIフリーズを起こさずに滑らかな60fpsでリアルタイム描画するアーキテクチャを習得します。',
  sections: [
    {
      id: 'sec6-1',
      title: '6.1 なぜ標準UI部品では波形描画が破綻するのか？',
      explanationText: '心電図モニター、オシロスコープ、音響ソナーなど、毎秒数千〜数万サンプルが流れてくる産業用画面において、初心者が最も陥りやすい罠が「データが1点届くたびに画面を再描画（update()）してしまうこと」です。\n\nQtのGUI描画エンジンは、`update()` が呼ばれると「再描画要求イベント」をイベントループのキューに積みます。しかし、ディスプレイのリフレッシュレートは通常 **60Hz（16.6msに1回）** または **120Hz（8.3msに1回）** です。\n\n1000Hzで流れてくるデータに対して毎回再描画を要求すると、描画イベントがキューに無限に溜まり続け、**CPU使用率が100%に張り付き、画面がカクつき、最悪の場合は操作不能（フリーズ）** に陥ります。',
      takeaways: [
        {
          title: '描画キュー溢れ（Paint Queue Overflow）',
          description: '人間の目は16.6ms（毎秒60フレーム）以上の変化を識別できません。データ受信周期（例: 1000Hz）と画面描画周期（60Hz）を完全に切り離す（デカップリング）のが鉄則です。'
        },
        {
          title: 'メモリ再確保（Realloc）の禁止',
          description: '波形データを受信するたびに `std::vector::push_back()` でメモリ拡張を行うと、ヒープの再割り当てと断片化が発生しフレームドロップの原因になります。'
        }
      ]
    },
    {
      id: 'sec6-2',
      title: '6.2 60fpsを支える固定長リングバッファ（RingBuffer）のC++実装',
      explanationText: 'リアルタイム計器で一定時間分（例：直近5秒間、1000点分）の波形を表示し続けるためには、**リングバッファ（循環バッファ）** を使用します。\n\n固定長の配列を用意し、先頭に追いついたらインデックスを先頭（0）に巻き戻すことで、**メモリの動的確保（malloc/new）を完全にゼロ** に抑え、マイクロ秒単位でデータを追加できます。',
      codeFiles: [
        {
          filename: 'RingBuffer.h',
          language: 'cpp',
          description: 'メモリ再確保ゼロで最新N点の波形を保持する高速リングバッファ',
          code: `#pragma once
#include <vector>
#include <mutex>
#include <cstddef>

template <typename T>
class RingBuffer {
public:
    explicit RingBuffer(size_t capacity)
        : buffer_(capacity), capacity_(capacity), head_(0), size_(0) {}

    // データを1点追加（容量を超えたら最も古いデータを自動上書き）
    void push(const T& item) {
        std::lock_guard<std::mutex> lock(mutex_);
        buffer_[head_] = item;
        head_ = (head_ + 1) % capacity_;
        if (size_ < capacity_) {
            ++size_;
        }
    }

    // 描画用に、最も古いデータから最新データまでのスナップショットを一括コピー
    std::vector<T> getOrderedData() const {
        std::lock_guard<std::mutex> lock(mutex_);
        std::vector<T> result;
        result.reserve(size_);

        if (size_ < capacity_) {
            // まだバッファが満杯でない場合: 0 〜 head_-1 まで
            result.insert(result.end(), buffer_.begin(), buffer_.begin() + head_);
        } else {
            // バッファ満杯時: head_（最古データ）〜末尾、続けて0〜head_-1
            result.insert(result.end(), buffer_.begin() + head_, buffer_.end());
            result.insert(result.end(), buffer_.begin(), buffer_.begin() + head_);
        }
        return result;
    }

    size_t size() const {
        std::lock_guard<std::mutex> lock(mutex_);
        return size_;
    }

private:
    std::vector<T> buffer_;
    size_t capacity_;
    size_t head_;
    size_t size_;
    mutable std::mutex mutex_;
};`
        }
      ],
      takeaways: [
        {
          title: 'std::lock_guardによるスレッドセーフ化',
          description: '信号処理スレッドからのデータ追記（push）と、GUIスレッドからの描画データ取得（getOrderedData）が衝突しないよう、軽量なミューテックスで保護します。'
        }
      ]
    },
    {
      id: 'sec6-3',
      title: '6.3 QQuickPaintedItem によるカスタム波形描画コンポーネント',
      explanationText: 'Qt/QMLで高速な波形を描画する際、サードパーティライブラリ（QCustomPlot）をWidgets形式で埋め込む手法のほか、**`QQuickPaintedItem` を継承して自作の描画アイテムを作成する** 手法が実務では非常に重宝されます。\n\n`paint(QPainter *painter)` メソッドをオーバーライドし、2DグラフィックスAPIを用いてネオングロー効果やグリッド線、アンチエイリアス波形を直接描画できます。QML側からはカスタムタグ（例: `<WaveformItem />`）として自然に配置できます。',
      codeFiles: [
        {
          filename: 'WaveformItem.h',
          language: 'cpp',
          description: 'QMLにエクスポートするカスタム波形描画アイテムのヘッダ',
          code: `#pragma once
#include <QQuickPaintedItem>
#include <QColor>
#include <vector>
#include "RingBuffer.h"

class WaveformItem : public QQuickPaintedItem {
    Q_OBJECT
    Q_PROPERTY(QColor lineColor READ lineColor WRITE setLineColor NOTIFY lineColorChanged)

public:
    explicit WaveformItem(QQuickItem *parent = nullptr);

    QColor lineColor() const { return lineColor_; }
    void setLineColor(const QColor &color);

    // 外部（ワーカー）からデータを受け取るスロット
    Q_INVOKABLE void addDataPoint(float value);

    // QQuickPaintedItemの描画コールバック
    void paint(QPainter *painter) override;

signals:
    void lineColorChanged();

private:
    QColor lineColor_ = QColor("#22d3ee"); // デフォルト: シアン発光
    RingBuffer<float> buffer_{500};        // 500点分保持
};`
        },
        {
          filename: 'WaveformItem.cpp',
          language: 'cpp',
          description: 'QPainterによる高精度なアンチエイリアス波形レンダリング',
          code: `#include "WaveformItem.h"
#include <QPainter>
#include <QPainterPath>

WaveformItem::WaveformItem(QQuickItem *parent)
    : QQuickPaintedItem(parent) {
    // 描画パフォーマンス向上のためレンダーヒントを設定
    setAntialiasing(true);
}

void WaveformItem::setLineColor(const QColor &color) {
    if (lineColor_ != color) {
        lineColor_ = color;
        emit lineColorChanged();
        update();
    }
}

void WaveformItem::addDataPoint(float value) {
    buffer_.push(value);
    // ここではあえて update() を呼ばず、60Hzタイマー側で一括描画する！
}

void WaveformItem::paint(QPainter *painter) {
    const qreal w = width();
    const qreal h = height();
    if (w <= 0 || h <= 0) return;

    // 1. 背景の計器グリッド描画
    painter->fillRect(0, 0, w, h, QColor("#030712"));
    painter->setPen(QPen(QColor(34, 211, 238, 30), 1, Qt::DashLine));
    for (int y = 0; y < h; y += 40) {
        painter->drawLine(0, y, w, y);
    }

    // 2. 波形データのスナップショット取得
    auto data = buffer_.getOrderedData();
    if (data.size() < 2) return;

    // 3. QPainterPath による折れ線パスの構築
    QPainterPath path;
    const float stepX = static_cast<float>(w) / (data.size() - 1);
    const float midY = h / 2.0f;
    const float scaleY = h * 0.4f; // 振幅スケール

    for (size_t i = 0; i < data.size(); ++i) {
        float x = i * stepX;
        float y = midY - (data[i] * scaleY);
        if (i == 0) {
            path.moveTo(x, y);
        } else {
            path.lineTo(x, y);
        }
    }

    // 4. ネオングロー効果（太い半透明ペンの重ね塗り）
    painter->setRenderHint(QPainter::Antialiasing, true);
    QPen glowPen(QColor(lineColor_.red(), lineColor_.green(), lineColor_.blue(), 60), 6);
    painter->setPen(glowPen);
    painter->drawPath(path);

    // 5. メインのシャープな線
    QPen mainPen(lineColor_, 2);
    painter->setPen(mainPen);
    painter->drawPath(path);
}`
        },
        {
          filename: 'DashboardView.qml',
          language: 'qml',
          description: 'QML側でカスタム波形アイテムを配置しタイマー駆動する',
          code: `import QtQuick 2.15
import CustomControls 1.0 // C++で登録したモジュール

Rectangle {
    width: 600
    height: 300
    color: "#0b1329"
    border.color: "#1e293b"
    radius: 12

    // 自作C++描画アイテム
    WaveformItem {
        id: waveform
        anchors.fill: parent
        anchors.margins: 8
        lineColor: "#34d399" // エメラルドグリーン
    }

    // 60FPS（約16ms周期）で画面をリフレッシュするタイマー
    Timer {
        interval: 16
        running: true
        repeat: true
        onTriggered: {
            waveform.update(); // 60Hzで規則正しく再描画
        }
    }
}`
        }
      ]
    },
    {
      id: 'sec6-4',
      title: '6.4 受信（高頻度）と描画（60fps）のデカップリング設計',
      explanationText: 'まとめとして、産業用リアルタイムGUIの標準設計パターン（デカップリング）の手順を整理します。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'センサー通信スレッド（1000Hz〜数kHz）',
          description: 'UDPやCANバス、シリアル通信等で高速に届くパケットを受信し、純粋な数値としてリングバッファに `push()` する。画面の `update()` は一切呼ばない。',
          impact: '通信スレッドはマイクロ秒単位で処理を終え、パケット取りこぼしが起きない。'
        },
        {
          stepNumber: 2,
          title: 'GUIスレッド（60Hz固定タイマー）',
          description: '`QTimer` が16msごとに1回だけ `update()` を呼び出す。',
          impact: '人間の目に最適なめらかな60fpsを維持しつつ、CPU負荷を最小化する。'
        },
        {
          stepNumber: 3,
          title: 'paint() コールバックでの一括レンダリング',
          description: 'リングバッファから最新N点のスナップショットを抜き出し、1つの `QPainterPath` にまとめてGPUアクセラレーション描画する。',
          impact: '描画キューのパンクを防ぎ、60fpsを確実に維持。'
        }
      ]
    }
  ],
  quiz: [
    {
      id: 'q6-1',
      question: 'センサーから毎秒2,000回のデータパケットが届くリアルタイム波形画面で、最も適切な描画アーキテクチャはどれですか？',
      options: [
        'データが届くたびに即座に update() を呼び出し、毎秒2,000回画面を再描画する',
        'リングバッファにデータを蓄積し、16ms（約60Hz）周期のタイマーでまとめて update() を呼び出す',
        'GUIスレッドでソケットをブロッキング受信し、受信完了時に同期描画する',
        '全データを std::vector に無限に追加し、1秒ごとに全体を再描画する'
      ],
      correctIndex: 1,
      explanation: '正解！ディスプレイのリフレッシュレート（60Hz/16ms）とデータ受信レート（2,000Hz）をデカップリングし、リングバッファに貯めたデータを60Hz周期で間引き描画するのがプロの定石です。毎秒2,000回再描画を呼ぶと描画キューが破綻してCPUが100%になります。'
    }
  ]
};

#pragma once
#include <vector>
#include <memory>
#include <cstdint>
#include <QMetaType>

// 10万サンプルの大容量波形データ
struct WaveformData {
    uint64_t timestamp;
    float samplingRate;
    std::vector<float> samples;
};

// 共有ポインタのエイリアス定義
using WaveformPtr = std::shared_ptr<const WaveformData>;

// WHY: Qtのシグナル＆スロット（QueuedConnection）で安全にスレッド間受け渡しできるようにメタタイプ宣言します。
Q_DECLARE_METATYPE(WaveformPtr)

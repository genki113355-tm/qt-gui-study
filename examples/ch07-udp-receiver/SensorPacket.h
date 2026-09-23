#pragma once
#include <cstdint>

#pragma pack(push, 1) // 1バイト境界パッキング
struct SensorPacket {
    uint32_t magic;      // 0x53454E53 ('SENS')
    uint32_t sequence;   // パケット通番
    float temperature;  // ℃
    float pressure;     // kPa
    uint32_t timestamp;  // エポック秒
};
#pragma pack(pop)

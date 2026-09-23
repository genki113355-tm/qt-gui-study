#include <QCoreApplication>
#include <QDebug>
#include "WaveformData.h"

int main(int argc, char *argv[])
{
    QCoreApplication app(argc, argv);

    // WHY: QueuedConnectionで使用する型をメタオブジェクトシステムに登録
    qRegisterMetaType<WaveformPtr>("WaveformPtr");

    // 大容量波形をヒープに生成
    auto data = std::make_shared<WaveformData>();
    data->timestamp = 1700000000;
    data->samplingRate = 48000.0f;
    data->samples.resize(100000, 0.5f);

    WaveformPtr constData = data;
    qDebug() << "Created zero-copy WaveformData with" << constData->samples.size() << "samples. RefCount:" << constData.use_count();

    return 0;
}

import { Chapter } from '../../types/curriculum';

export const chapter8: Chapter = {
  id: 8,
  slug: 'chapter-8',
  courseTrack: 'modern',
  courseChapterCode: 'Ch.8',
  title: '第8章：大容量データのメモリ管理：Qtアプリでのスマートポインタの正しい使い方',
  subtitle: 'QObject親子ツリーとC++スマートポインタの協調設計',
  badge: '第2部：マルチスレッド',
  seoDescription: 'QtにおけるQObject親子ツリー所有権とC++標準スマートポインタ（std::shared_ptr/unique_ptr/QPointer）の正しい使い分け、二重解放（Double-Free）防止を解説。',
  githubSnapshot: {
    tagOrBranch: 'ch08-memory',
    folderPath: 'examples/ch08-memory-management',
    url: 'https://github.com/genki113355-tm/qt-gui-study/tree/main/examples/ch08-memory-management',
    description: '第8章の完成コード（QObject親子関係・std::shared_ptr・qRegisterMetaType連携）',
    cloneCommand: 'git clone https://github.com/genki113355-tm/qt-gui-study.git && cd qt-gui-study/examples/ch08-memory-management',
  },
  prerequisites: [
    {
      title: 'QObject所有権ツリーとライフサイクル',
      term: 'QObject所有権ツリー',
      description: '親オブジェクト破棄時に全子オブジェクトが自動解放される仕組み。C++スマートポインタとの二重管理に注意が必要です。',
    },
    {
      title: 'std::shared_ptrによるゼロコピー転送',
      term: 'std::shared_ptr',
      description: '参照カウント型スマートポインタ。大容量波形データなど非QObjectクラスのスレッド間ゼロコピー転送に適します。',
      labLink: '/cpp/modern/chapter-1',
      labLabel: 'C++ラボModern第1章で復習',
    },
    {
      title: 'qRegisterMetaTypeによる独自型のシグナル登録',
      term: 'qRegisterMetaType',
      description: '独自型やテンプレート型をQtのシグナル＆スロット（QueuedConnection）の引数として渡すために必要な登録関数。',
    },
  ],
  relatedLabs: [
    {
      title: 'モダンC++のリソース管理（RAIIとスマートポインタ）',
      labName: 'シロクマC++ラボ',
      badge: 'Modern 1',
      url: '/cpp/modern/chapter-1',
      description: 'std::unique_ptr / std::shared_ptr の内部構造、カスタムデリータ、循環参照の防止策を深く学びます。',
      icon: '🧠',
    },
  ],
  description: 'Qt独自のQObject親子ツリー所有権と、C++標準のスマートポインタ（std::shared_ptr / std::unique_ptr / QPointer）の境界線を明確化し、二重解放（Double-Free）やメモリリークのない堅牢なシステムを設計します。',
  sections: [
    {
      id: 'sec8-1',
      title: '8.1 2つのメモリ管理モデルの衝突と二重解放（Double-Free）の罠',
      explanationText: 'C++11以降、現代のC++開発では「生ポインタの `new/delete` は禁止、スマートポインタ（`std::unique_ptr` / `std::shared_ptr`）を使え」が常識となりました。\n\nしかし、Qtには1990年代から培われた **「QObject親子ツリー（Object Trees）」** という強力なメモリ管理システムが存在します。\n\n```text\n[MainWindow (親)] ➔ 破棄されると\n   ├── [ToolBar (子)]   ➔ 自動的に delete される！\n   └── [CentralWidget]  ➔ 自動的に delete される！\n```\n\nここで最大の悲劇が起きます。**「親が設定されているQObjectを、安易に `std::shared_ptr` で管理してしまう」** ケースです。\n\n1. 親ウィンドウが閉じられ、親QObjectが子オブジェクトを `delete` する。\n2. その後、`std::shared_ptr` のスコープが外れ、参照カウントが0になり **同じメモリアドレスをもう一度 `delete` しようとする**。\n3. **結果：二重解放（Double-Free）による即時セグメンテーションフォールト（クラッシュ）！**',
      takeaways: [
        {
          title: '鉄則1: QObject派生クラスには std::shared_ptr を使わない',
          description: 'QObject派生クラス（UI部品やコントローラ）は、Qtの親子関係（親ポインタを渡す）に寿命管理を任せるのが基本です。'
        },
        {
          title: '鉄則2: 非QObjectの純粋データ構造にはスマートポインタを使う',
          description: '波形データや通信パケットなどの純粋なC++構造体は、QObjectツリーの管理外であるため、`std::shared_ptr` や `std::unique_ptr` で安全に管理します。'
        }
      ]
    },
    {
      id: 'sec8-2',
      title: '8.2 スレッド間を安全に飛び交う波形データ：std::shared_ptr × qRegisterMetaType',
      explanationText: 'バックエンドスレッドで受信・解析した数万点の波形データ（メガバイト単位）を、GUIスレッドへシグナルで転送する場合、値渡し（コピー）を行うと毎フレーム大量のメモリコピーが発生し、CPUを激しく浪費します。\n\nここで最適なのが **`std::shared_ptr<const std::vector<float>>`** をシグナルの引数にする手法です。\n\nQtのシグナル＆スロットで独自型やスマートポインタをスレッド間（QueuedConnection）で渡すには、**`qRegisterMetaType`** でメタオブジェクトシステムに型を登録する必要があります。',
      codeFiles: [
        {
          filename: 'WaveformData.h',
          language: 'cpp',
          description: '大容量波形データのスマートポインタ定義とメタタイプ登録',
          code: `#pragma once
#include <vector>
#include <memory>
#include <QMetaType>

// 10万サンプルの高周波波形データ構造体
struct WaveformData {
    uint64_t timestamp;
    float samplingRate;
    std::vector<float> samples; // 数万〜数十万点の生データ
};

// 共有ポインタのエイリアス定義
using WaveformPtr = std::shared_ptr<const WaveformData>;

// Qtのシグナル＆スロットで受け渡せるようにメタタイプ宣言
Q_DECLARE_METATYPE(WaveformPtr)`
        },
        {
          filename: 'SignalProcessor.h',
          language: 'cpp',
          description: 'ワーカースレッドからスマートポインタを発行するプロセッサ',
          code: `#pragma once
#include <QObject>
#include "WaveformData.h"

class SignalProcessor : public QObject {
    Q_OBJECT

public:
    explicit SignalProcessor(QObject *parent = nullptr) : QObject(parent) {}

public slots:
    void processRawSignal() {
        // 1. 新しい波形データを生成
        auto data = std::make_unique<WaveformData>();
        data->timestamp = 17111223344;
        data->samplingRate = 48000.0f;
        data->samples.resize(10000); // 1万サンプル

        // 模擬データ生成
        for (size_t i = 0; i < data->samples.size(); ++i) {
            data->samples[i] = std::sin(i * 0.05f);
        }

        // 2. 読み取り専用の shared_ptr に変換してシグナル送出
        WaveformPtr sharedData = std::move(data);
        
        // ポインタの参照カウントが増えるだけ！データコピーはゼロ！
        emit waveformReady(sharedData);
    }

signals:
    void waveformReady(WaveformPtr data);
};`
        },
        {
          filename: 'main.cpp',
          language: 'cpp',
          description: 'main関数でのメタタイプ登録とスレッドセーフな受信接続',
          code: `#include <QApplication>
#include "WaveformData.h"
#include "SignalProcessor.h"

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);

    // 【最重要】スレッド間シグナル通信の前に型を登録する
    qRegisterMetaType<WaveformPtr>("WaveformPtr");

    SignalProcessor processor;

    // GUIスレッド側での安全な受信
    QObject::connect(&processor, &SignalProcessor::waveformReady, 
        [](WaveformPtr data){
            // data->samples は const なので他スレッドからの破壊も起きない
            qDebug() << "受信サンプル数:" << data->samples.size()
                     << "参照カウント:" << data.use_count();
        });

    return app.exec();
}`
        }
      ]
    },
    {
      id: 'sec8-3',
      title: '8.3 実務で役立つQtポインタ選定チートシート',
      explanationText: 'Qt×C++実務で迷った時の判断基準を整理します。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'UI部品やコントローラ（QObject派生）',
          description: '親オブジェクトを指定した生ポインタ `new MyWidget(parent)` を使う。親のデストラクタが走った際に連鎖的に破棄される。',
          impact: 'Qtのアーキテクチャに最も適合し、安全。'
        },
        {
          stepNumber: 2,
          title: '相手がいつ消えるか分からない参照（弱参照）',
          description: '`QPointer<T>` を使用する。参照先のQObjectがどこかで `delete` されると、自動的に `nullptr` にクリアされる。',
          impact: 'ダングリングポインタ（不正メモリアクセス・クラッシュ）を100%防止。'
        },
        {
          stepNumber: 3,
          title: 'スレッドをまたぐ計測・通信データ（非QObject）',
          description: '`std::shared_ptr<const T>` を使用する。複数のスレッド（通信、解析、描画）が同じデータを参照し、全スレッドで使い終わった瞬間に自動で解放される。',
          impact: '大容量データのコピーコストを完全に撲滅。'
        }
      ]
    }
  ],
  quiz: [
    {
      id: 'q8-1',
      question: '親QObject（例: MainWindow）が設定されている子QWidgetを、std::shared_ptr<QWidget> で保持した場合に起こる危険は何ですか？',
      options: [
        'コンパイルエラーになりビルドできない',
        '親が破棄された時のQtによるdeleteと、shared_ptrの参照カウント0によるdeleteで二重解放（Double-Free）クラッシュが発生する',
        'メモリ使用量が2倍になるだけで動作に問題はない',
        '画面の描画速度が自動的に半減する'
      ],
      correctIndex: 1,
      explanation: '正解！Qtの親子ツリーによる自動deleteと、std::shared_ptrのデストラクタによるdeleteが競合し、同じヒープメモリを二重に解放しようとしてクラッシュします。QObjectの寿命管理はQt親子ツリーに任せ、非QObjectのデータ構造体にスマートポインタを使うのが鉄則です。'
    }
  ]
};

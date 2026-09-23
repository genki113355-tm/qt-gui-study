import { Chapter } from '../../types/curriculum';

export const chapter4: Chapter = {
  id: 4,
  slug: 'chapter-4',
  courseTrack: 'classic',
  courseChapterCode: 'Ch.4',
  title: '第4章：ロジック（C++）と画面（QML）の美しい分離アーキテクチャ',
  subtitle: 'バックエンドとフロントエンドの分離 (MVC/MVVM)',
  badge: '第1部：Qtアーキテクチャ',
  seoDescription: 'Qt 6のQ_PROPERTYとデータバインディングによるC++ロジックとQML UIの疎結合MVVMアーキテクチャ設計を解説。READ/WRITE/NOTIFYの仕組みを学びます。',
  githubSnapshot: {
    tagOrBranch: 'ch04-gauges',
    folderPath: 'examples/ch04-gauges',
    url: 'https://github.com/genki113355-tm/qt-gui-study/tree/main/examples/ch04-gauges',
    description: '第4章の完成コード（Q_PROPERTYによるMVVM分離・CPU負荷ゲージUI）',
    cloneCommand: 'git clone https://github.com/genki113355-tm/qt-gui-study.git && cd qt-gui-study/examples/ch04-gauges',
  },
  prerequisites: [
    {
      title: 'Q_PROPERTYマクロによるデータバインディング',
      term: 'Q_PROPERTY',
      description: 'Qtメタオブジェクトシステムに変数をプロパティとして登録し、QMLからの参照や双方向バインドを可能にするマクロ。',
    },
    {
      title: 'シグナル＆スロットによる変更通知',
      term: 'シグナル＆スロット',
      description: '第3章で学習したQtの疎結合通信。プロパティ更新時のNOTIFYシグナルでUIの自動再描画が駆動されます。',
      labLink: '/cpp/classic/chapter-8',
      labLabel: 'C++ラボ第8章で復習',
    },
    {
      title: 'MVVMパターン（ロジックと画面の疎結合）',
      term: 'MVVMパターン',
      description: 'Model（データ・ロジック）とView（画面描画）の間にViewModelを挟み、データバインディングで接続する設計思想。',
    },
  ],
  description: 'バックエンド（計算・データ処理）とフロントエンド（描画）を明確に分離するMVC/MVVM設計を学びます。',
  sections: [
    {
      id: 'sec4-1',
      title: 'Q_PROPERTYによるデータバインディング',
      explanationText: '第3章で「シグナル＆スロット」によるイベントの伝達を学びましたが、UIに常に最新のデータ（例：センサーの温度、CPU使用率）を表示し続けるにはどうすればよいでしょうか？\n\nここで活躍するのが **Q_PROPERTY（プロパティ）** と **データバインディング** です。C++側で `Q_PROPERTY` として変数を公開すると、QML側でその変数に紐付け（バインド）を行うことができます。C++側で値が更新されると、QML側の表示も「自動的」に切り替わるという、まさにモダンなフロントエンド（ReactやVue等）と同じリアクティブな挙動を実現できます。',
      takeaways: [
        {
          title: 'データはC++、表示はQML',
          description: 'QML側でUIの状態を管理するのではなく、C++側（ViewModel）が「現在の状態」を持ち、QMLはそれを映し出す「鏡」として振る舞うのが美しい設計です。'
        }
      ]
    },
    {
      id: 'sec4-2',
      title: '実装例：CPU使用率のリアルタイム表示',
      explanationText: '実際に、C++側で計算した「システム負荷（load）」をQML側にバインディングする例を見てみましょう。',
      codeFiles: [
        {
          filename: 'SystemMonitor.h',
          language: 'cpp',
          description: 'Q_PROPERTYを使ってQMLにデータを公開する',
          code: `#pragma once
#include <QObject>

class SystemMonitor : public QObject
{
    Q_OBJECT
    // WHY: Q_PROPERTYにREADとNOTIFYを登録することで、QML側はポーリング不要で値の変化を検知し自動再描画します。
    // Q_PROPERTY(型 名前 READ ゲッター WRITE セッター NOTIFY 変更通知シグナル)
    Q_PROPERTY(int cpuLoad READ cpuLoad NOTIFY cpuLoadChanged)

public:
    explicit SystemMonitor(QObject *parent = nullptr) : QObject(parent), m_cpuLoad(0) {}

    int cpuLoad() const { return m_cpuLoad; }

public slots:
    void updateLoad(int newLoad) {
        // WHY: 前回の値と異なる場合のみ代入してシグナルを発行（ガード節）。無用なQMLの再バインド・再描画ループを防ぐQtの必須プラクティスです。
        if (m_cpuLoad != newLoad) {
            m_cpuLoad = newLoad;
            emit cpuLoadChanged(); // 値が変わったことをQMLに知らせる！
        }
    }

signals:
    void cpuLoadChanged();

private:
    int m_cpuLoad;
};`
        },
        {
          filename: 'main.qml',
          language: 'qml',
          description: 'C++のプロパティを直接参照するQML',
          code: `import QtQuick 2.15
import QtQuick.Controls 2.15

Window {
    width: 400
    height: 300
    visible: true

    Column {
        anchors.centerIn: parent
        spacing: 10
        
        Text {
            // "sysMonitor" はC++側から渡されたインスタンス。
            // cpuLoadChangedシグナルが飛ぶたびに、この text は自動で書き換わる！
            text: "現在のCPU負荷: " + sysMonitor.cpuLoad + " %"
            font.pixelSize: 24
        }
        
        ProgressBar {
            value: sysMonitor.cpuLoad / 100.0
            width: 200
        }
    }
}`
        }
      ]
    }
  ]
};

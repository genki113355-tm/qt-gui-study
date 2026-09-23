import { Chapter } from '../../types/curriculum';

export const chapter1: Chapter = {
  id: 1,
  slug: 'chapter-1',
  courseTrack: 'classic',
  courseChapterCode: 'Ch.1',
  title: '第1章：モダンQtとC++で作る、次世代の産業用GUI・HMI',
  subtitle: 'Qtの全体像と完成形のイメージ共有',
  badge: '第1部：Qtアーキテクチャ',
  description: 'HMI（Human Machine Interface）開発になぜQtが選ばれるのか。全体像と完成形のイメージ共有。',
  seoDescription: 'Qt/QMLクイックスタート。QML宣言型シーングラフとC++命令型ビジネスロジックの役割分担、プロパティバインディングのメンタルモデルを習得。',
  githubSnapshot: {
    tagOrBranch: 'ch01-qml',
    folderPath: 'examples/ch01-qml-basics',
    url: 'https://github.com/genki113355-tm/qt-gui-study/tree/main/examples/ch01-qml-basics',
    cloneCommand: 'git clone https://github.com/genki113355-tm/qt-gui-study.git && cd qt-gui-study/examples/ch01-qml-basics'
  },
  prerequisites: [
    { title: 'C++のクラスとオブジェクト指向の基本概念' },
    { title: 'JSONライクな宣言的記法（プロパティ: 値）への理解' }
  ],
  sections: [
    {
      id: 'sec-1-1',
      title: '1.1 産業用HMIになぜQtが選ばれるのか？',
      explanationText: '自動車のメーターパネル（デジタルコックピット）、工場のFA機器、医療用モニター、そして軍事・防衛システム。\nこれらに共通するのは「絶対にフリーズしてはいけない」「コンマ1秒の遅れが許されない」という極めて厳しい要件です。\n\nWeb技術（ElectronやReact Nativeなど）もGUI開発において台頭していますが、**ネイティブのC++の速度**と**ハードウェアへの直接アクセス**が必要な領域では、現在でもQtが業界標準の地位を確立しています。',
      takeaways: [
        {
          title: 'ネイティブC++による圧倒的パフォーマンス',
          description: 'ガベージコレクションによる予期せぬ停止（GCポーズ）がなく、メモリ消費も最小限に抑えられます。'
        },
        {
          title: 'クロスプラットフォーム',
          description: 'Linux, Windows, macOS, さらには組み込みOS（QNX, VxWorks）まで、同じコードベースで動作します。'
        }
      ]
    },
    {
      id: 'sec-1-2',
      title: '1.2 Qtの3つのコアアーキテクチャ',
      explanationText: 'Qtを強力なフレームワークにしているのは、主に以下の3つの設計思想です。\nこれらを使いこなすことが、Qtマスターへの第一歩となります。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'シグナル＆スロット (Signals & Slots)',
          description: 'オブジェクト同士を疎結合に繋ぐイベント駆動システム。「ボタンが押された」というシグナルと、「何か処理をする」というスロットを安全に接続します。',
          impact: 'コールバック地獄から解放され、コンポーネントの独立性が高まります。'
        },
        {
          stepNumber: 2,
          title: 'MOC (Meta-Object Compiler)',
          description: 'C++を拡張し、リフレクション（実行時の型情報）やプロパティシステムを提供するプリプロセッサ。',
          impact: 'C++本来の仕様にはない高度な動的機能を実現します。'
        },
        {
          stepNumber: 3,
          title: 'ロジックとビューの分離 (QML / C++)',
          description: '見た目（アニメーションやレイアウト）はQML（JavaScriptライクな宣言型言語）で柔軟に書き、重いデータ処理は裏側のC++で行うハイブリッド設計。',
          impact: 'デザイナーとプログラマの分業が可能になり、パフォーマンスも最大化されます。'
        }
      ]
    },
    {
      id: 'sec-1-3',
      title: '1.3 本コースで開発する「リアルタイムダッシュボード」',
      explanationText: 'このカリキュラムでは、単なるボタンとテキストのアプリではなく、毎秒60フレームでデータを処理・描画する**「産業用システムモニター（ダッシュボード）」**を構築します。\n\n具体的には以下のような要素をC++とQtで実装していきます。',
      takeaways: [
        {
          title: 'UDP/TCPストリーム受信スレッド',
          description: '外部センサーからのデータを別スレッドで受信し、GUIをフリーズさせません。'
        },
        {
          title: '高速オシロスコープ波形描画',
          description: 'QCustomPlot または Qt Graphs を使用し、数万ポイントの波形データをリアルタイムに描画します。'
        },
        {
          title: 'QMLによるモダンUI',
          description: '円形メーターやレーダーチャートなど、高度なグラフィックスをQMLで構築します。'
        }
      ]
    },
    {
      id: 'sec-1-4',
      title: '1.4 C++プログラマのための「QMLメンタルモデル」',
      explanationText: 'C++の学習者がQt/QMLに出会った時、最も戸惑うのが「なぜC++なのにJSONやCSSのような言語（QML）を書かなければならないのか？」という点です。\n\n安心してください。**「プログラムの頭脳・主役は100% C++」** です。\n\nQMLは新しいプログラミング言語というよりも、**「C++のオブジェクトツリーを視覚的に宣言するための設定ファイル」** に過ぎません。\n\n```text\n【裏側 (C++)】: センサー通信、マルチスレッド計算、メモリ管理、データ構造 (頭脳)\n      │\n      │  Q_PROPERTY / シグナル＆スロット (架け橋)\n      ▼\n【表側 (QML)】: 座標・色・アニメーション・ボタン配置 (見た目の殻)\n```\n\n「ボタンが押されたらC++の関数を呼ぶ」「C++の変数が変わったらQMLのテキストが勝手に書き換わる」。この役割分担さえ掴めば、C++コードの中に座標計算や色指定などの泥臭いUIコードを一切書かずに済む快適さに感動するはずです。',
      takeaways: [
        {
          title: 'QMLを恐れる必要はゼロ',
          description: '複雑なアルゴリズムやロジックをQMLで書く必要はありません。計算はすべて得意なC++で書き、画面は「ただのプロパティの反映先」としてQMLを使うのがプロの設計です。'
        }
      ]
    }
  ]
};

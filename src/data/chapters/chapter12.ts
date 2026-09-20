import { Chapter } from '../../types/curriculum';

export const chapter12: Chapter = {
  id: 12,
  slug: 'chapter-12',
  courseTrack: 'reading',
  title: '第12章：実践：産業用ダッシュボードを完成させる',
  subtitle: '全知識を結集した統合システム',
  badge: '第3部：品質・デプロイ',
  description: '全ての知識を結集し、レーダーチャート、円形メーター、波形オシロスコープを備えた統合システムを完成させる。',
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
      title: '12.2 最終プロダクトの仕様',
      explanationText: '完成したダッシュボードは、以下の要件を満たすミッションクリティカルな仕様となっています。\n\n* **リアルタイム波形描画**: QCustomPlot / Qt Graphs を用いた60fpsのセンサー波形表示\n* **マルチスレッド処理**: データのパース処理による画面フリーズを完全に排除\n* **メモリ安全**: モダンC++ (スマートポインタ) を駆使したリークのない運用\n* **Linuxネイティブ**: WSL2(Ubuntu) 上で開発し、パッケージ化されたポータブル仕様',
      codeFiles: []
    },
    {
      id: 'sec-12-3',
      title: '12.3 次のステップ：組み込みLinux（Yocto）への道',
      explanationText: 'おめでとうございます！これであなたは、PC（Linuxデスクトップ）上で動作するプロ水準のQt GUIアプリケーションを作れるようになりました。\n\nここから先のプロフェッショナルな領域として、**「クロスコンパイル」** があります。',
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

export interface BookItem {
  id: string;
  title: string;
  author: string;
  publisher: string;
  category: 'Qt公式解説書' | 'Linux HMI実践' | 'GUIアーキテクチャ' | '組込みLinux開発';
  tag: string;
  description: string;
  recommendPoint: string;
  isbnOrKeyword: string;
  priceHint?: string;
  icon: string;
}

export interface ServiceAffiliateItem {
  id: string;
  name: string;
  category: 'course' | 'career' | 'qual' | 'travel' | 'shopping';
  badge: string;
  description: string;
  priceNote?: string;
  linkUrl: string;
  trackingPixelUrl?: string;
  icon: string;
  recommendPoint: string;
}

export const AMAZON_ASSOCIATE_TAG = 'shirokumatech00-22';

export const A8_RAKUTEN_BASE_URL =
  'https://rpx.a8.net/svt/ejp?a8mat=4BABTG+1RPEIA+2HOM+6GRMR&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26082247997_4BABTG_1RPEIA_2HOM_6GRMR%3Fpc%3D';

export const A8_RAKUTEN_TOP_URL =
  'https://rpx.a8.net/svt/ejp?a8mat=4BABTG+1RPEIA+2HOM+6DZBN&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26082247997_4BABTG_1RPEIA_2HOM_6DZBN%3Fpc%3Dhttp%253A%252F%252Fwww.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252F';

export const A8_RAKUTEN_TOP_PIXEL =
  'https://www18.a8.net/0.gif?a8mat=4BABTG+1RPEIA+2HOM+6DZBN';

export const getAmazonSearchUrl = (keyword: string): string => {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&tag=${AMAZON_ASSOCIATE_TAG}`;
};

export const getRakutenSearchUrl = (keyword: string): string => {
  const rawTargetUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`;
  return `${A8_RAKUTEN_BASE_URL}${encodeURIComponent(rawTargetUrl)}`;
};

export const QT_RECOMMENDED_PRODUCTS: BookItem[] = [
  {
    id: 'book-qt-official',
    title: '入門 Qt 4 プログラミング',
    author: 'Jasmin Blanchette / Mark Summerfield 著',
    publisher: 'オーム社',
    category: 'Qt公式解説書',
    tag: '👑 Qtフレームワーク設計思想の基礎バイブル',
    icon: '📘',
    isbnOrKeyword: '入門 Qt プログラミング',
    priceHint: '定価 ¥4,180 前後',
    description:
      'シグナル＆スロット、イベントループ、カスタムウィジェット描画、モデル/ビュー構造など、Qtの根幹概念を網羅した定評ある名著。',
    recommendPoint: 'シロクマ先生激推し！Qtのシグナル機構とメモリ親子管理（QObjectツリー）の本質を掴むなら必読じゃ。'
  },
  {
    id: 'book-embedded-linux',
    title: 'マスタリング・組込みLinux システム構築 第2版',
    author: 'Chris Simmonds 著',
    publisher: 'オライリー・ジャパン',
    category: '組込みLinux開発',
    tag: '🛠 Yocto・Wayland/Weston・クロス開発',
    icon: '📕',
    isbnOrKeyword: 'マスタリング 組込みLinux システム構築',
    priceHint: '定価 ¥4,620',
    description:
      'ブートローダからカーネル、ルートファイルシステム、Yocto Projectによるカスタムディストリビューション構築、WaylandでのQt GUI起動まで完全網羅。',
    recommendPoint: 'ペンギン生徒も愛読！産業用タッチパネル端末のOS構築からGUI連携まで全部繋がるっす！'
  },
  {
    id: 'book-qml-qtquick',
    title: 'Qt Quick QML 実践UIプログラミング',
    author: '専門技術コミュニティ 著',
    publisher: '技術評論社',
    category: 'GUIアーキテクチャ',
    tag: '⚡️ 現代的なリッチUI＆C++バックエンド連携',
    icon: '📙',
    isbnOrKeyword: 'Qt Quick QML プログラミング',
    priceHint: '定価 ¥3,500 前後',
    description:
      '宣言型UI言語QMLを用いた車載メーターや産業計器の滑らかなアニメーションUI構築と、C++ロジックのバインディング技法を徹底解説。',
    recommendPoint: 'ウィジェットだけでなく現代の車載・医療機器で標準となったQMLを習得するならこの1冊！'
  }
];

export const NEWSLETTER_SAMPLES = [
  {
    day: 'Day 01',
    previewSubject: '【Qt×Linux即答ドリル Day01】QObjectの親子関係とメモリ自動解放の罠',
    sender: 'シロクマ先生（シロクマTech Qt開発室）<newsletter@shirokuma-tech.jp>',
    paragraphs: [
      'おはようございます、シロクマ先生です！',
      'Qtプログラミングの基本中の基本「QObjectの親子関係（Object Trees）」をおさらいしましょう。',
      'QObjectを親（parent）に指定してヒープ生成すると、親が破棄された際に子オブジェクトも自動的にdeleteされます。',
      'ただし【スタック上の変数を親に指定する順番】を誤ると、デストラクタが二重解放（Double Free）を引き起こす致命的バグに発展するため要注意です。'
    ],
    quizQuestion: 'Q: QObject派生クラスにおいて親オブジェクト破棄時に子が自動解放される機構は？',
    quizAnswer: 'A: QObjectツリー（親子所有権ツリー機構）'
  },
  {
    day: 'Day 02',
    previewSubject: '【Qt×Linux即答ドリル Day02】QThreadの正しい使い方（moveToThread vs サブクラス化）',
    sender: 'シロクマ先生（シロクマTech Qt開発室）<newsletter@shirokuma-tech.jp>',
    paragraphs: [
      'おはようございます！今朝のテーマは「QThreadの正しい設計パターン」です。',
      'かつてはQThreadを継承してrun()をオーバーライドする手法が一般的でしたが、現在では【QObjectワーカーを作成してmoveToThread()する】手法が推奨されています。',
      'これによりワーカー内のスロットが別スレッドのイベントループ上で安全に実行され、シグナル＆スロットによるスレッド間通信が極めて自然に機能します。'
    ],
    quizQuestion: 'Q: Qtで推奨されるマルチスレッド設計で、ワーカーを別スレッドに移すメソッドは？',
    quizAnswer: 'A: QObject::moveToThread(QThread* targetThread)'
  },
  {
    day: 'Day 03',
    previewSubject: '【Qt×Linux即答ドリル Day03】Qt::QueuedConnectionによるスレッドセーフなGUI更新',
    sender: 'シロクマ先生（シロクマTech Qt開発室）<newsletter@shirokuma-tech.jp>',
    paragraphs: [
      'おはようございます！本日はGUIスレッド安全性の鉄則「Qt::ConnectionType」です。',
      'QtのGUIウィジェットはメインスレッド（GUIスレッド）以外から直接操作すると未定義動作を起こします。',
      '別スレッドからGUIスレッドへシグナルを発行すると、Qtは自動的に【Qt::QueuedConnection】を選択し、メインスレッドのイベントキューに安全にディスパッチしてくれます。'
    ],
    quizQuestion: 'Q: 異なるスレッド間でシグナル・スロットを接続した際、デフォルトで適用される接続型は？',
    quizAnswer: 'A: Qt::QueuedConnection（受信側スレッドのイベントループにキューイング）'
  }
];

export const AFFILIATE_ITEMS: ServiceAffiliateItem[] = [
  {
    id: 'a8-rakuten-qt',
    name: '楽天市場 Linux・組込み開発ボード・専門書籍',
    category: 'shopping',
    badge: 'ポイント還元',
    description: 'Raspberry Pi・産業用シングルボードPC・Qt専門書・タッチ液晶モジュールをお得に購入。',
    priceNote: '楽天お買い物マラソン・ポイント最大利用',
    linkUrl: A8_RAKUTEN_TOP_URL,
    trackingPixelUrl: A8_RAKUTEN_TOP_PIXEL,
    icon: '🛒',
    recommendPoint: 'ラズパイやタッチ液晶パネルなど、実機でQt GUIを動かすハードウェアを楽天ポイントでお得に調達じゃ！'
  }
];

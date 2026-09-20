import { Chapter } from '../../types/curriculum';

export const chapter8: Chapter = {
  id: 8,
  slug: 'chapter-8',
  courseTrack: 'modern',
  title: '第8章：大容量データのメモリ管理：Qtアプリでのスマートポインタの正しい使い方',
  subtitle: 'メモリリークを防ぐ波形データの管理',
  badge: '第2部：マルチスレッド',
  description: 'std::shared_ptr や QSharedPointer を駆使し、メモリリークを起こさずに大量の波形データを管理する手法を学びます。',
  sections: [
    {
      id: 'sec8-1',
      title: 'Qtのメモリ管理モデル（Parent-Child）とスマートポインタ',
      explanationText: 'Qtの `QObject` 派生クラスは「親（Parent）」を指定してインスタンス化すると、親が破棄されたときに子供も自動的に `delete` されるという強力なメモリ管理モデルを持っています。\n\nしかし、ネットワークから次々と飛んでくる「波形データ」のような単なるデータ構造（プレーンなC++構造体）にはこの仕組みは適用されません。このようなデータをスレッド間でシグナルを通してやり取りする場合、C++標準の `std::shared_ptr`（またはQtの `QSharedPointer`）を使って、参照カウントによる確実なメモリ解放を行う必要があります。'
    }
  ]
};

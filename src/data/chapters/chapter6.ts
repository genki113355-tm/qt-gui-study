import { Chapter } from '../../types/curriculum';

export const chapter6: Chapter = {
  id: 6,
  slug: 'chapter-6',
  courseTrack: 'modern',
  title: '第6章：QCustomPlot / Qt Graphs を使った高速リアルタイム波形描画',
  subtitle: '60fpsでの最適化テクニック',
  badge: '第2部：マルチスレッド',
  description: 'オシロスコープやレーダー波形など、毎秒60フレームで大量のデータを描画するための最適化テクニック。',
  sections: [
    {
      id: 'sec6-1',
      title: 'リアルタイム波形描画の課題',
      explanationText: '心電図モニターやオシロスコープのように、毎秒数千個のデータポイントが流れてくるような画面を描画する場合、標準のUI部品を組み合わせて描画するとすぐにCPU使用率が100%になり画面がカクつきます。\n\nQtには高速なグラフ描画に特化したC++ライブラリ（Qt Charts, Qt Graphs, あるいはOSSの QCustomPlot など）が存在します。これらをQMLの画面内に埋め込むのが定石です。',
      takeaways: [
        {
          title: 'データポイントの追加コスト',
          description: 'データが1つ来るたびにグラフ全体を再描画（update）していると間に合いません。バッファリングと間引き（デシメーション）が必須になります。'
        }
      ]
    }
  ]
};

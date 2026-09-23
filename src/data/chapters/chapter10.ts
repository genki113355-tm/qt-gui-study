import { Chapter } from '../../types/curriculum';

export const chapter10: Chapter = {
  id: 10,
  slug: 'chapter-10',
  courseTrack: 'reading',
  courseChapterCode: 'Ch.10',
  title: '第10章：Linux環境でのパフォーマンス・プロファイリング',
  subtitle: 'ボトルネックの解析とフレーム安定化',
  badge: '第3部：品質・デプロイ',
  seoDescription: 'Linux環境におけるQtアプリケーションのパフォーマンスプロファイリング。Valgrind Memcheck、Linux perf、Hotspotフレームグラフ、QML Profilerの活用法を解説。',
  githubSnapshot: {
    tagOrBranch: 'ch10-profiling',
    folderPath: 'examples/ch10-performance-profiling',
    url: 'https://github.com/genki113355-tm/qt-gui-study/tree/main/examples/ch10-performance-profiling',
    description: '第10章のプロファイリング対象サンプルプロジェクト（負荷シミュレーション付き）',
    cloneCommand: 'git clone https://github.com/genki113355-tm/qt-gui-study.git && cd qt-gui-study/examples/ch10-performance-profiling',
  },
  prerequisites: [
    {
      title: 'Valgrind Memcheckによるヒープ解析',
      term: 'Valgrind Memcheck',
      description: 'Linuxでヒープメモリリークや未初期化メモリ参照を行番号付きで特定する動的解析ツール。',
    },
    {
      title: 'Linux perf & Hotspotフレームグラフ',
      term: 'Linux perf & Hotspot',
      description: 'CPUボトルネックを特定するプロファイラ。Flame Graph（炎グラフ）で重い関数コールを可視化。',
    },
    {
      title: 'QML Profilerによるバインディング最適化',
      term: 'QML Profiler',
      description: 'Qt Creator付属のプロファイラ。QMLバインディングの実行時間やフレームドロップ（Animation落ち）を秒刻みで追跡。',
      labLink: '/auto/chapter-4',
      labLabel: 'Autoラボ第4章で復習',
    },
  ],
  relatedLabs: [
    {
      title: 'GitHub ActionsによるCI/CD自動化実践',
      labName: 'シロクマC++自動化ラボ',
      badge: 'Chap 4',
      url: '/auto/chapter-4',
      description: 'CIパイプラインで自動テストと静的・動的解析を走らせる自動化ワークフローを構築します。',
      icon: '🚀',
    },
  ],
  description: 'アプリが重い・メモリを食う時の原因特定。ボトルネックの解析とフレームレート安定化の手法。',
  sections: [
    {
      id: 'sec-10-1',
      title: '10.1 C++とメモリリークの恐怖',
      explanationText: 'C++開発において最も恐ろしいバグの一つが「メモリリーク」です。長時間稼働する計器ダッシュボードでメモリリークが発生すると、数日後にシステムがクラッシュし、重大な事故に繋がります。\n\nQtは親オブジェクトが子を破棄するツリー構造（Object Tree）を持っていますが、親を設定し忘れた `new` や、生ポインタの管理ミスによって容易にリークが発生します。',
      takeaways: [
        {
          title: 'スマートポインタの活用',
          description: '第8章で学んだ通り、現代のC++では生ポインタの `new/delete` を避け、`std::unique_ptr` や `std::shared_ptr` を使うのが基本の防衛策です。'
        }
      ]
    },
    {
      id: 'sec-10-2',
      title: '10.2 Valgrind (Memcheck) によるメモリ解析',
      explanationText: 'Linux環境には、メモリリークを検出するための最強のツール **Valgrind** が存在します。プログラムをValgrind経由で起動するだけで、終了時に「どこで確保されたメモリが解放されていないか」をソースコードの行番号付きで指摘してくれます。',
      codeFiles: [
        {
          filename: 'Terminal',
          language: 'bash',
          description: 'Valgrindを使ったメモリ解析コマンド',
          code: `# インストール
sudo apt install valgrind

# Memcheckツールを使ってQtアプリを起動
valgrind --leak-check=full --show-leak-kinds=all ./QtDashboard`
        }
      ]
    },
    {
      id: 'sec-10-3',
      title: '10.3 HotspotとperfによるCPUボトルネック解析',
      explanationText: '「画面の描画がカクつく（60fps出ない）」「ボタンの反応が遅い」といったパフォーマンス問題（ボトルネック）を特定するには、Linux標準のプロファイラである `perf` を使用します。\n\nしかし `perf` の出力は人間には読みにくいため、GUIで結果を可視化する **Hotspot** というツール（実はこれもQtで作られています）を組み合わせて分析するのがモダンな手法です。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'perf でデータを記録',
          description: '`perf record -g ./QtDashboard` コマンドでアプリを起動し、重い操作を実行してから終了します。`perf.data` という記録ファイルが生成されます。',
          impact: 'アプリのどの関数に何ミリ秒かかったかのコールスタックが記録されます。'
        },
        {
          stepNumber: 2,
          title: 'Hotspot でフレームグラフを開く',
          description: 'Hotspotアプリで `perf.data` を開くと、「Flame Graph（炎のようなグラフ）」が表示され、一番幅が広い（時間を食っている）関数が一目で特定できます。',
          impact: '「なんとなくここが重そう」という勘ではなく、データに基づいた確実なコード最適化が可能になります。'
        }
      ]
    },
    {
      id: 'sec-10-4',
      title: '10.4 GUIスレッドのブロックを避ける',
      explanationText: 'ボトルネック解析で最もよく見つかるアンチパターンが、「GUIスレッド（メインスレッド）の中で重いループ計算やネットワーク通信を行っている」というものです。\n\nこれを見つけたら、第5章で学んだ `QThread` と Worker パターンを使って処理を別スレッドに逃がし、GUIのフレームレートを安定させることが重要です。',
      takeaways: []
    }
  ]
};

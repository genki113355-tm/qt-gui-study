import { Chapter } from '../../types/curriculum';

export const chapter11: Chapter = {
  id: 11,
  slug: 'chapter-11',
  courseTrack: 'reading',
  title: '第11章：LinuxでのQtアプリのデプロイ（linuxdeployqt）',
  subtitle: 'パッケージング技術と.soの同梱',
  badge: '第3部：品質・デプロイ',
  description: '依存する共有ライブラリ（.so）を一つのパッケージにまとめ、別のLinux PCでもそのまま動くようにするパッケージング技術。',
  sections: [
    {
      id: 'sec-11-1',
      title: '11.1 Linuxの「依存関係地獄 (Dependency Hell)」',
      explanationText: 'Windowsではアプリに必要な `.dll` を同じフォルダに入れて配布するのが一般的ですが、Linuxの世界ではシステム全体の共有ライブラリ（`/usr/lib/` などの `.so` ファイル）に依存して動くのが基本です。\n\nそのため、「開発機（Ubuntu 22.04）でビルドした実行ファイルを、客先の別のLinux PCにコピーして実行したら、ライブラリのバージョンが違って起動しない」というトラブルが日常茶飯事です。',
      takeaways: [
        {
          title: '動的リンクの罠',
          description: '`ldd ./QtDashboard` というコマンドを叩くと、アプリが依存している膨大な数の `.so` ファイルのリストが表示されます。これらがターゲット機にも全く同じように存在している必要があります。'
        }
      ]
    },
    {
      id: 'sec-11-2',
      title: '11.2 linuxdeployqt の活用',
      explanationText: 'この問題を解決するために、Qtが提供しているのが（コミュニティ製ツールの） **`linuxdeployqt`** です。これは、Windows版の `windeployqt` のLinux版に相当します。\n\nこのツールは、実行ファイルが必要とするQtの共有ライブラリ（`libQt5Core.so` など）やプラグインを自動でかき集め、実行ファイルと同じフォルダにパッキングしてくれます。',
      codeFiles: [
        {
          filename: 'Terminal',
          language: 'bash',
          description: 'linuxdeployqt を使ったパッケージング',
          code: `# 1. ツールをダウンロードして実行権限を付与
wget -c "https://github.com/probonopd/linuxdeployqt/releases/download/continuous/linuxdeployqt-continuous-x86_64.AppImage"
chmod a+x linuxdeployqt-continuous-x86_64.AppImage

# 2. パッケージングを実行
./linuxdeployqt-continuous-x86_64.AppImage ./bin/QtDashboard -appimage`
        }
      ]
    },
    {
      id: 'sec-11-3',
      title: '11.3 AppImage 形式での配布',
      explanationText: '上記のコマンドで `-appimage` オプションをつけることで、Linux向けのポータブルアプリフォーマットである **AppImage** ファイル（例：`QtDashboard-x86_64.AppImage`）が生成されます。',
      processSteps: [
        {
          stepNumber: 1,
          title: 'AppImageの特徴',
          description: 'Macの `.dmg` やWindowsの `.exe` (ポータブル版) のように、インストール不要で、ファイルをダブルクリック（またはターミナルから実行）するだけで動きます。',
          impact: '内部に必要なライブラリがすべて内包されているため、OSのバージョン違いによるトラブルを劇的に減らせます。'
        },
        {
          stepNumber: 2,
          title: 'より強固な手段（Docker / Flatpak）',
          description: 'さらに現代的なアプローチとして、GUIごとDockerコンテナに封じ込める手法や、Flatpakを利用したサンドボックス型配布もエンタープライズ領域で普及してきています。',
          impact: 'ターゲットマシンの要件（組み込み機器か、デスクトップPCか）に合わせて最適なデプロイ手法を選択します。'
        }
      ]
    }
  ]
};

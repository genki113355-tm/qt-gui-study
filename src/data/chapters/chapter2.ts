import { Chapter } from '../../types/curriculum';

export const chapter2: Chapter = {
  id: 2,
  slug: 'chapter-2',
  courseTrack: 'classic',
  title: '第2章：ダッシュボードのメイン画面（TOPページ）を設計する',
  subtitle: 'QMLによるUIモックアップの作成',
  badge: '第1部：Qtアーキテクチャ',
  description: '空のウィンドウから脱却し、産業用ダッシュボードの骨組みとなる最初のメイン画面（TOPページ）をQMLで構築します。',
  sections: [
    {
      id: 'sec2-1',
      title: 'QMLとは何か？ C++とUIを分離する宣言的アプローチ',
      explanationText: 'これまでC++でUIを作る場合、`new QPushButton("Click Me")` のようにコードでガリガリとボタンの座標やサイズを指定するのが一般的でした（Qt Widgetsの手法）。\n\nしかし、現代のHMI（Human Machine Interface）開発では、アニメーションやレスポンシブなレイアウトが求められます。そこで登場したのが**QML（Qt Meta-Language）**です。QMLはJSONやCSSに似た「宣言的」な記法でUIの見た目だけを記述し、裏側の複雑な計算やデータ処理はC++に任せるという、**「見た目とロジックの完全分離」**を実現します。',
      takeaways: [
        {
          title: 'QMLはUIの「設計図」',
          description: 'C++コードの中にUIの座標計算を混ぜ込まず、見た目はQMLファイルに切り出すことで、デザイナーとプログラマの分業が可能になります。'
        }
      ]
    },
    {
      id: 'sec2-2',
      title: 'ダッシュボードの骨組みを作る（Layouts）',
      explanationText: 'さっそく、QMLを使ってダッシュボードのベースとなる画面を作成しましょう。産業用UIでは、画面のサイズが変わっても各メーターやグラフが適切にリサイズされる必要があります。\n\n`RowLayout` や `GridLayout` を使うことで、絶対座標（x=100, y=200等）を指定することなく、画面全体に綺麗にコンポーネントを配置できます。以下のコードは、左側にサイドバー、右側にメインの計器エリアを配置する基本的な骨組みです。',
      codeFiles: [
        {
          filename: 'main.qml',
          language: 'qml',
          description: 'ダッシュボードの基本的なレイアウト',
          code: `import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Layouts 1.15

Window {
    width: 1024
    height: 768
    visible: true
    title: qsTr("産業用ダッシュボード HMI")
    color: "#0f172a" // ダークブルーの背景色

    RowLayout {
        anchors.fill: parent
        spacing: 0

        // サイドメニュー領域
        Rectangle {
            Layout.preferredWidth: 250
            Layout.fillHeight: true
            color: "#1e293b"
            
            Text {
                anchors.centerIn: parent
                text: "SYSTEM MENU"
                color: "#94a3b8"
                font.bold: true
            }
        }

        // メイン計器領域（プレースホルダー）
        Rectangle {
            Layout.fillWidth: true
            Layout.fillHeight: true
            color: "transparent"

            GridLayout {
                anchors.fill: parent
                anchors.margins: 20
                columns: 2
                rowSpacing: 20
                columnSpacing: 20

                // メーター等の仮枠
                Rectangle {
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    color: "#334155"
                    radius: 10
                    Text { anchors.centerIn: parent; text: "RADAR CHART"; color: "white" }
                }
                Rectangle {
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    color: "#334155"
                    radius: 10
                    Text { anchors.centerIn: parent; text: "MAIN THRUST"; color: "white" }
                }
            }
        }
    }
}`
        }
      ],
      takeaways: [
        {
          title: 'Layout.fillWidth と anchors',
          description: 'QMLの強力なレイアウトシステムです。画面サイズに応じてコンポーネントが自動的に伸縮します。'
        }
      ]
    }
  ]
};

# シロクマQt×C++ラボ サンプルコード一覧

本ディレクトリには、Webサイト「シロクマQt×C++ラボ（https://shirokuma-tech.jp/qt/）」で解説されている全章の実機ビルド可能なQt 6 / CMakeプロジェクトが収録されています。

---

## 📁 章別ディレクトリ構成

| ディレクトリ | 章・内容 | 技術スタック |
| :--- | :--- | :--- |
| **`ch00-env-setup/`** | 🔰 準備編：開発環境セットアップ | Qt 6.5+, CMake, Ninja, C++17 |
| **`ch01-qml-basics/`** | 第1章：Qt/QMLクイックスタート | QML宣言型シーングラフ, C++ハイブリッド |
| **`ch02-signals-slots/`** | 第2章：シグナル＆スロット基礎 | 新旧connect構文, 型安全ポインタ, MOC |
| **`ch03-data-binding/`** | 第3章：C++とQMLのデータバインディング | `Q_PROPERTY`, `Q_INVOKABLE`, ViewModel |
| **`ch04-custom-components/`** | 第4章：QMLカスタムコンポーネント | 円形ゲージ, Canvas, State, アニメーション |
| **`ch05-multithreading/`** | 第5章：QThreadとマルチスレッド | `moveToThread`, Workerパターン, GUI分離 |
| **`ch06-realtime-waveform/`** | 第6章：60fpsリアルタイム波形描画 | `QQuickPaintedItem`, 固定長リングバッファ |
| **`ch07-udp-telemetry/`** | 第7章：産業用非同期通信 | `QUdpSocket`, アラーム判定, ウォッチドッグ |
| **`ch08-memory-management/`** | 第8章：メモリ管理と所有権 | `QObject` 親子ツリー, `std::shared_ptr`, `QPointer` |
| **`ch09-qt-test/`** | 第9章：Qtアプリケーションのテスト | `Qt Test`, `QSignalSpy`, UIシミュレーション |
| **`ch10-packaging-deploy/`** | 第10章：Linux配布とパッケージング | `linuxdeployqt`, `AppImage`, CPack |
| **`ch11-troubleshooting/`** | 第11章：トラブルシューティング | AddressSanitizer, QML Profiler |
| **`ch12-complete-dashboard/`** | 第12章：総合演習：産業用ダッシュボード | 全機能統合（マルチスレッド・波形・UDP・GUI） |

---

## 🚀 ビルド＆実行方法

### 前提条件
- Qt 6.5 以上（Core, Gui, Quick, Network, Test）
- CMake 3.20 以上
- C++17 対応コンパイラ（GCC 11+, Clang 14+, MSVC 2019+）
- Ninja（推奨）

### ビルドコマンド例（第12章ダッシュボードの場合）
```bash
# 1. プロジェクトディレクトリへ移動
cd examples/ch12-complete-dashboard

# 2. ビルドディレクトリ作成とCMake設定
cmake -B build -G Ninja -DCMAKE_BUILD_TYPE=Release

# 3. ビルド実行
cmake --build build

# 4. アプリケーション実行
./build/TelemetryDashboard
```

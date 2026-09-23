#!/usr/bin/env bash
# ==============================================================================
# 第11章: linuxdeployqt を用いた AppImage 自動ビルドスクリプト
# ==============================================================================
set -e

APP_NAME="QtDashboard"
BUILD_DIR="build"

echo "=== 1. ビルドの実行 ==="
cmake -B ${BUILD_DIR} -S . -DCMAKE_BUILD_TYPE=Release
cmake --build ${BUILD_DIR} -j$(nproc)

echo "=== 2. linuxdeployqt の取得 ==="
if [ ! -f "linuxdeployqt-continuous-x86_64.AppImage" ]; then
    wget -c "https://github.com/probonopd/linuxdeployqt/releases/download/continuous/linuxdeployqt-continuous-x86_64.AppImage"
    chmod +x linuxdeployqt-continuous-x86_64.AppImage
fi

echo "=== 3. AppImage パッケージング ==="
# linuxdeployqt を実行して共有ライブラリ（.so）を同梱し AppImage を出力
./linuxdeployqt-continuous-x86_64.AppImage ${BUILD_DIR}/${APP_NAME} -appimage -qmldir=.

echo "=== 完了: ${APP_NAME}-x86_64.AppImage が生成されました ==="

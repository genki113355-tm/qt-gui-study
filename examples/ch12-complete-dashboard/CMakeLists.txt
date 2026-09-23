cmake_minimum_required(VERSION 3.20)
project(Ch12_DashboardComplete VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 6.5 REQUIRED COMPONENTS Quick Network Widgets)

qt_add_executable(Ch12_DashboardComplete
    main.cpp
    RingBuffer.h
    WaveformItem.h
    WaveformItem.cpp
    UdpReceiver.h
    UdpReceiver.cpp
)

qt_add_qml_module(Ch12_DashboardComplete
    URI TelemetryDashboard
    VERSION 1.0
    QML_FILES DashboardMain.qml
    SOURCES
        RingBuffer.h
        WaveformItem.h WaveformItem.cpp
        UdpReceiver.h UdpReceiver.cpp
)

target_link_libraries(Ch12_DashboardComplete
    PRIVATE
        Qt6::Quick
        Qt6::Network
        Qt6::Widgets
)

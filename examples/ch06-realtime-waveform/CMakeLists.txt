cmake_minimum_required(VERSION 3.20)
project(Ch06_WaveformPlot VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 6.5 REQUIRED COMPONENTS Quick)

qt_add_executable(Ch06_WaveformPlot
    main.cpp
    RingBuffer.h
    WaveformItem.h
    WaveformItem.cpp
)

qt_add_qml_module(Ch06_WaveformPlot
    URI Ch06_WaveformPlot
    VERSION 1.0
    QML_FILES Main.qml
    SOURCES
        RingBuffer.h WaveformItem.h WaveformItem.cpp
)

target_link_libraries(Ch06_WaveformPlot PRIVATE Qt6::Quick)

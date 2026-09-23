cmake_minimum_required(VERSION 3.20)
project(Ch03_DataBinding VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 6.5 REQUIRED COMPONENTS Quick)

qt_add_executable(Ch03_DataBinding
    main.cpp
    SensorViewModel.h
    SensorViewModel.cpp
)

qt_add_qml_module(Ch03_DataBinding
    URI Ch03_DataBinding
    VERSION 1.0
    QML_FILES Main.qml
    SOURCES
        SensorViewModel.h SensorViewModel.cpp
)

target_link_libraries(Ch03_DataBinding PRIVATE Qt6::Quick)

cmake_minimum_required(VERSION 3.20)
project(Ch01_QmlBasics VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 6.5 REQUIRED COMPONENTS Quick)

qt_add_executable(Ch01_QmlBasics main.cpp)

qt_add_qml_module(Ch01_QmlBasics
    URI Ch01_QmlBasics
    VERSION 1.0
    QML_FILES Main.qml
)

target_link_libraries(Ch01_QmlBasics PRIVATE Qt6::Quick)

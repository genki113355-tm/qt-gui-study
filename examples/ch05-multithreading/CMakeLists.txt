cmake_minimum_required(VERSION 3.20)
project(Ch05_Multithreading VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 6.5 REQUIRED COMPONENTS Quick)

qt_add_executable(Ch05_Multithreading
    main.cpp
    WorkerObject.h
    WorkerObject.cpp
)

qt_add_qml_module(Ch05_Multithreading
    URI Ch05_Multithreading
    VERSION 1.0
    QML_FILES Main.qml
    SOURCES
        WorkerObject.h WorkerObject.cpp
)

target_link_libraries(Ch05_Multithreading PRIVATE Qt6::Quick)

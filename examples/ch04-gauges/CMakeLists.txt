cmake_minimum_required(VERSION 3.16)
project(Ch04Gauges LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

find_package(Qt6 REQUIRED COMPONENTS Core Gui Quick)

add_executable(ch04_gauges
    main.cpp
    SystemMonitor.h
)

target_link_libraries(ch04_gauges PRIVATE
    Qt6::Core
    Qt6::Gui
    Qt6::Quick
)

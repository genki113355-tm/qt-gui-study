cmake_minimum_required(VERSION 3.16)
project(Ch08MemoryManagement LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)

find_package(Qt6 REQUIRED COMPONENTS Core)

add_executable(ch08_memory
    main.cpp
    WaveformData.h
)

target_link_libraries(ch08_memory PRIVATE
    Qt6::Core
)

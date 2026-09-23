cmake_minimum_required(VERSION 3.16)
project(Ch10PerformanceProfiling LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# デバッグシンボルを含めてプロファイリングを容易にする
set(CMAKE_BUILD_TYPE RelWithDebInfo)

find_package(Qt6 REQUIRED COMPONENTS Core)

add_executable(ch10_profiler_target
    main.cpp
)

target_link_libraries(ch10_profiler_target PRIVATE
    Qt6::Core
)

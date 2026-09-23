cmake_minimum_required(VERSION 3.20)
project(Ch00_EnvSetup VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 6.5 REQUIRED COMPONENTS Core)

add_executable(Ch00_EnvSetup main.cpp)
target_link_libraries(Ch00_EnvSetup PRIVATE Qt6::Core)

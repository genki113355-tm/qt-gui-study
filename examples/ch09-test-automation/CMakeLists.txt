cmake_minimum_required(VERSION 3.16)
project(Ch09TestAutomation LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)

find_package(Qt6 REQUIRED COMPONENTS Core Test)

enable_testing()

add_executable(test_sensor_parser
    TestSensorParser.cpp
)

target_link_libraries(test_sensor_parser PRIVATE
    Qt6::Core
    Qt6::Test
)

add_test(NAME TestSensorParser COMMAND test_sensor_parser)

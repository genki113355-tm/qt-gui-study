cmake_minimum_required(VERSION 3.16)
project(Ch07UdpReceiver LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)

find_package(Qt6 REQUIRED COMPONENTS Core Network)

add_executable(ch07_udp_receiver
    main.cpp
    UdpReceiver.h
    UdpReceiver.cpp
    SensorPacket.h
)

target_link_libraries(ch07_udp_receiver PRIVATE
    Qt6::Core
    Qt6::Network
)

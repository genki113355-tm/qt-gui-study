#pragma once
#include <vector>
#include <mutex>
#include <cstddef>

template <typename T, size_t Capacity>
class RingBuffer {
public:
    RingBuffer() : m_buffer(Capacity), m_head(0), m_size(0) {}

    void push(const T& item) {
        std::lock_guard<std::mutex> lock(m_mutex);
        m_buffer[m_head] = item;
        m_head = (m_head + 1) % Capacity;
        if (m_size < Capacity) {
            m_size++;
        }
    }

    std::vector<T> snapshot() const {
        std::lock_guard<std::mutex> lock(m_mutex);
        std::vector<T> result;
        result.reserve(m_size);

        if (m_size < Capacity) {
            result.insert(result.end(), m_buffer.begin(), m_buffer.begin() + m_size);
        } else {
            result.insert(result.end(), m_buffer.begin() + m_head, m_buffer.end());
            result.insert(result.end(), m_buffer.begin(), m_buffer.begin() + m_head);
        }
        return result;
    }

    void clear() {
        std::lock_guard<std::mutex> lock(m_mutex);
        m_head = 0;
        m_size = 0;
    }

private:
    std::vector<T> m_buffer;
    size_t m_head;
    size_t m_size;
    mutable std::mutex m_mutex;
};

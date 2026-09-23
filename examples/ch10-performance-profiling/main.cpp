#include <QCoreApplication>
#include <QVector>
#include <cmath>
#include <iostream>

void simulateHeavyProcessing()
{
    double sum = 0.0;
    for (int i = 0; i < 5000000; ++i) {
        sum += std::sin(static_cast<double>(i) * 0.001);
    }
    std::cout << "Computation done: " << sum << std::endl;
}

int main(int argc, char *argv[])
{
    QCoreApplication app(argc, argv);
    std::cout << "Starting heavy profile test..." << std::endl;
    simulateHeavyProcessing();
    return 0;
}

#include <QtTest>

class SensorParser {
public:
    bool parse(const QString &data) {
        if (!data.startsWith("TEMP:")) return false;
        bool ok = false;
        m_temp = data.mid(5).toDouble(&ok);
        return ok;
    }
    double getTemperature() const { return m_temp; }
private:
    double m_temp = 0.0;
};

class TestSensorParser : public QObject {
    Q_OBJECT

private slots:
    void initTestCase() {
        qDebug("単体テストを開始します");
    }

    void testValidData() {
        SensorParser parser;
        bool ok = parser.parse("TEMP:45.5");
        QVERIFY(ok == true);
        QCOMPARE(parser.getTemperature(), 45.5);
    }

    void testInvalidData() {
        SensorParser parser;
        bool ok = parser.parse("INVALID");
        QVERIFY(ok == false);
    }
};

QTEST_MAIN(TestSensorParser)
#include "TestSensorParser.moc"

#
# Light sensor
import board
import busio
import adafruit_tsl2561
# Temperature sensor
from w1thermsensor import W1ThermSensor

air_temp_sensor = W1ThermSensor()
soil_temp_sensor = W1ThermSensor()

# specific sensor
# air_temp_sensor = W1ThermSensor(W1ThermSensor.THERM_SENSOR_DS18B20,"00000588806a")
# soil_temp_sensor = W1ThermSensor(W1ThermSensor.THERM_SENSOR_DS18B20,"00000588806a")

while True:
    air_temperature = air_temp_sensor.get_temperature(W1ThermSensor.DEGREES_F)
    soil_temperature = soil_temp_sensor.get_temperature(W1ThermSensor.DEGREES_F)
    print(f'Air Temperature: {air_temperature} and Soil Temperature: {soil_temperature}')
    # Light Intensity
    i2c = busio.I2C(board.SCL, board.SDA)
    light_sensor = adafruit_tsl2561.TSL2561(i2c)
    print(f'Luminousity: {light_sensor.lux}')
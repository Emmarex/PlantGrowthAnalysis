#
import requests
# Light sensor
import board
import busio
import adafruit_tsl2561
# Temperature sensor
from w1thermsensor import W1ThermSensor

def log_data_to_server(sensor_data):
    log_data = requests.post('http://127.0.0.1:5000/dump_data',data=sensor_data)
    if log_data.status_code == 200:
        print('Successful')
    else:
        log_data_to_server(sensor_data)

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
    # send to server
    sensor_data = {
        "light_intensity":light_sensor.lux,
        "soil_temp":soil_temperature,
        "air_temp":air_temperature,
        "soil_mois_1" : "",
        "soil_mois_2" : "",
        "soil_mois_3" : ""
    }
    log_data_to_server(sensor_data)
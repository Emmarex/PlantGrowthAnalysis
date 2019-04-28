#
import requests
# Temperature sensor
from w1thermsensor import W1ThermSensor

def log_raspberry_data_to_server(sensor_data):
    log_data = requests.post('http://127.0.0.1:5000/dump_pi_data',data=sensor_data)
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
    try:
        air_temperature = air_temp_sensor.get_temperature(W1ThermSensor.DEGREES_F)
        soil_temperature = soil_temp_sensor.get_temperature(W1ThermSensor.DEGREES_F)
        print(f'Air Temperature: {air_temperature} and Soil Temperature: {soil_temperature}')
        # send to server
        sensor_data = {
            "soil_temp":soil_temperature,
            "air_temp":air_temperature,
        }
        log_raspberry_data_to_server(sensor_data)
    except Exception as e:
        print(f'[ERROR] : Raspberry Logger : {e}')
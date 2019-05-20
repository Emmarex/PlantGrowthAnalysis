#
import csv
from datetime import datetime
import requests
# Temperature sensor
from w1thermsensor import W1ThermSensor

def log_raspberry_data_to_server(sensor_data):
    log_data = requests.post('http://127.0.0.1:5000/dump_pi_data',data=sensor_data)
    if log_data.status_code == 200:
        res = log_data.json()
        if res['error'] == "0":
            print('Data Logging Successful')
        else:
            print(f'ERROR: {res["message"]}')
    else:
        log_data_to_server(sensor_data)

def save_to_csv(data):
    with open('../csv_data/raspberry_logger.csv', 'a') as csvFile:
        writer = csv.writer(csvFile)
        writer.writerow(data)
    csvFile.close()

air_temp_sensor = W1ThermSensor()
soil_temp_sensor = W1ThermSensor()

# specific sensor
# air_temp_sensor = W1ThermSensor(W1ThermSensor.THERM_SENSOR_DS18B20,"00000588806a")
# soil_temp_sensor = W1ThermSensor(W1ThermSensor.THERM_SENSOR_DS18B20,"00000588806a")

while True:
    try:
        air_temperature = air_temp_sensor.get_temperature(W1ThermSensor.DEGREES_C)
        soil_temperature = soil_temp_sensor.get_temperature(W1ThermSensor.DEGREES_C)
        print(f'Air Temperature: {air_temperature} and Soil Temperature: {soil_temperature}')
        # send to server
        sensor_data = {
            "time_stamp": datetime.now(),
            "soil_temp":soil_temperature,
            "air_temp":air_temperature,
        }
        # save to csv
        save_to_csv([datetime.now(), soil_temperature, air_temperature])
        # 
        log_raspberry_data_to_server(sensor_data)
    except Exception as e:
        print(f'[ERROR] : Raspberry Logger : {e}')
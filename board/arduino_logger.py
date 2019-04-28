#
import requests
# Light sensor
import board
import busio
import adafruit_tsl2561

def log_arduino_data_to_server(sensor_data):
    log_data = requests.post('http://127.0.0.1:5000/dump_arduino_data',data=sensor_data)
    if log_data.status_code == 200:
        print('Successful')
    else:
        log_data_to_server(sensor_data)
    
while True:
    try:
        # Light Intensity
        i2c = busio.I2C(board.SCL, board.SDA)
        light_sensor = adafruit_tsl2561.TSL2561(i2c)
        print(f'Luminousity: {light_sensor.lux}')
        # send to server
        sensor_data = {
            "light_intensity":light_sensor.lux,
            "soil_mois_1" : "",
            "soil_mois_2" : "",
            "soil_mois_3" : ""
        }
        log_arduino_data_to_server(sensor_data)
    except Exception as e:
        print(f'[ERROR] : Arduino Logger : {e}')
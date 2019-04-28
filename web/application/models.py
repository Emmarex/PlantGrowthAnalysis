from .app import data_base

def dump_datetime(value):
    if value is None:
        return None
    return f'{value.strftime("%Y-%m-%d %H:%M:%S")}'

class RapsberrySensorData(data_base.Model):
    __tablename__ = "rapsberry_sensor_data_db"

    row_id = data_base.Column(data_base.Integer, primary_key=True)
    time_stamp = data_base.Column(data_base.DateTime)
    soil_temperature = data_base.Column(data_base.Float)
    air_temperature = data_base.Column(data_base.Float)

    @property
    def serialize(self):
        return {
           'time_stamp': dump_datetime(self.time_stamp),
           'soil_temp': self.soil_temperature,
           'air_temp': self.air_temperature,
        }

class ArduinoSensorData(data_base.Model):
    __tablename__ = "arduino_sensor_data_db"

    row_id = data_base.Column(data_base.Integer, primary_key=True)
    time_stamp = data_base.Column(data_base.DateTime)
    light_intensity = data_base.Column(data_base.Float)
    soil_moisture_01 = data_base.Column(data_base.Float, nullable=True)
    soil_moisture_02 = data_base.Column(data_base.Float, nullable=True)
    soil_moisture_03 = data_base.Column(data_base.Float, nullable=True)

    @property
    def serialize(self):
        return {
           'time_stamp': dump_datetime(self.time_stamp),
           'light_intensity': self.light_intensity,
           'soil_moisture_1': self.soil_moisture_01,
           'soil_moisture_2': self.soil_moisture_02,
           'soil_moisture_3': self.soil_moisture_03
        }
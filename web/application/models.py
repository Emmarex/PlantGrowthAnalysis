from .app import data_base

class SensorData(data_base.Model):
    __tablename__ = "sensor_data_db"

    row_id = data_base.Column(data_base.Integer, primary_key=True)
    time_stamp = data_base.Column(data_base.DateTime)
    light_intensity = data_base.Column(data_base.Float)
    soil_temperature = data_base.Column(data_base.Float)
    air_temperature = data_base.Column(data_base.Float)
    soil_moisture_01 = data_base.Column(data_base.Float)
    soil_moisture_02 = data_base.Column(data_base.Float)
    soil_moisture_02 = data_base.Column(data_base.Float)

    def __repr__(self):
        return '<SensorData {}>'.format(self.time_stamp)
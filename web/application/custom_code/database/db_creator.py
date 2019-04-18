import os

from sqlalchemy import create_engine, ForeignKey
from sqlalchemy import Column, Integer, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref
 
db_path = os.path.join(os.path.dirname(__file__), 'database/sensor_data.db')

engine = create_engine(f'sqlite:///{db_path}', echo=True)
Base = declarative_base()

class SensorData(Base):
    __tablename__ = "sensor_data_db"
    row_id = Column(Integer, primary_key=True)
    time_stamp = Column(DateTime)
    light_intensity = Column(Float)
    soil_temperature = Column(Float)
    air_temperature = Column(Float)
    soil_moisture_01 = Column(Float)
    soil_moisture_02 = Column(Float)
    soil_moisture_02 = Column(Float)

# create tables
Base.metadata.create_all(engine)
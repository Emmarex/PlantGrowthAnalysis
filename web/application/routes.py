from datetime import datetime
import json
from flask import Flask, render_template, redirect, request, jsonify
from flask import current_app as app

from .models import SensorData
from .app import data_base

@app.route("/",methods=['GET'])
def index_page():
    return render_template('index.html')

@app.route("/fetch_data",methods=['GET'])
def update_graph_data():
    try:
        query_record = SensorData.query.order_by(SensorData.time_stamp).all()
        return_data = {
            'error' : '0',
            'message' : '',
            'data' : [single_record.serialize for single_record in query_record]
        }
    except Exception as e:
        return_data = {
            'error' : '1',
            'message' : str(e)
        }
    return jsonify(return_data)

@app.route("/dump_data",methods=['POST'])
def data_dump_process():
    try:
        time_stamp_dt = datetime.strptime(request.form['time_stamp'],'%d-%m-%Y %H:%M')
        single_sensor_data = SensorData(time_stamp=time_stamp_dt,light_intensity=request.form['light_intensity'],
                                        soil_temperature=request.form['soil_temp'],air_temperature=request.form['air_temp'],
                                        soil_moisture_01=request.form['soil_mois_1'],soil_moisture_02=request.form['soil_mois_2'],
                                        soil_moisture_03=request.form['soil_mois_3'])
        data_base.session.add(single_sensor_data)
        data_base.session.commit()
        return_data = {
            'error' : '0',
            'message' : 'Data logged'
        }
    except Exception as e:
        return_data = {
            'error' : '1',
            'message' : str(e)
        }
    return jsonify(return_data)

@app.errorhandler(404)
def not_found(error):
    return redirect('/')
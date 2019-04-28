from datetime import datetime
import json
from flask import Flask, render_template, redirect, request, jsonify
from flask import current_app as app

from .models import RapsberrySensorData, ArduinoSensorData
from .app import data_base

@app.route("/",methods=['GET'])
def index_page():
    return render_template('index.html')

@app.route("/fetch_pi_data",methods=['GET'])
def update_graph_data():
    try:
        start = int(request.args.get('start'))
        stop = int(request.args.get('stop'))
        query_record = RapsberrySensorData.query.order_by(RapsberrySensorData.time_stamp).offset(start).limit(stop).all()
        return_data = {
            'data' : [single_record.serialize for single_record in query_record],
            'error' : '0',
            'message' : '',
            'count' : len(query_record)
        }
    except Exception as e:
        return_data = {
            'error' : '1',
            'message' : str(e)
        }
    return jsonify(return_data)

@app.route("/fetch_arduino_data",methods=['GET'])
def update_arudino_graph_data():
    try:
        start = int(request.args.get('start'))
        stop = int(request.args.get('stop'))
        query_record = ArduinoSensorData.query.order_by(ArduinoSensorData.time_stamp).offset(start).limit(stop).all()
        return_data = {
            'data' : [single_record.serialize for single_record in query_record],
            'error' : '0',
            'message' : '',
            'count' : len(query_record)
        }
    except Exception as e:
        return_data = {
            'error' : '1',
            'message' : str(e)
        }
    return jsonify(return_data)

@app.route("/dump_pi_data",methods=['POST'])
def data_dump_process():
    try:
        time_stamp_dt = datetime.strptime(request.form['time_stamp'],'%d-%m-%Y %H:%M')
        single_sensor_data = RapsberrySensorData(time_stamp=time_stamp_dt,soil_temperature=request.form['soil_temp'],
                                                air_temperature=request.form['air_temp'])
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

@app.route("/dump_arduino_data",methods=['POST'])
def arduino_data_dump_process():
    try:
        time_stamp_dt = datetime.strptime(request.form['time_stamp'],'%d-%m-%Y %H:%M')
        single_sensor_data = ArduinoSensorData(time_stamp=time_stamp_dt,light_intensity=request.form['light_intensity'],
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
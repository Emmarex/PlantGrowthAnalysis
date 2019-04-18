from flask import Flask, render_template, redirect
from flask import current_app as app

from .models import SensorData

@app.route("/",methods=['GET'])
def index_page():
    return render_template('index.html')

@app.route("/",methods=['GET'])
def update_graph_data():
    try:
        return_data = {
            'error' : '0'
        }
    except Exception as e:
        return_data = {
            'error' : '1',
            'message' : str(e)
        }
    return app.response_class(response=return_data,mimetype='application/json')

@app.errorhandler(404)
def not_found(error):
    return redirect('/')
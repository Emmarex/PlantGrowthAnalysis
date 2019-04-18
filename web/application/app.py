import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db_path = os.path.join(os.path.dirname(__file__), 'database/sensor_data.db')
data_base = SQLAlchemy()

def create_app():
    """Construct the core application."""
    flask_app = Flask(__name__, instance_relative_config=False)
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:////{db_path}'
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    flask_app.secret_key = "0_w9Ck_XvNFT3tfwO"
    data_base.init_app(flask_app)

    with flask_app.app_context():
        from . import routes
        return flask_app
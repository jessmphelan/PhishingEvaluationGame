from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin

#import routes
from .routes import init_routes

def create_app():
    app = Flask(__name__)
    CORS(app) 

    #app.config['CORS_HEADERS'] = 'Content-Type'
    #app.config["MONGO_URI"] = "mongodb://localhost:27017/immersion"
    app.config["MONGO_URI"] = "mongodb://localhost:27017/phishing_game"

    mongo = PyMongo(app)

    init_routes(app, mongo)

    return app

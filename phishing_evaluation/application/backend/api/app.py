from flask import Flask
from flask_pymongo import PyMongo

#import routes
from .routes import init_routes

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/phishing_game"

    mongo = PyMongo(app)

    init_routes(app, mongo)

    return app


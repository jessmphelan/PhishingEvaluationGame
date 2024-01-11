from flask import Flask
from flask_pymongo import PyMongo

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/phishing_game"

    mongo = PyMongo(app)

    # Import routes
    from .routes import init_routes
    init_routes(app, mongo)

    return app


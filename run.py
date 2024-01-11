"""
Where Flask App is initialized and config is loaded 
"""


from application.backend.api import flask_app

if __name__ == "__main__":
    flask_app.run(debug=True)
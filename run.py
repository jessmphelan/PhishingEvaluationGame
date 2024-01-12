#Flask App initialized and config is loaded 
from phishing_evaluation.application.backend.api import app

if __name__ == "__main__":
    app.run(debug=True)
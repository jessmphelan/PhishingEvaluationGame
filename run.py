#Flask App initialized and config is loaded 
from phishing_evaluation.application.backend.api import app

if __name__ == "__main__":
    context = ('cert.pem', 'key.pem')
    app.run(port=5000, debug=False, ssl_context=context)

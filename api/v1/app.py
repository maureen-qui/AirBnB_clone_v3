#!/usr/bin/python3
""" Module for first API """

from flask import Flask
from api.v1.views import app_views
from models import storage
from flask_cors import CORS


app = Flask(__name__)
app.register_blueprint(app_views)

# Configure CORS
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.teardown_appcontext
def teardown_appcontext(exception):
    storage.close()

@app.errorhandler(404)
def not_found(error):
    response = jsonify({"error": "Not found"})
    response.status_code = 404
    return response

if __name__ == "__main__":
    host = os.getenv('HBNB_API_HOST', '0.0.0.0')
    port = os.getenv('HBNB_API_PORT', 5000)
    app.run(host=host, port=port, threaded=True)

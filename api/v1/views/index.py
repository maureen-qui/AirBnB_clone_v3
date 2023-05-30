#!/usr/bin/python3
""" Module for index.py """

from flask import Blueprint, jsonify
from models import storage
from flask import jsonify
from api.v1.views import app_views
from models import storage

classes = {"amenities": "Amenity", "cities": "City", "places": "Place",
           "reviews": "Review", "states": "State", "users": "User"}

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1'

@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    return jsonify({"status": "OK"})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def stats():
    stats = {
        "amenities": storage.count('Amenity'),
        "cities": storage.count('City'),
        "places": storage.count('Place'),
        "reviews": storage.count('Review'),
        "states": storage.count('State'),
        "users": storage.count('User')
    }
    return jsonify(stats)

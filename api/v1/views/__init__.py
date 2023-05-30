#!/usr/bin/python3
""" Initialization file for views module """

from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.states import *
from api.v1.views.cities import  # Add this line to import the cities module
from api.v1.views.amenities import  # Add this line to import the amenities module
from api.v1.views.users import  # Add this line to import the users module
from api.v1.views.places import  # Add this line to import the places module
from api.v1.views.places_reviews import  # Add this line to import the places_reviews module
from api.v1.views.places_amenities import *

import os
from os import path
from os import sys
from flask import Flask, send_from_directory, json, jsonify, request, Response
from dotenv import load_dotenv, find_dotenv
from google.cloud import storage
from flask_socketio import SocketIO
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy
import model

load_dotenv(find_dotenv())  # This is to load your env variables from .env

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=os.path.join(__location__, 'cs490-finalproject-026394783be7.json')

app = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS = CORS(app, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


#SOCKETIO = SocketIO(app,
#                    cors_allowed_origins="*",
#                    json=json,
#                    manage_session=False)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


@app.route('/saveImage', methods=['POST'])
def upload_image():
    print('image received')
    storage_client = storage.Client()
    bucket = storage_client.get_bucket('cs490-testbucket')
    img = request.files['myFile']
    img.save(secure_filename(img.filename))
    blob = bucket.blob(img.filename) 
    blob.upload_from_filename(img.filename)
    os.remove(img.filename)
    blob.make_public()

SOCKETIO.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

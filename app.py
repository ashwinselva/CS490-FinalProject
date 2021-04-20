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

CORS = CORS(app, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)
                    
db = SQLAlchemy(app)

# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

GBUCKET = 'cs490-testbucket'
pool_name = ''

User = model.define_user_class(db)
Pool = model.define_pool_class(db)
Image = model.define_image_class(db)
PoolItem = model.define_poolitem_class(db)

#SOCKETIO = SocketIO(app,
#                    cors_allowed_origins="*",
#                    json=json,
#                    manage_session=False)

def add_user(new_username, new_password):
    
    new_user = User(username=new_username, password=new_password)
    db.session.add(new_user)
    db.session.commit()
    return True
        

def add_pool(pool_name, username):
    try:
        new_pool = Pool(pool_name=pool_name, username=username)
        db.session.add(new_pool)
        db.session.commit()
        return True
    finally:
        return False
        

def add_image(image_name, image_url, pool_name):
    try:
        new_image = Image(image_name=image_name, image_url=image_url)
        db.session.add(new_image)
        db.session.commit()
        item_id = new_image.image_id
        new_item = PoolItem(pool_name=pool_name, image_id=item_id)
        db.session.add(new_item)
        db.session.commit()
        return item_id
    finally:
        return -1
        

def reassign_image(image_id, pool_name):
    try:
        new_item = PoolItem(pool_name=pool_name, image_id=image_id)
        db.session.add(new_item)
        db.session.commit()
        return True
    finally:
        return False

def get_images(pool_Name):
    try:
        pool_images = PoolItem.query.filter_by(pool_name=pool_Name).all()
        for i in pool_images:
            pool_images[i] = Image.query.get(pool_images[i].image_id).image_url
            
        return pool_images
    finally:
        return False

def get_pools(user_name):
    try:
        pools = Pool.query.filter_by(username = user_name).all()
        for i in pools:
            pools[i] = pools[i].pool_name
            
        return pools
    finally:
        return False

def get_all_pools():
    pools=[]

    pools = Pool.query.all()
    for i in pools:
        pools[i] = pools[i].pool_name
            
    return pools
    
        
def image_URL(image_url):
    return 'https://storage.googleapis.com/' + GBUCKET + '/' + image_url
    
def check_login(username, password):
    query = User.query.filter_by(username=username).first()
    if query is None:
        return False
    return password == query.password

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


@app.route('/saveImage', methods=['POST'])
def upload_image():
    print('image received')
    global GBUCKET
    global pool_name
    print(pool_name)
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(GBUCKET)
    img = request.files['myFile']
    image_name = img.filename
    add_image(image_name, image_name, pool_name)
    img.save(secure_filename(img.filename))
    blob = bucket.blob(img.filename) 
    blob.upload_from_filename(img.filename)
    os.remove(img.filename)
    blob.make_public()
    
    
@SOCKETIO.on('new_user_pool')
def on_new_user_pool(data):
    global pool_name
    pool_name = str(data[0])

    
@SOCKETIO.on('connect')
def on_connect():
    """Triggered when a user connects"""

    print('User connected')


@SOCKETIO.on('disconnect')
def on_disconnect():
    """Triggered when a user disconnects"""

    print('User disconnected')
    
@SOCKETIO.on('login')
def on_login(data):
    """Triggered when a user logs in"""
    
    print("Login")
    
    username = str(data['user'])
    password = str(data['password'])
    
    sid = request.sid
    
    result = check_login(password, username)
    
    if result:
        SOCKETIO.emit('loginSuccess', {}, broadcast=True, room=sid)
    else:
        SOCKETIO.emit('loginFailed', {}, broadcast=True, room=sid)
    
@SOCKETIO.on('newUser')
def on_new_user(data):
    """Triggered when a user adds an account"""
    
    print("New User")
    
    username = str(data['user'])
    password = str(data['password'])
    
    sid = request.sid
    
    result = add_user(username, password)
    
    print(result)
    
    if result:
        SOCKETIO.emit('loginSuccess', {}, broadcast=True, room=sid)
    else:
        SOCKETIO.emit('loginFailed', {}, broadcast=True, room=sid)
        
@SOCKETIO.on('viewpools')
def on_view_pools(data):
    sid = request.sid
    all_pools=get_all_pools()
    print('done')
    print(all_pools)
    SOCKETIO.emit('response', all_pools, broadcast=True, room=sid)


SOCKETIO.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', default='8081')),
    )
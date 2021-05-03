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
from random import sample
import model

load_dotenv(find_dotenv())  # This is to load your env variables from .env

#__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
#os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=os.path.join(__location__, 'cs490-finalproject-026394783be7.json')
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

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
username = ''

User = model.define_user_class(db)
Pool = model.define_pool_class(db)
Image = model.define_image_class(db)
PoolItem = model.define_poolitem_class(db)
ImageTag = model.define_imagetag_class(db)

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
    new_image = Image(image_name=image_name, image_url=image_url)
    db.session.add(new_image)
    db.session.commit()
    item_id = new_image.image_id
    new_item = PoolItem(pool_name=pool_name, image_id=item_id)
    db.session.add(new_item)
    db.session.commit()
    return item_id
        

def reassign_image(image_id, pool_name):
    try:
        new_item = PoolItem(pool_name=pool_name, image_id=image_id)
        db.session.add(new_item)
        db.session.commit()
        return True
    finally:
        return False
        
def add_tag(tag_name, image_id):
    new_tag = ImageTag(tag=tag_name, image_id=image_id)
    db.session.add(new_tag)
    db.session.commit()
    return tag_name
        
def get_images(pool_Name):
    temp = PoolItem.query.filter_by(pool_name=pool_Name).all()
    pool_images = []
    for i in temp:
        pool_images.append(image_URL(Image.query.get(i.image_id).image_url))
    return pool_images
    
def get_images_by_name(search_text):
    all_images = Image.query.all()
    image_search = []
    for image in all_images:
        if search_text.lower() in image.image_name.lower():
            image_search.append(image_URL(image.image_url))
    return image_search

def get_random_images(ammount):
    urls = []
    images = Image.query.all()
    for i in images:
            urls.append(image_URL(i.image_url))
        
    if len(images) > ammount:
        urls = sample(urls, ammount)
        
    print(urls)
    return urls

def get_pools(user_name):
    temp = Pool.query.filter_by(username = user_name).all()
    pools = []
    for i in temp:
        pools.append(i.pool_name)
    return pools

    
def get_all_pools():
    temp = Pool.query.all()
    pools = []
    for i in temp:
        pools.append(i.pool_name)
    return pools


def image_URL(image_url):
    global GBUCKET
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
    curr_pool_name = ''
    if 'poolName' in request.form.keys():
        curr_pool_name = request.form['poolName']
    curr_username = ''
    if 'username' in request.form.keys():
        curr_username = request.form['username']
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(GBUCKET)
    img = request.files['myFile']
    image_name = img.filename
    print(curr_pool_name)
    add_image(image_name, secure_filename(img.filename), curr_pool_name)
    img.save(secure_filename(img.filename))
    blob = bucket.blob(secure_filename(img.filename)) 
    blob.upload_from_filename(secure_filename(img.filename))
    os.remove(secure_filename(img.filename))
    blob.make_public()
    print(image_URL(secure_filename(img.filename)))
    return(image_URL(secure_filename(img.filename)))

    
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
    
    result = check_login(username, password)
    
    if result:
        SOCKETIO.emit('loginSuccess', {'username':username}, room=sid)
    else:
        SOCKETIO.emit('loginFailed', {}, room=sid)
    
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
        SOCKETIO.emit('loginSuccess', {'username':username}, room=sid)
    else:
        SOCKETIO.emit('loginFailed', {}, room=sid)
        
@SOCKETIO.on('viewpools')
def on_view_pools(data):
    sid = request.sid
    all_pools=get_all_pools()
    pools_and_images = {}
    for i in all_pools:
        pools_and_images[i] = get_images(i)
    #for i in pools_and_images:
    #    for j in range(len(pools_and_images[i])):
    #        pools_and_images[i][j] = image_URL(pools_and_images[i][j])
    print(pools_and_images)
    SOCKETIO.emit('response', pools_and_images, Broadcast = True, room=sid)

    
@SOCKETIO.on('fetchPools')
def on_fetch_pools(data):
    sid = request.sid
    response = get_pools(str(data['username']))
    SOCKETIO.emit('list pools', {'poolList' : response}, room=sid)
    print('fetched pools')
    
@SOCKETIO.on('fetchImages')
def on_fetch_images(data):
    sid = request.sid
    response = get_images(str(data['pool']))
    SOCKETIO.emit('list images', {'imageList' : response}, room=sid)
    print('fetched images')
    
@SOCKETIO.on('newPool')
def on_new_pool(data):
    add_pool(str(data['pool_name']), str(data['username']))
    
@SOCKETIO.on('search')
def on_search(data):
    searchText = data["searchText"]
    option = data["option"]
    sid = request.sid
    imageData = []
    if option == 'Username':
        pools_for_username = get_pools(searchText)
        for poolName in pools_for_username:
            imageData.append(get_images(poolName))
    elif option == 'Pool':
        imageData.append(get_images(searchText))
    elif option == 'Image Name':
        imageData.append(get_images_by_name(searchText))
    elif option == 'Tag':
        imageData.append(get_images(searchText))
    elif option == 'Random Images':
        imageData.append(get_random_images(int(searchText)))
        
    print(imageData)
    SOCKETIO.emit('search results', {'imageList' : imageData}, room=sid)



SOCKETIO.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', default='8081')),
    )

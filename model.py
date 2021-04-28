"""Set up the database used for the heroku file"""
#imagetags = db.Table('imagetags',
#db.Column('image_id',db.Integer, db.ForeignKey('Images.id'), primary_key=True),
#db.Column('tag',db.String(80), db.ForeignKey('Tags.tag'), primary_key=True)
#)
from app import db


class Image(db.Model):
    __tablename__ = 'Images'
    image_id = db.Column(db.Integer, primary_key=True)
    image_name = db.Column(db.String(80), unique=True, nullable=False)
    image_url = db.Column(db.String(80), unique=True, nullable=False)
    #    tags=db.relationship('Tags',secondary=imagetags, lazy='subquery', backref=db.backref('image', lazy=True))
    
    def __repr__(self):
        return '<Images %r>' % (self.image_name)
    
    def __init__(self, image_id, image_name, image_url):
        self.image_id = image_id
        self.image_name = image_name
        self.image_url = image_url
        


class User(db.Model):
    __tablename__ = 'Users'
    username=db.Column(db.String(80), primary_key=True)
    password=db.Column(db.String(80))
        
    def __repr__(self):
        return '<Users %r>' % (self.username)
    
    def __init__(self, username, password):
        self.username = username
        self.password = password
    
    
class Pool(db.Model):
    __tablename__ = 'Pools'
    pool_name=db.Column(db.String(80), primary_key=True)
    username=db.Column(db.String(80),  nullable=False)
        
    def __repr__(self):
        return '<Pools %r>' % (self.pool_name)
    
    def __init__(self, pool_name, username):
        self.pool_name = pool_name
        self.username = username


class PoolItem(db.Model):
    __tablename__ = 'PoolItems'
    pool_name = db.Column(db.String(80), primary_key=True)
    image_id = db.Column(db.Integer, primary_key=True, autoincrement=False)
        
    def __repr__(self):
        return '<PoolImage %r>' % (self.pool_name)
    
    def __init__(self, pool_name, image_id):
        self.pool_name = pool_name
        self.image_id = image_id
    
#class Tags(db.Model):
#    __tablename__ = 'Tags'
#    tag = db.Column(db.String(80), primary_key=True)
#    def __repr__(self):
#        return '<Tags %r>' % (self.tag)

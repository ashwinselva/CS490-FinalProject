"""Set up the database used for the heroku file"""
from app import DB


class Images(DB.Model):
    """Set up the design of the database used for the heroku file"""
    id = DB.Column(DB.Integer, primary_key=True)
    image_name = DB.Column(DB.String(80), unique=True, nullable=False)
    image_location = DB.Column(DB.String(80), unique=True, nullable=False)

    def __repr__(self):
        return '<Images %r>' % self.image_name
        
class Users(DB.Model):
    username=DB.Column(DB.Integer, primary_key=True)
    
    def __repr__(self):
        return '<Users %r>' % self.username
        
class Pools(DB.Model):
    pool_name=DB.Column(DB.String(80), primary_key=True)
    
    def __repr__(self):
        return '<Pools %r>' % self.pool_name
        
class UserPool(DB.Model):
    username=DB.Column(DB.Integer)
    pool_name=DB.Column(DB.String(80))
    
    def __repr__(self):
        return '<UserPool %r>' % self.username
        
class PoolImage(DB.Model):
    pool_name=DB.Column(DB.String(80))
    id = DB.Column(DB.Integer)
    
    def __repr__(self):
        return '<PoolImage %r>' % self.username
        
class ImageTags(DB.Model):
    id = DB.Column(DB.Integer)
    tag = DB.Column(DB.String(80), primary_key=True)
    def __repr__(self):
        return '<ImageTags %r>' % self.username
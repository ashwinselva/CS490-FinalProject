"""Set up the database used for the heroku file"""
from app import DB


class Images(DB.Model):
    """Set up the design of the database used for the heroku file"""
    id = DB.Column(DB.Integer, primary_key=True)
    image_name = DB.Column(DB.String(80), unique=True, nullable=False)
    image_location = DB.Column(DB.String(80), unique=True, nullable=False)
    tags=DB.relationship('Tags',secondary=tags, lazy='subquery', backref=DB.backref('image', lazy=True))

    def __repr__(self):
        return '<Images %r>' % (self.image_name)
        
class Users(DB.Model):
    username=DB.Column(DB.String(80), primary_key=True)
    password=DB.Column(DB.String(80))
    pools=DB.relationship('Pools',backref='user',lazy=True)
    
    def __repr__(self):
        return '<Users %r>' % (self.username)
        
class Pools(DB.Model):
    username=DB.Column(DB.String(80), DB.ForeignKey(Users.username), primary_key=True)
    pool_name=DB.Column(DB.String(80), primary_key=True)
    images=DB.relationship('Image',secondary=poolimage, lazy='subquery', backref=DB.backref('pool', lazy=True))
    
    def __repr__(self):
        return '<Pools %r>' % (self.pool_name)
        
class Tags(DB.Model):
    tag = DB.Column(DB.String(80), primary_key=True)
    def __repr__(self):
        return '<Tags %r>' % (self.tag)
        
tags = DB.Table('tags',
DB.Column('image_id',DB.Integer, DB.ForeignKey(Images.id),primary_key=True),
DB.Column('tag',DB.String(80), DB.ForeignKey(Tags.tag),primary_key=True)
)

poolimage = DB.Table('Pool_Image',
DB.Column('pool',DB.String(80), DB.ForeignKey(Pools.pool_name),primary_key=True),
DB.Column('image_id',DB.Integer, DB.ForeignKey(Images.id),primary_key=True)
)
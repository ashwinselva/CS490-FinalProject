"""Set up the database used for the heroku file"""
from app import db

        
#imagetags = db.Table('imagetags',
#db.Column('image_id',db.Integer, db.ForeignKey('Images.id'), primary_key=True),
#db.Column('tag',db.String(80), db.ForeignKey('Tags.tag'), primary_key=True)
#)

poolimage = db.Table('Pool_Image',
db.Column('pool_name',db.String(80), db.ForeignKey('Pools.pool_name'), primary_key=True),
db.Column('image_id',db.Integer, db.ForeignKey('Images.id'), primary_key=True)
)

class Images(db.Model):
    __tablename__ = 'Images'
    id = db.Column(db.Integer, primary_key=True)
    image_name = db.Column(db.String(80), unique=True, nullable=False)
    image_location = db.Column(db.String(80), unique=True, nullable=False)
#    tags=db.relationship('Tags',secondary=imagetags, lazy='subquery', backref=db.backref('image', lazy=True))

    def __repr__(self):
        return '<Images %r>' % (self.image_name)
        
class Users(db.Model):
    __tablename__ = 'Users'
    username=db.Column(db.String(80), primary_key=True)
    password=db.Column(db.String(80))
    pools=db.relationship('Pools', backref='user', lazy=True)
    
    def __repr__(self):
        return '<Users %r>' % (self.username)
        
class Pools(db.Model):
    __tablename__ = 'Pools'
    pool_name=db.Column(db.String(80), primary_key=True)
    username=db.Column(db.String(80), db.ForeignKey('Users.username'), nullable=False)
    images=db.relationship('Image',secondary=poolimage, lazy='subquery', backref=db.backref('pool', lazy=True))
    
    def __repr__(self):
        return '<Pools %r>' % (self.pool_name)
        
#class Tags(db.Model):
#    __tablename__ = 'Tags'
#    tag = db.Column(db.String(80), primary_key=True)
#    def __repr__(self):
#        return '<Tags %r>' % (self.tag)

"""Set up the database used for the heroku file"""
from app import DB


class Images(DB.Model):
    """Set up the design of the database used for the heroku file"""
    id = DB.Column(DB.Integer, primary_key=True)
    image_name = DB.Column(DB.String(80), unique=True, nullable=False)
    image_location = DB.Column(DB.String(80), unique=True, nullable=False)

    def __repr__(self):
        return '<Images %r>' % self.username
        
class Users(DB.Model):
    username=DB.Column(DB.Integer, primary)
    def __repr__(self):
        return '<Images %r>' % self.username
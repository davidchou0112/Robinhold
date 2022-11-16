from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

watched_stocks = db.Table(
    "watched_stocks",
    db.Model.metadata,
    db.Column("watchlist_id", db.Integer, db.ForeignKey('watchlists.id'), primary_key=True),
    db.Column("stock_id", db.Integer, db.ForeignKey('stocks.id'), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    buying_power = db.Column(db.Float, nullable=False, default=0)

    watchlists = db.relationship("Watchlist", back_populates="user")
    stocks = db.relationship("Transaction", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'buying_power': self.buying_power,
            'watchlists': self.list_to_dict()
        }

    def list_to_dict(self):
        ls_dict = {}
        for ls in self.watchlists:
            ls_dict[ls.to_dict()['id']] = ls.to_dict()
        return ls_dict



class Stock(db.Model, UserMixin):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    symbol = db.Column(db.String(40), nullable=False, unique=True)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    ceo = db.Column(db.String(255), nullable=False)
    employees = db.Column(db.Integer, nullable=False)
    headquarter = db.Column(db.String(255), nullable=False)
    founded = db.Column(db.Integer, nullable=False)

    stock_watched = db.relationship('Watchlist', secondary= watched_stocks, back_populates="watchlist_watched")
    users = db.relationship("Transaction", back_populates="stock")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            'price': self.price,
            'description': self.description,
            'ceo': self.ceo,
            'employees': self.employees,
            'headquarter': self.headquarter,
            'founded': self.founded,
        }

    def to_dict_for_watchlist(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            'price': self.price,
        }

class Watchlist(db.Model, UserMixin):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(40), nullable=False)

    user = db.relationship("User", back_populates="watchlists")
    watchlist_watched = db.relationship('Stock', secondary= watched_stocks, back_populates="stock_watched")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'watched_stocks':self.list_to_dict()
        }

    def list_to_dict(self):
        ls_dict = {}
        for ls in self.watchlist_watched:
            ls_dict[ls.to_dict_for_watchlist()['id']] = ls.to_dict_for_watchlist()
        return ls_dict


class Transaction(db.Model, UserMixin):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    stock_id = db.Column(db.Integer, db.ForeignKey("stocks.id"))
    quantity = db.Column(db.Integer, nullable=False)
    is_purchased = db.Column(db.Boolean, nullable=False)
    # purchased = db.Column(db.Boolean, default=True)
    # sold = db.Column(db.Boolean, default=False)

    price = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="stocks")
    stock = db.relationship("Stock", back_populates="users")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stock_id': self.stock_id,
            'quantity': self.quantity,
            'is_purchased': self.is_purchased,
            'price': self.price
        }

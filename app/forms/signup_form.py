from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def email_valid(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_valid(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    if len(username) < 4 or len(username) > 12:
        raise ValidationError('Username should be betweeen 4 and 12 charaters.')

def firstname_valid(form, field):
    # Checking if username is already in use
    firstname = field.data

    if len(firstname) < 1 or len(firstname) > 20:
        raise ValidationError('First name should be betweeen 1 and 20 charaters.')

def lastname_valid(form, field):
    # Checking if username is already in use
    lastname = field.data

    if len(lastname) < 1 or len(lastname) > 20:
        raise ValidationError('Last name should be betweeen 1 and 20 charaters.')


def password_valid(form, field):
    # Checking if username is already in use
    password = field.data

    if len(password) < 6 or len(password) > 20:
        raise ValidationError('Password should be betweeen 6 and 20 charaters.')



class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_valid])
    firstname = StringField('firstname', validators=[DataRequired(), firstname_valid])
    lastname = StringField('lastname', validators=[DataRequired(), lastname_valid])
    email = StringField('email', validators=[DataRequired(),Email(message='Invaid email address'), email_valid])
    password = StringField('password', validators=[DataRequired(), password_valid])

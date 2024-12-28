from flask import flash
from flask_wtf import FlaskForm
from flask_wtf.file import FileField,FileRequired,FileAllowed
from wtforms import (StringField,EmailField,DateField,
    IntegerField,DecimalField,PasswordField,SubmitField,SelectField,RadioField)
from wtforms.validators import (DataRequired,
    Email,ValidationError,Length)
from app import mysql

#Authentication forms
class SignupForm(FlaskForm):
    username=StringField('Username',validators=[DataRequired(),Length(min=8,max=20)])
    email=EmailField('Email',validators=[DataRequired()])
    password=PasswordField('Password',validators=[DataRequired(),Length(min=8,max=20)])
    submit=SubmitField('Register')

    def validate_username(self,username):
        cur=mysql.connection.cursor()
        cur.execute("SELECT * FROM Users WHERE username=%s",(username.data,))
        user=cur.fetchone()
        cur.close()
        if user:
            flash("Username Already Taken")
            raise ValidationError("Username Already Taken!")
    
    def validate_email(self,email):
        cur=mysql.connection.cursor()
        cur.execute("SELECT * FROM Users WHERE email=%s",(email.data,))
        user=cur.fetchone()
        cur.close()
        if user:
            flash("Email Already Taken")
            raise ValidationError("Email Already Taken!")

class SigninForm(FlaskForm):
    email=StringField('Email',validators=[DataRequired()])
    password=PasswordField('Password',validators=[DataRequired()])
    submit=SubmitField('Login')

#form for Staff and User change Password
class ChangeKeyForm(FlaskForm):
    email=EmailField('Email',validators=[DataRequired()])
    password=PasswordField('Current Password',validators=[DataRequired(),Length(min=8,max=20)])
    npassword=PasswordField('New Password',validators=[DataRequired(),Length(min=8,max=20)])
    vpassword=PasswordField('Verify Password',validators=[DataRequired(),Length(min=8,max=20)])
    submit=SubmitField('Change Password')
    
class MobileForm(FlaskForm):
    phone_no=StringField('Phone Number',validators=[DataRequired()])
    amount=DecimalField('Amount',validators=[DataRequired()])
    submit=SubmitField('Pay with Mpesa') 

#Admin Privelleges
#Consumer form to add Products to database
class PurchaseForm(FlaskForm):
    pmake=StringField('Make',validators=[DataRequired()])
    pmodel=StringField('Model',validators=[DataRequired()])
    price=StringField('Price',validators=[DataRequired()])
    pimage=StringField('Photo',validators=[DataRequired()])
    submit=SubmitField('Purchase')
    
class RentalForm(FlaskForm):
    pmake=StringField('Make',validators=[DataRequired()])
    pmodel=StringField('Model',validators=[DataRequired()])
    price=StringField('Price',validators=[DataRequired()])
    pimage=StringField('Photo',validators=[DataRequired()])
    cstart=DateField('Start Date',validators=[DataRequired()])
    cstop=DateField('Start Date',validators=[DataRequired()])
    gtotal=StringField('Total',validators=[DataRequired()])
    submit=SubmitField('Hire')
    
class AddUserForm(FlaskForm):
    username=StringField('Username',validators=[DataRequired()])
    email=EmailField('Email',validators=[DataRequired()])
    password=PasswordField('Password',validators=[DataRequired(),Length(min=8,max=20)])
    submit=SubmitField('Add User')
    
    def validate_username(self,username):
        cur=mysql.connection.cursor()
        cur.execute("SELECT * FROM Users WHERE username=%s",(username.data,))
        user=cur.fetchone()
        cur.close()
        if user:
            flash("Username Already Taken")
            raise ValidationError("Username Already Taken!")
    
    def validate_email(self,email):
        cur=mysql.connection.cursor()
        cur.execute("SELECT * FROM Users WHERE email=%s",(email.data,))
        user=cur.fetchone()
        cur.close()
        if user:
            flash("Email Already Taken")
            raise ValidationError("Email Already Taken!")
    
class RolesForm(FlaskForm):
    email=StringField('Email',validators=[DataRequired()])
    options=SelectField('Choose Role',choices=[("",""),("User","User"),("Staff","Staff")])
    submit=SubmitField('Grant Permit')
  
class SuspendUserForm(FlaskForm):
    username=StringField('Username',validators=[DataRequired()])
    email=EmailField('Email',validators=[DataRequired()])
    options=SelectField('Choose Mode',choices=[("Deactivate","Deactivate"),("Activate","Activate")])
    submit=SubmitField('Add User')

class SuperChangeKeyForm(FlaskForm):
    email=EmailField('Email',validators=[DataRequired()])
    password=PasswordField('Current Password',validators=[DataRequired(),Length(min=8,max=20)])
    submit=SubmitField('Change Password')

    
    
#Staff forms for  Restock,Edit,Add  & Delete
class Maintenance(FlaskForm):
    serno=IntegerField('S.No',validators=[DataRequired()])
    pmake=StringField('Make',validators=[DataRequired()])
    pmodel=StringField('Model',validators=[DataRequired()])
    price=StringField('Price',validators=[DataRequired()])
    photo=FileField('Photo',validators=[FileRequired(),FileAllowed(['jpg','jpeg','png','gif'],'Images only!')])
    pdesc=StringField('Description',validators=[DataRequired()]) 
    edit=SubmitField('Edit')

class Destroyer(FlaskForm):
    serno=IntegerField('S.No',validators=[DataRequired()])
    photo=StringField('Photo',validators=[DataRequired()])
    delete=SubmitField('Delete')

class Builder(FlaskForm):
    pmake=StringField('Make',validators=[DataRequired()])
    pmodel=StringField('Model',validators=[DataRequired()])
    price=StringField('Price',validators=[DataRequired()])
    upload_type=SelectField("Upload Type",choices=[
        ("Single","single Images"),
        ("Multiple","Multiple Images")],
        validators=[DataRequired()])
    photo=FileField('Photo',validators=[FileRequired(),
        FileAllowed(['jpg','jpeg','png','gif'],'Images only!')])
    pdesc=StringField('Description',validators=[DataRequired()])

    add=SubmitField("Add Mechandise")
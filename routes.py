from flask import (Flask,render_template,
	redirect,url_for,flash,session)
from app import app,mysql
from forms import*
import bcrypt
import os
import sys

# solve for error: no module named forms
basedir=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
sys.path.append(basedir)
#from frontend.forms import SigninForm,SignupForm,AddForm,EditForm,RolesForm
#app.secret_key="my_key"

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/dash-admin")
def admino():
	if 'username' not in session:
		return redirect(url_for("login"))
	return render_template("super.html")

@app.route("/dash-agents")
def agents():
	if 'username' not in session:
		return redirect(url_for("login"))
	return render_template("agents.html")

@app.route("/dash-users")
def customers():
	if 'username' not in session:
		return redirect(url_for("login"))
	return render_template("consumer.html")

@app.route("/signup",methods=['GET','POST'])
def register():
	form=SignupForm()
	if form.validate_on_submit():
		username=form.username.data
		email=form.email.data
		pwd=form.password.data

		cur=db.connection.cursor()
		cur.execute("SELECT * FROM Users WHERE email=%s",(email,))
		row=cur.fetchone()
		cur.close()
		if row:
			flash("Email Already Exists!!",'danger')
			return render_template('register.html')
		else:
			hashed_pwd=bcrypt.hashpw(pwd.encode('utf-8'),bcrypt.gensalt())
			cur=db.connection.cursor()
			cur.execute("INSERT INTO Users(username,email,password,role_id) VALUES(%s,%s,%s)",(username,email,hashed_pwd,3))
			db.connection.commit()
			cur.close()
			flash("Registration  was successful!!",'success')
			return redirect(url_for("login"))
	return render_template("register.html",form=form)


@app.route("/signin",methods=['GET','POST'])
def login():
	form=SigninForm()
	if form.validate_on_submit():
		email=form.email.data
		password=form.password.data

		cursor=mysql.connection.cursor()
		cursor.execute("SELECT * FROM Users  WHERE email=%s",(email,))
		user=cursor.fetchone()
		if user and bcrypt.checkpw(password.encode("utf-8"),user[3].encode("utf-8")):
			session['username']=user[1]
			if user[4]==1:
				session['role']="Admin"
				flash("Login successfully!")
				return redirect(url_for("admino"))
			elif user[4]==2:
				session['role']="Staff"
				flash("Login successfully!")
				return redirect(url_for("agents"))
			else:
				session['role']="User"
				flash("Login successfully!")
				return redirect(url_for("customers"))
		else:
			flash("Invalid credentials!")
	return render_template("login.html",form=form)



@app.route("/permission",methods=['GET','POST'])
def grant_perm():
	if 'Admin' not in session['role']:
		return redirect(url_for("login"))
	form=RolesForm()
	if form.validate_on_submit():
		username=form.username.data
		role=form.role.data
		db.grant_privileges(username,role)
		flash(f"Permission for {role} granted successfully!!")
		return redirect(url_for("admino"))
	else:
		flash(f"Permission for {role} granted provoked!!")
	return render_template("permit.html",form=form)

@app.route("/logout")
def terminate():
	session.pop("username",None)
	return redirect(url_for("index"))



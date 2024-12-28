
from flask import (Flask,render_template,
	redirect,url_for,flash,session,request,send_from_directory)
from config import Config
from models import Database
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os
import bcrypt
import requests
#import numpy as np
#import matplotlib.pyplot as plt
#import warnings
from random import randint
from werkzeug.utils import secure_filename

load_dotenv()

app=Flask(__name__)
app.config.from_object(Config)
app.secret_key="my_key"#for session management
app.config['UPLOAD_FOLDER']="uploads/"

if not os.path.isdir(app.config['UPLOAD_FOLDER']):
	os.mkdir(app.config['UPLOAD_FOLDER'])

mysql=MySQL(app)
db=Database()

#Replace with actual credentials
CONSUMER_KEY="kl0kuHq4jTF7g7wPpeibn4dLTaLZly8mgyGZWE0pdEYTAtx5x"
CONSUMER_SECRET="FQ0QPjAcVX9jZ0GTYh084CBXnMfpTvNaAlXKlvzigGZnbVl8PKe4yhogpKb7GRG5t"

LIPA_NA_MPESA_SHORTCODE="N/A"
LIPA_NA_MPESA_PASSKEY="mypasskey"
LIPA_NA_MPESA_URL="https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
LIPA_NA_MPESA_USERNAME="MYSAM"
LIPA_NA_MPESA_PASSWORD="810589"

TOKEN_URL="https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"


@app.route("/connection")
def connect_err():
	return render_template("connect.html")


@app.before_request
def gateway_error():
	try:
		if not mysql.connection:
			return redirect(url_for("connect_err"))
	except Exception as e:
		print("Caught:",e)

@app.before_request
def initialize():
	with app.app_context():
		db.create_db("eagle")
		db.create_tables()
	
from commands import create_superuser,list_routes
from forms import*

app.cli.add_command(create_superuser)
app.cli.add_command(list_routes)
#from routes import*

#File extensions needed
allowed_exts=set({'png','jpeg','jpg','gif'})

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.',1)[1].lower() in allowed_exts

@app.route("/uploads/<filename>")
def uploaded_file(filename):
	return send_from_directory(app.config['UPLOAD_FOLDER'],filename)

#landing page
@app.route("/")
def index():
	return render_template("index.html")

@app.route("/admin-page",methods=["GET","POST"])
def admino():
	if 'username' not in session:
		return redirect(url_for("signin"))
	addform=AddUserForm()
	susform=SuspendUserForm()
	changeform=SuperChangeKeyForm()
	rolesform=RolesForm()
	
	cur=mysql.connection.cursor()
	#join tables (Users and Roles)
	cur.execute("SELECT * FROM Users WHERE is_superuser=%s",(False,))
	users=cur.fetchall()

	cur.execute("SELECT * FROM Cars")
	carmodels=cur.fetchall()
	cur.close()
	if addform.validate_on_submit() and 'submit' in request.addform:
		username=addform.username.data
		email=addform.email.data
		pwd=addform.password.data

		hashedpw=bcrypt.hashpw(pwd.encode("url_for"),bcrypt.gensalt())

		cur=mysql.connection.cursor()
		cur.execute("INSERT INTO Users(username,email,password,is_staff) VALUES(%s,%s,%s,%s)",(username,email,hashedpw,True))
		cur.close()
		flash("Staff created successfully!!")
		return redirect(url_for("admino"))

	elif susform.validate_on_submit() and 'submit' in request.susform:
		username=susform.username.data
		email=susform.email.data
		options=susform.options.data

		cur=mysql.connection.cursor()
		if options=="Deactivate":
			cur.execute("UPDATE Users SET is_active=%s WHERE username=%s,email=%s",(False,username,email))
		else:
			cur.execute("UPDATE Users SET is_active=%s WHERE username=%s,email=%s",(True,username,email))
		mysql.connection.commit()
		cur.close()
		flash("User Suspension was a success!!")
		return redirect(url_for("admino"))

	elif changeform.validate_on_submit() and 'submit' in request.changeform:
		email=chageform.email.data
		password=chageform.password.data

		hashedpw=bcrypt.hashpw(password.encode("utf-8"),bcrypt.gensalt())
		cur=mysql.connection.cursor()
		cur.execute("UPDATE Users SET password=%s WHERE email=%s",(hashedpw,email))
		mysql.connection.commit()
		cur.close()
		flash("Password changed successfully!!")
		return redirect(url_for("admino"))

	elif rolesform.validate_on_submit():
		email=rolesform.email.data
		option=rolesform.options.data

		cur=mysql.connection.cursor()
		if option=="Staff":
			cur.execute("UPDATE Users SET is_staff=%s WHERE email=%s",(True,email))
			flash("Permission granted successfully!!")
		elif  option=="User":
			cur.execute("UPDATE Users SET is_staff=%s WHERE email=%s",(False,email))
			flash("User demoted successfully!!")
		mysql.connection.commit()
		cur.close()
		
		return redirect(url_for("admino"))
	return render_template("super.html",addform=addform,susform=susform,changeform=changeform,
		rolesform=rolesform,current_user=session['username'],users=users,carmodels=carmodels)

@app.route("/agents-page",methods=["GET","POST"])
def agents():
	if 'username' not in session:
		return redirect(url_for("signin"))
	cur=mysql.connection.cursor()
	cur.execute("SELECT * FROM Cars")
	all_models=cur.fetchall()
	cur.close()

	cur=mysql.connection.cursor()
	cur.execute("SELECT COUNT(*) FROM Orders")
	orders=cur.fetchone()
	cur.close()

	cur=mysql.connection.cursor()
	cur.execute("SELECT COUNT(*) FROM Rentals")
	hired=cur.fetchone()
	cur.close()

	changeform=ChangeKeyForm()
	addform=Builder()
	delform=Destroyer()
	form=Maintenance()#AddMechandise()
	if changeform.validate_on_submit():
		email=changeform.email.data
		pwd=changeform.password.data
		new_pwd=changeform.npassword.data
		conf_pwd=chageform.vpassword.data

		cur=mysql.connection.cursor()
		cur.execute("SELECT * FROM Users WHERE email=%s",(email,))
		user=cur.fetchone()
		cur.close()
		if bcrypt.checkpw(pwd.encode('utf-8'),user[3].encode('utf-8')) and new_pwd==conf_pwd:
			cur=mysql.connection.cursor()
			cur.execute("UPDATE Users SET password=%s WHERE email=%s",(bcrypt.hashpw(new_pwd.encode('utf-8'),bcrypt.gensalt()),session['email']))
			cur.close()
			flash("Update was successful")
		else:
			flash("Either New password not matching verify password or Invalid credentials!!")	
		
	if addform.validate_on_submit():
		pmake=addform.pmake.data
		pmodel=addform.pmodel.data
		price=addform.price.data
		pic=addform.photo.data
		desp=addform.pdesc.data

		selection=addform.upload_type.data

		if selection=="Multiple":
			files=request.files.getlist("photo")
		else:
			files=[request.files['photo']]

		image_paths=[]
		for file in files:
			if file.filename=="":
				continue
			filename=secure_filename(file.filename)
			fpath=os.path.join(app.config['UPLOAD_FOLDER'],filename)
			if allowed_file(file):
				file.save(fpath)
				image_paths.append(filename)
			flash("Only Images are accepted!")
		cur=mysql.connection.cursor()

		image_paths_str=",".join(image_paths)

		cur.execute("INSERT INTO Cars(make,model,price,photo,description) VALUES(%s,%s,%s,%s,%s)",(pmake,pmodel,price,image_paths_str,desp))
		mysql.connection.commit()
		cur.close()
		flash("Record added successfully!")
			
	if delform.validate_on_submit():
		cid=delform.serno.data
		pic=delform.photo.data
		pic_fname=pic.filename
		fpath=os.path.join(app.config['UPLOAD_FOLDER'],pic_fname)

		cur=mysql.connection.cursor()
		cur.execute("DELETE FROM Cars WHERE id=%s",(cid,))
		if os.path.isfile(fpath):
			os.remove(fpath)
		mysql.connection.commit()
		cur.close()
		flash("Item deleted successfully!")
	
	if form.validate_on_submit():
		cid=form.serno.data
		pmake=form.pmake.data
		pmodel=form.pmodel.data
		price=form.price.data
		pic=form.photo.data
		desp=form.pdesc.data

		pic_fname=pic.filename
		fpath=os.path.join(app.config['UPLOAD_FOLDER'],pic_fname)
		pic.save(fpath)

		cur=mysql.connection.cursor()

		cur.execute("UPDATE Cars SET make=%s,model=%s,price=%s,photo=%s,description=%s WHERE id=%s",(pmake,pmodel,price,pic_fname,desp,cid))
		flash("Item updated successfully!")
		
		return redirect(url_for("agents"))

	return render_template("agents.html",form=form,addform=addform,
		delform=delform,all_models=all_models,orders=orders,hired=hired,changeform=changeform)


def generate_token():
	apiURL=TOKEN_URL
	response=requests.get(apiURL,auth=(CONSUMER_KEY,CONSUMER_SECRET))
	json_response=response.json()
	return json_response['access_token']

@app.route("/pay",methods=["GET","POST"])
def pay():
	pass
@app.route("/limited-page",methods=["GET","POST"])
def customers():
	purform=PurchaseForm()
	renform=RentalForm()
	payform=MobileForm()
	changer=ChangeKeyForm()

	cur=mysql.connection.cursor()
	cur.execute("SELECT COUNT(*) FROM Orders RIGHT JOIN Users ON Orders.id=Users.id WHERE custName=%s",(session['username'],))
	orders=cur.fetchone()
	cur.close()

	cur=mysql.connection.cursor()
	cur.execute("SELECT COUNT(*) FROM Rentals RIGHT JOIN Cars ON Rentals.id=Cars.id WHERE user_id=%s",(session['username'],))
	hired=cur.fetchone()
	cur.close()

	if 'username' not in session:
		return redirect(url_for("signin"))

	if changer.validate_on_submit():
		email=changer.email.data
		pwd=changer.password.data
		new_pwd=changer.npassword.data
		conf_pwd=changer.vpassword.data

		cur=mysql.connection.cursor()
		cur.execute('SELECT * FROM Users WHERE username=%s',(session['username'],))
		user=cur.fetchone()
		cur.close()
		if new_pwd==conf_pwd and bcrypt.checkpw(pwd.encode('utf-8'),user[3].encode('utf-8')):
			cur=mysql.connection.cursor()
			cur.execute("UPDATE Users SET password=%s WHERE email=%s",(bcrypt.hashpw(new_pwd.encode('utf8'),bcrypt.gensalt()),email))
			cur.close()
			flash("User updated successfully!!")
		else:
			flash("Either New Password mismatch Confirm Password or Invalid credentials!!")
	if purform.validate_on_submit():
		pmake=purform.pmake.data
		pmodel=purform.pmodel.data
		price=purform.price.data
		pic=purform.pimage.data
		
		cur=mysql.connection.cursor()
		cur.execute("INSERT INTO Orders(custName,make,model,price,photo) VALUES(%s,%s,%s",(session['username'],pmake,pmodel,price,pic))
		cur.close()
		flash("Car Purchased successfully")
	if renform.validate_on_submit():
		pmake=renform.pmake.data
		pmodel=renform.pmodel.data
		price=renform.price.data
		pic=renform.pimage.data
		start=renform.cstart.data
		stop=renform.cstop.data
		total=renform.gtotal.data
		
		cur=mysql.connection.cursor()
		cur.execute("UPDATE Orders SET make=%s,model=%s,price=%s,photo=%s WHERE custName=%s",(pmake,pmodel,price,pic,session['username']))
		cur.close()
		flash("Car Purchased successfully")

	if payform.validate_on_submit():
		phone=payform.phone_no.data
		amt=payform.amount.data

		token=generate_token()
		headers={
			"Authorization":f"Bearer {token}",
			"Content-Type":"Application/json"
		}
		#Payment details
		payload={
		"BusinessShortCode":LIPA_NA_MPESA_SHORTCODE,
		"Password":LIPA_NA_MPESA_PASSWORD,
		"TimeStamp":get_timestamp(),
		"TransactionType":"CustomerPayBillOnline",
		"Amount":amnt,
		"PartyA":phone,
		"PartyB":LIPA_NA_MPESA_SHORTCODE,
		"PhoneNumber":phone,
		"CallBackURL":"https://my CallBackURL",
		"AccountReference":f"Reference{randint(17000,99999)}",
		"TransactionDesc":"Payment for Vehicle Hire"
		}
		response=requests.post(LIPA_NA_MPESA_URL,json=payload,headers=headers)
		flash("Congrats!! Transaction was successful")
		return jsonify(response.json()), response.status_code
	cur=mysql.connection.cursor()
	cur.execute("SELECT * FROM Cars")
	buckets=cur.fetchall()
	cur.close()
	return render_template("consumer.html",purform=purform,renform=renform,changer=changer,
		buckets=buckets,orders=orders,hired=hired)

@app.route("/register",methods=['POST','GET'])
def signup():
	form=SignupForm()
	if form.validate_on_submit():
		username=form.username.data
		email=form.email.data
		pwd=form.password.data

		hashedpw=bcrypt.hashpw(pwd.encode('utf-8'),bcrypt.gensalt())

		cur=mysql.connection.cursor()
		#Insert Role if it doesn't exist
		#cur.execute("INSERT IGNORE INTO Roles(role_name) VALUES('User')")
		#Insert user
		query="INSERT INTO Users(username,email,password) VALUES(%s,%s,%s)"
		cur.execute(query,(username,email,hashedpw))#role_id for User is 3
		#get user_id and role_id
		cur.execute("SELECT id FROM Users WHERE username=%s",(username,))
		uid=cur.fetchone()[0]
		#assign role to user
		cur.execute("INSERT INTO UserRoles(user_id) VALUES(%s)",(uid,))
		mysql.connection.commit()
		cur.close()
		print(f"LID:\nUID:{uid}")
		flash("Registration  was successful!!",'success')
		return redirect(url_for("signin"))
	return render_template("register.html",form=form)


@app.route("/login",methods=['POST','GET'])
def signin():
	form=SigninForm()
	if form.validate_on_submit():
		email=form.email.data
		password=form.password.data

		cursor=mysql.connection.cursor()
		cursor.execute("SELECT * FROM Users WHERE email=%s",(email,))
		user=cursor.fetchone()
		cursor.close()
		if user and bcrypt.checkpw(password.encode("utf-8"),user[3].encode("utf-8")):
			Admin=user[4]
			Staff=user[5]
			try:
				if Admin==True and Staff==True:
					session['username']=user[1]
					session['email']=user[2]
					return redirect(url_for("admino"))
				elif Staff==True and Admin==False:
					session['username']=user[1]
					session['email']=user[2]
					return redirect(url_for("agents"))
				else:
					session['username']=user[1]
					session['email']=user[2]
					return redirect(url_for("customers"))
			except Exception as e:
				flash("Caught:",e)
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




if __name__=="__name__":
	app.run(debug=True,port=8500)
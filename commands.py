import bcrypt
import click
from flask.cli import with_appcontext
from models import mysql
from werkzeug.routing import Map,Rule
from app import app

@click.command(name="listroutes")
def list_routes():
	for rule in app.url_map.iter_rules():
		print(rule)


@click.command(name="createsuperuser")
@click.argument('uname')
@click.argument('email')
@click.argument('password')
@with_appcontext
def create_superuser(uname,email,password):
	hashedpw=bcrypt.hashpw(password.encode("utf-8"),bcrypt.gensalt())
	cursor=mysql.connection.cursor()
	cursor.execute("SELECT * FROM Users WHERE username=%s",(uname,))
	user=cursor.fetchone()
	if user:
		click.echo(f"Username '{uname}' already taken")
		return
	#Insert superuser
	query="INSERT INTO Users(username,email,password,is_superuser,is_staff) VALUES(%s,%s,%s,%s,%s)"
	cursor.execute(query,(uname,email,hashedpw,True,True))#role_id for Admin is 1
	#get user_id and role_id
	cursor.execute("SELECT id FROM Users WHERE username=%s",(uname,))
	uid=cursor.fetchone()[0]
	#assign role to user
	cursor.execute("INSERT INTO UserRoles(user_id) VALUES(%s)",(uid,))
	mysql.connection.commit()
	cursor.close()

	click.echo(f"Superuser '{uname}' created successfully.")
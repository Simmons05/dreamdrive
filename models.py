#import os
import bcrypt
import click
from flask.cli import with_appcontext
from flask_mysqldb import MySQL
from flask import Flask
from config import Config

app=Flask(__name__)
app.config.from_object(Config)
mysql=MySQL(app)

class Database:
	def __init__(self):#,is_superuser=False,is_staff=False,is_active=True):
		#self._dbname=dbname
		#self.is_superuser=is_superuser
		#self.is_staff=is_staff
		#self.is_active=is_active
		self.mysql=MySQL(app)#.__init__(app)
	
	@property
	def dbname(self):
		return self.dbname
	@dbname.setter
	def dbname(self,value):
		if not value:
			raise ValueError("Database name can't be empty")
		self.dbname=value
		return self.dbname
	
	def create_db(self,dbname):
		ctx=app.app_context()
		#ctx.push()
		#with ctx:
		cursor=self.mysql.connection.cursor()
		cursor.execute(f"CREATE DATABASE IF NOT EXISTS {dbname}")#.format(dbname))
		cursor.execute("USE {}".format(dbname))
		self.mysql.connection.commit()
			

	def create_tables(self):
		cursor=self.mysql.connection.cursor()
		q2="""
			CREATE TABLE IF NOT EXISTS Users(
				id INT AUTO_INCREMENT PRIMARY KEY,
				username VARCHAR(55) NOT NULL,
				email VARCHAR(55) NOT NULL,
				password VARCHAR(255) NOT NULL,
				is_superuser BOOLEAN DEFAULT FALSE,
				is_staff BOOLEAN DEFAULT FALSE,
				is_active BOOLEAN DEFAULT TRUE,
				is_created BOOLEAN DEFAULT FALSE,
				date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
			)
		"""
		q3="""
			CREATE TABLE IF NOT EXISTS UserRoles(
				user_id INT,
				PRIMARY KEY(user_id),
				FOREIGN KEY(user_id) REFERENCES Users(id)
			)
		"""
		q4="""
			CREATE TABLE IF NOT EXISTS Cars(
				id INT AUTO_INCREMENT PRIMARY KEY,
				make VARCHAR(55) NOT NULL,
				model VARCHAR(55) NOT NULL,
				price DECIMAL(10,2) NOT NULL,
				photo VARCHAR(100) NOT NULL,
				is_for_sale BOOLEAN DEFAULT TRUE,
				description TEXT
			)
		"""
		q5="""
			CREATE TABLE IF NOT EXISTS Rentals(
				id INT AUTO_INCREMENT PRIMARY KEY,
				car_id INT,
				user_id INT,
				start_date DATE,
				end_date DATE,
				total_price DECIMAL(10,2) NOT NULL,
				FOREIGN KEY(car_id) REFERENCES Cars(id)
			)
		"""
		q6="""
			CREATE TABLE IF NOT EXISTS Reviews(
				id INT AUTO_INCREMENT PRIMARY KEY,
				car_id INT,
				user_id INT,
				rating INT,
				comment TEXT,
				FOREIGN KEY(car_id) REFERENCES Cars(id)
			)
		"""
		q7="""
			CREATE TABLE IF NOT EXISTS Orders(
				id INT PRIMARY KEY,
				order_id INT,
				custName VARCHAR(100) NOT NULL,
				make VARCHAR(55) NOT NULL,
				model VARCHAR(55) NOT NULL,
				price DECIMAL(10,2) NOT NULL,
				photo VARCHAR(100) NOT NULL,
				FOREIGN KEY(id) REFERENCES Users(id),
				FOREIGN KEY(order_id) REFERENCES Cars(id)
			)
		"""
		cursor.execute(q2)
		cursor.execute(q3)
		cursor.execute(q4)
		cursor.execute(q5)
		cursor.execute(q6)
		cursor.execute(q7)
		#cursor.execute("INSERT INTO Users(username,email,password,role_id) VALUES('Bradworth','simmonsbratis789@gmail.com',%s,1)",(bcrypt.hashpw('simmons789'.encode('utf-8'),bcrypt.gensalt()),))
		self.mysql.connection.commit()
		cursor.close()

	def grant_privileges(self,username):
		cursor=self.mysql.connection.cursor()
		cursor.execute("UPDATE Users SET is_staff=%s WHERE username=%s",(True,username))
		self.mysql.connection.commit()
		cursor.close()

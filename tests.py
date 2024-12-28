import unittest

class Test:
	def __init__(self):
		self.Test_signin('email@email.com','password')
		self.Test_signup("","prussy@gmail.com","password")

	def Test_signin(self,email,password):
		print("-----------Signin---------------------")
		if not email.endswith("@gmail.com"):
			#assert("Not a valid email address")
			print("Not a valid email address")
		else:
			#assert("valid email address")
			print("valid email address")

	def Test_signup(self,username,email,password):
		print("-------------Signup-------------------")
		if username=="" or email=="" or password=="":
			#assert("Required fields are mandatory")
			print("Required fields are mandatory")
		if not email.endswith("@gmail.com"):
			#assert("Not a valid email address")
			print("Not a valid email address")
		else:
			#assert("Test passed")
			print("Test passed")

if __name__=="__main__":
	Test()
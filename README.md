# CSCI-3100-group-38

To install dependencies:
- cd nodejs
- npm install

To start server:
- cd nodejs 
- npm start

Available API (still need authentications and ammendments):
-	Category: localhost:3000/category
	POST category -> Create new category. Data: {name: name}
	DELETE category/:id -> Delete category of id. Returns deleted category
	PUT category/:id -> Update category of id. Data: {name: name}
	GET category?query -> Get category according to query:
		- no query: all category
		- id: return category of id.
		- name: return category of exactly name.
		- name=name&exact=false: return category of similar to name.
		- sortName="asc" or sortName="desc": define the sorting according to name
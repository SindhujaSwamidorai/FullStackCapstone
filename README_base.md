This project contains two sections, backend and frontend implementation, to create a full-stack application that allows bookstore employees to internally manage the books carried by a small bookstore.

<<<<<<< HEAD
Setting up the project
The book store project clone from:
https://github.com/sindhuja-swamidorai/FullStackCapstone

Open a local MySQL server connection and create a database named test_db.
CREATE DATABASE test_db;

=======
Open a local MySQL server connection and create a database named test_db.
CREATE DATABASE test_db;

Setting up the project
The book store project clone from:
https://github.com/sindhuja-swamidorai/FullStackCapstone
>>>>>>> b7f2404ca24df2afd8c47469d42ffbd52d018141

After you clone this repository to your local computer, change directories (cd) into the newly cloned project folder and Install the projects dependencies with NPM for backend and frontend separately.

cd FullStackCapstone/backend
npm install
Start the local backend server using the command:
npm start

<<<<<<< HEAD

=======
>>>>>>> b7f2404ca24df2afd8c47469d42ffbd52d018141
cd FullStackCapstone/fronend
npm install
Start the local frontend interface using the command:
npm start

<<<<<<< HEAD

REST API Endpoints

The supported endpoints are shown below. Please note you will need to prepend them with http://localhost:${PORT}/ before sending the request to the API
￼
GET books
	Parameters:  
	start
	count
	author_name
	author_id
	genre_id
	title
	sort, order (both required together)

GET books/:id

POST books
	Body:
=======
REST API Endpoints
The supported endpoints are shown below. Please note you will need to prepend them with http://localhost:${PORT}/ before sending the request to the API
￼
GET books
	Parameters:  start
				count
				author_name
				author_id
				genre_id
				title
 GET books/:id

POST books
>>>>>>> b7f2404ca24df2afd8c47469d42ffbd52d018141
	title
	author_id
	genre_id
	price
	publication_date
<<<<<<< HEAD

PUT books
	Body:
	price

DELETE books/:id


GET authors

GET authors/:id 

POST authors
	Body:
=======
	sort, order (both required together)

PUT books
	price

DELETE books/:id
 GET authors

GET authors/:id 
POST authors
>>>>>>> b7f2404ca24df2afd8c47469d42ffbd52d018141
	author_name
	biography 

PUT authors
<<<<<<< HEAD
	Body:
=======
>>>>>>> b7f2404ca24df2afd8c47469d42ffbd52d018141
	biography 

DELETE authors/:id

<<<<<<< HEAD

GET genres

GET genres/:id

POST genres
	Body:
	genre_name

The database is automatically populated using JSON data provided in the seeds folder of the project on start of the project.

=======
GET genres

GET genres/:id
POST genres
	genre_name

The database is automatically populated using JSON data provided in the seeds folder of the project on start of the project.
>>>>>>> b7f2404ca24df2afd8c47469d42ffbd52d018141

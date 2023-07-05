# mynzo-backend

## API Documentation
 - Postman: [Public Docs](https://documenter.getpostman.com/view/12387390/2s93zFWJi1)

## How to run the backend application (Docker)
 - Install docker on your host machine (should include docker-compose.yml)
 - Clone the repo to your local `git clone <git-url>`
 - Run docker-compose `docker-compose up`
 - The server will start running after creating db, migrations, seed data for countries, state and cities.

## How to run in development environment
 - Install node^16 and npm
 - Install docker on you host machine (to run database instance)
 - Create a MySQL container using docker `docker run -d -p 3306:3306 --name mynzo_carbon_mysql -e MYSQL_ROOT_PASSWORD=mypassword mysql`
 - Clone the repo to your local `git clone <git-url>`
 - SET the environment variables appropriately in `.env` file
 - Run `npm i`
 - Run `npm run dev`


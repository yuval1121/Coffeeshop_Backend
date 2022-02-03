<h1 align="center">
  <br>
  <br>
  Coffeeshop_Backend
  <br>
</h1>

<h4 align="center">A simple REST API simulating the server of a production coffeeshop web app built in Typescript, Express, Mongo and Docker</a>.</h4>

<p align="center">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
         alt="NodeJS">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"
         alt="Typescript">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"
         alt="MongoDB">
    <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"
         alt="ESLint">
    <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"
         alt="Prettier">
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"
         alt="Docker">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"
         alt="JWT">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"
         alt="NPM">
     <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white"
         alt="Swagger">
    
    
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://github.com/yuval1121/Coffeeshop_Backend/blob/master/public/screenshot.png?raw=true)

## Key Features

- Creating users of different roles.
- Creating items by admin users.
- Client users can make orders.
- Persistent data with MongoDB.
- Passwords are hashed and salted.
- Authentication and authorization with JWT tokens.
- OpenAPI spec on the server.
- Docker support.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer or [Docker](https://www.docker.com/). From your command line:

```bash
# Clone this repository
$ git clone https://github.com/yuval1121/Coffeeshop_Backend.git

# Go into the repository
$ cd Coffeeshop_Backend

# With docker
$ docker-compose up

# without docker
# Install dependencies
$ npm install

# Run the app
$ npm start

# Default users:
email:admin@admin.com password:123456
email:client@client.com password:123456
```

## License

ISC

---

> GitHub [@yuval1121](https://github.com/yuval1121)

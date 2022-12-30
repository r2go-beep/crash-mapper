// External Dep
require('dotenv').config()
const mysql = require('mysql2/promise'); // MySQL dependency injection 
const express = require("express")
const cors = require("cors") // needed for express
const bodyParser = require('body-parser'); // needed to parse requests

// Internal Dep
const { DBHelper } = require('./internal');

// Repository
const { Repository } = require('./internal');

// Router 
const { getRouter } = require('./internal');

// SQL Config  
const DB_config = {
    "host": 'localhost', 
    "user": 'root', 
    "password": '123', 
    "database":  `crash_mapper`, 
}

// App Config 
const app = express()
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect to mySQL server
const dbHelper = new DBHelper(mysql, DB_config)
dbHelper.createConnection()

// Create repository to talk to mySQL server
const repo = new Repository(dbHelper)

// Create route to handle requests to '/api'
app.use('/api', getRouter( repo ))

const hostname = '127.0.0.1';
const port = 9000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

module.exports = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});
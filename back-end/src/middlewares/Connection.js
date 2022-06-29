const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        req.dbConn = await mysql.createConnection({
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
        
        next();

        res.on('finish', () => {
            req.dbConn.destroy();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}
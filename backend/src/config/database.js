
require('dotenv').config();

const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process if unable to connect
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;
//globally defining db connection to use in every file with importing the m
// global.db = db;

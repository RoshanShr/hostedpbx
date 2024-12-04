require('dotenv').config();

const { DataSource } = require('typeorm');
const User = require('../models/userModel'); // Adjust path to the User model

const AppDataSource = new DataSource({
    type: 'mysql', // or your preferred database type
    host:  process.env.DB_HOST, // Database host
    port: 3306, // MySQL port
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // Automatically sync schema (use false in production)
  //  logging: true, // Enable logging (optional)
    entities: [User], // Register your entity here
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source initialized successfully');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

module.exports = AppDataSource;

const db = require('../config/database');

module.exports = class User {

    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;

    }

     register() {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO pbx_users (username,email, password) values ('${this.username}','${this.email}','${this.password}')`, (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return reject(err); // Reject the promise with the error
                }
                resolve(results); // Resolve the promise with the results
            });
        });

    }

    static fetchAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM pbx_users', (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return reject(err); // Reject the promise with the error
                }
                resolve(results); // Resolve the promise with the results
            });
        });
    }

}
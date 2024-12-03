
const db = require('../config/database');

module.exports = class User {

    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;

    }

    static fetchUser(userDetails) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id,username,email,password FROM pbx_users where username = '${userDetails.username}'`, (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).send('Database error');
                    return;
                }

                const formattedResults = JSON.parse(JSON.stringify(results));
                resolve(formattedResults[0] || null);

            });
        });
    }

}

//users add edit delete is done here

const AppDataSource = require('../config/database'); // Import the data source


exports.getUsers = async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository('User'); // Get repository by entity name
        const users = await userRepository.find(); // Fetch all users
        res.json(users); // Return users as JSON
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Database error');
    }
};



// exports.getUsers = async (req, res) => {
//     try {
//         // call the model to connect to database and retrieve data
//         const users = await User.fetchAll(); // Wait for the results from the fetchAll method
//         res.json(users); // Send the results as a JSON response
//     } catch (err) {
//         console.error('Error in getAllUsers:', err);
//         res.status(500).send('Database error'); // Handle errors appropriately
//     }
// }

exports.getCredentials = async (req, res) => {
    res.status(201).send({
        message: "Coming after token passed"
    })
}
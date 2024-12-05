const AppDataSource = require('../config/database'); // Import the data source
const Client = require('../models/clientModel');

exports.getClients = async (req, res) => {
    try {
        const clientRepository = AppDataSource.getRepository('Client'); // Get repository by entity name
        const clients = await clientRepository.find(); // Fetch all users
        res.json(clients); // Return users as JSON
    } catch (err) {
        console.error('Error fetching clients:', err);
        res.status(500).send('Database error');
    }
};


exports.addClient = async (req, res) => {
    let {
        name,
        alias
    } = req.body; // Get user data from request body
    if (name && alias) {
        try {
            await AppDataSource
                .createQueryBuilder()
                .insert()
                .into(Client)
                .values([{
                    name: name,
                    alias: alias,
                }, ])
                .execute()
            res.status(201).send({
                data: req.body,
                message: "Client added"
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: "Some Problem"
            })
        }
    } else {
        res.status(500).send('Fields are missing'); // Handle errors appropriately

    }
}
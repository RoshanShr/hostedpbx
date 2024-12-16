import Client from '../models/clientModel.js';

import { AppDataSource, AppDataSource2 } from '../config/database.js';

export const getClients = async (req, res) => {
    try {
        const clientRepository = AppDataSource.getRepository('Client'); // Get repository by entity name
        const clients = await clientRepository.find(); // Fetch all users
        res.json(clients); // Return users as JSON
    } catch (err) {
        console.error('Error fetching clients:', err);
        res.status(500).send('Database error');
    }
};

export const addClient = async (req, res) => {
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


export const deleteClient = async (req, res) => {
    let {
        id
    } = req.body; // Get user data from request body
    if (id) {
        try {

            // Check if the user exists
            const client = await AppDataSource
                .createQueryBuilder()
                .select("client")
                .from(Client, "client")
                .where("client.id = :id", {
                    id: id
                })
                .getOne();

            if (!client) {
                return res.status(404).send({
                    message: 'Client not found'
                }); // Return 404 if user does not exist
            }


            await AppDataSource
                .createQueryBuilder()
                .delete()
                .from(Client)
                .where("id = :id", {
                    id: id
                })
                .execute()
            res.status(200).send({
                message: "Client deleted successfully"
            })
        } catch (err) {
            res.status(500).send({
                message: "Some Problem"
            })
        }
    } else {
        res.status(500).send('Id is missing'); // Handle errors appropriately

    }
}
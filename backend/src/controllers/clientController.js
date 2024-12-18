import Client from '../models/clientModel.js';

import {
    AppDataSource,
    AppDataSource2
} from '../config/database.js';

export const getClients = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1; // Default to page 1
        const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
        const offset = (page - 1) * limit; // Calculate the offset for the query

        const clientRepository = AppDataSource.getRepository('Client'); // Get repository by entity name\
        // Fetch clients with pagination
        const [clients, totalItems] = await clientRepository.findAndCount({
            skip: offset, // Skip the records before the current page
            take: limit, // Limit the number of records to fetch
        });

        // Return paginated response
        res.json({
            data: clients, // The clients for the current page
            currentPage: page, // The current page number
            totalItems, // Total number of items
            totalPages: Math.ceil(totalItems / limit), // Total number of pages
        });
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
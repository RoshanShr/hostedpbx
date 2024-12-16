import { AppDataSource2 } from '../config/database.js';

export const getReports = async (req, res) => {
    try {
        const rawQuery = 'SELECT * FROM Vox_call_logs'; // Replace with your table name
        const reports = await AppDataSource2.query(rawQuery); // Execute raw query
        res.json(reports); // Return users as JSON
    } catch (err) {
        console.error('Error fetching reports:', err);
        res.status(500).send('Database error');
    }
};

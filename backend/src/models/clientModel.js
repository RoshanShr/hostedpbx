import { EntitySchema } from 'typeorm';

const Client = new EntitySchema({
    name: 'Client', // Entity name
    tableName: 'pbx_clients', // Table name in the database
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: 'increment',
        },
        name: {
            type: 'varchar',
            length: 255,
        },
        alias: {
            type: 'varchar',
            length: 255,
        }
    },
});


export default Client;

import express from 'express';
import cors from 'cors';

import loginRouter from './src/routes/login.js';
import usersRouter from './src/routes/users.js';
import clientRouter from './src/routes/clients.js';
import reportsRouter from './src/routes/reports.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRouter);
app.use(usersRouter);
app.use(clientRouter);
app.use(reportsRouter);

app.listen(5000, () => {
    console.log("Server is up and running");
})
const express = require('express');
const app = express();
const cors = require('cors');

const loginRouter = require('./src/routes/login')
const usersRouter = require('./src/routes/users')
const clientRouter = require('./src/routes/clients')
app.use(express.json());
app.use(cors());

app.use(loginRouter);
app.use(usersRouter);
app.use(clientRouter);

app.listen(5000, () => {
    console.log("Server is up and running");
})
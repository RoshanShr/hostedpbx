const express = require('express');
const app = express();

const loginRouter = require('./src/routes/login')
const usersRouter = require('./src/routes/users')
app.use(express.json());
//app.use(cors());

app.use(loginRouter);
app.use(usersRouter);


app.listen(5000, () => {
    console.log("Server is up and running");
})
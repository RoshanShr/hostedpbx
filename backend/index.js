const express = require('express');

const app = express();
const usersController = require('./src/controllers/usersController');
const loginController = require('./src/controllers/loginController');
const verifyToken = require("./verifyToken")

app.use(express.json());
//app.use(cors());


//get users
app.get("/users",usersController.getUsers);
app.post("/register",usersController.registerUser);
app.get("/credentials",verifyToken,usersController.getCredentials);



//add users
//app.post("/users",userscController.addUsers);


app.post("/login",loginController.checkUser);





app.listen(8000, () => {
    console.log("Server is up and running");
})
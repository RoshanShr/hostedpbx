//users add edit delete is done here
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        // call the model to connect to database and retrieve data
        const users = await User.fetchAll(); // Wait for the results from the fetchAll method
        res.json(users); // Send the results as a JSON response
    } catch (err) {
        console.error('Error in getAllUsers:', err);
        res.status(500).send('Database error'); // Handle errors appropriately
    }
}

exports.registerUser = async (req, res) => {
    let userDetails = req.body;
    if (userDetails.username != undefined && userDetails.email != undefined & userDetails.password != undefined) {
        try {
            bcrypt.genSalt(10,(err,salt)=>{
                if(!err)
                {
                    bcrypt.hash(userDetails.password,salt,async (err,hpass)=>{
                        if(!err)
                        {
                            userDetails.password=hpass;
                            try 
                            {
                                const user = new User(null, userDetails.username, userDetails.email,userDetails.password);
                                const users = await user.register(); 
                                res.status(201).send({message:"User Registered"})
                            }
                            catch(err){
                                console.log(err);
                                res.status(500).send({message:"Some Problem"})
                            }
                        }
                    })
                }
            })
        } catch (err) {
            console.error('Error in getAllUsers:', err);
            res.status(500).send('Database error'); // Handle errors appropriately
        }
    } else {
        console.error('Error in getAllUsers:', err);
    }
}


exports.getCredentials = async (req, res) => {
    res.status(201).send({message:"Coming after token passed"})
}
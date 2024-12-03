const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');

exports.checkUser = async (req, res) => {
    try {
        let userDetails = req.body;
        const loginData= await loginModel.fetchUser(userDetails);

        if(loginData.length==0){
            // if not user found
            res.status(404).send({message:"User not found"})
            
        }else{
            //create and send token if user found
             bcrypt.compare(userDetails.password,loginData.password,(err,success)=>{
                if(success==true)
                {
                    jwt.sign({email:userDetails.email},"hostedpbx",(err,token)=>{
                        if(!err)
                        {
                            res.send({message:"Login Success",token:token,userid:loginData.id,name:loginData.username});
                        }
                    })
                }
                else 
                {
                    res.status(403).send({message:"Incorrect password"})
                }
            })
            
        }

    } catch (err) {
        console.error('Error in getAllUsers:', err);
        res.status(500).send('Database error'); // Handle errors appropriately
    }
}


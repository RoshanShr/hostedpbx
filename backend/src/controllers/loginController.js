import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  User  from '../models/userModel.js';
import { AppDataSource} from '../config/database.js';


export const checkUser = async (req, res) => {
    try {
        let userDetails = req.body;
        const loginData = await AppDataSource
            .getRepository('User')
            .createQueryBuilder("user")
            .where("user.username = :username", {
                username: userDetails.username
            })
            .getOne()

        if (!loginData) {
            // if not user found
            res.status(404).send({
                message: "User not found"
            })

        } else {
            //create and send token if user found
            bcrypt.compare(userDetails.password, loginData.password, (err, success) => {
                if (success == true) {
                    jwt.sign({
                        email: userDetails.email
                    }, process.env.JWT_SECRET_KEY, (err, token) => {
                        if (!err) {
                            res.send({
                                message: "Login Success",
                                token: token,
                                userid: loginData.id,
                                name: loginData.username
                            });
                        }
                    })
                } else {
                    res.status(403).send({
                        message: "Incorrect password"
                    })
                }
            })

        }

    } catch (err) {
        console.error('Error in getAllUsers:', err);
        res.status(500).send('Database error'); // Handle errors appropriately
    }
}



export const registerUser = async (req, res) => {
    let {
        username,
        email,
        password
    } = req.body; // Get user data from request body
    if (username && email && password) {
        try {
            bcrypt.genSalt(10, (err, salt) => {
                if (!err) {
                    bcrypt.hash(password, salt, async (err, hpass) => {
                        if (!err) {
                            password = hpass;
                            try {
                                await AppDataSource
                                    .createQueryBuilder()
                                    .insert()
                                    .into(User)
                                    .values([{
                                        username: username,
                                        email: email,
                                        password: password
                                    }, ])
                                    .execute()
                                res.status(201).send({
                                    message: "User Registered"
                                })
                            } catch (err) {
                                console.log(err);
                                res.status(500).send({
                                    message: "Some Problem"
                                })
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
        res.status(500).send('Fields are missing'); // Handle errors appropriately

    }
}
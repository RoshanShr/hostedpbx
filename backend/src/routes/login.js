
const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');


router.post("/login", loginController.checkUser);
router.post("/register",loginController.registerUser);


module.exports = router;
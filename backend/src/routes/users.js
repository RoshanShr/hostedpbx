const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const verifyToken = require("../middleware/verifyToken")

router.get("/users",usersController.getUsers);
router.get("/credentials",verifyToken,usersController.getCredentials);

module.exports = router;
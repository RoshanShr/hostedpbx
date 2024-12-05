const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');
const verifyToken = require("../middleware/verifyToken")


router.get("/clients",verifyToken,clientController.getClients);
router.post("/addClient",verifyToken,clientController.addClient);

module.exports = router;

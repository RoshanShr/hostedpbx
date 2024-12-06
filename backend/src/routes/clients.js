const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');
const verifyToken = require("../middleware/verifyToken")


router.get("/clients",verifyToken,clientController.getClients);
router.post("/clients",verifyToken,clientController.addClient);
router.delete("/clients",verifyToken,clientController.deleteClient);

module.exports = router;

import express from 'express';
import {getUsers,getCredentials} from '../controllers/usersController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/users",getUsers);
router.get("/credentials",verifyToken,getCredentials);

export default router;
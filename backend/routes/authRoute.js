import express from 'express';
const router = express.Router();
import {register} from '../controllers/registerController.js';
import { handleLogin } from '../controllers/loginController.js';



router.post("/register" , register);
router.post("/login" , handleLogin);


export default router;
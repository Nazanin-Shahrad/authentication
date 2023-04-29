import express from 'express';
const router = express.Router();
import {register} from '../controllers/registerController.js';



router.post("/register" , register);


export default router;
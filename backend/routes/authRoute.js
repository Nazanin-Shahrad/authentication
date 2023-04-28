import express from 'express';
const router = express.Router();
import {register} from '../controllers/registerController';



router.post("/register" , register);


export default router;
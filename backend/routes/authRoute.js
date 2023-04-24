import express from 'express';
import {register} from '../controllers/registerController';

const router = express.Router();

router.post("/register" , register);
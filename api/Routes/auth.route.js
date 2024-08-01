import express from 'express';
import { signup } from '../Controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/signup", signup);

export default authRouter;
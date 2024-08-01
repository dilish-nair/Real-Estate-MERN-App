import express from 'express';
import { signup, signin, signout, googleAuth } from '../Controllers/auth.controller.js';

const router = express.Router();



// Signup route
router.post("/signup", signup);

// Signin route
router.post('/signin', signin);

// Signout route
router.post('/signout', signout);

// Google Auth route
router.post('/google', googleAuth);

export default router;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

export const signup = async (req, res, next) => {
    const { username, email, password, firstName, lastName } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully!' });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.status(200).json({ success: true, message: 'Logged in successfully' });
    } catch (error) {
        next(error);
    }
};



export const signout = (req, res) => {
    res.status(200).json({ success: true, message: 'User signed out successfully' });
};

// Placeholder for Google sign-in, this will need more setup on frontend and additional packages for backend
export const googleAuth = async (req, res, next) => {
    try {
        // Handle Google authentication logic here
        res.status(200).json({ success: true, message: 'Google authentication successful' });
    } catch (error) {
        next(error);
    }
};

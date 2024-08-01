import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

export const signup = async (req, res, next) => {
    const { username, email, password, firstName, lastName, phone } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
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
            phone,
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res) => {
    res.status(200).json({ message: 'User signed out successfully' });
};

// Placeholder for Google sign-in, this will need more setup on frontend and additional packages for backend
export const googleAuth = async (req, res, next) => {
    try {
        // Handle Google authentication logic here
        res.status(200).json({ message: 'Google authentication successful' });
    } catch (error) {
        next(error);
    }
};

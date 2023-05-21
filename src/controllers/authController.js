const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {

    const { email, password, provider } = req.body;

    //check email and password if they are empty
    if ( !email || !password) {
        return res.status(400).json({ success: false, message: 'display name, email and password are required' });
    }

    // Validate the email input
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    let display_name = email.split("@")[0];

    // Validate the password input
    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    try {
        // Check if the admin already exists
        const existingUser = await User.findOne({ where: { display_name } });

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // Create provider and key
        const provider = 'movemate.com';
        const key = process.env.REGISTRATION_KEY;

        // Hash the password and create a new admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ display_name, email, password: hashedPassword, provider, key });

        res.status(201).json({ success: true, message: 'User created successfully' + newUser.display_name });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    
}

const firebaseLogin = async (req, res) => {

}

module.exports = {
    register,
    login,
    firebaseLogin,
};
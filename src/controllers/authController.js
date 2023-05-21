const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {

    const { display_name, email, password, photo_url, provider, key } = req.body;

    //check display_name and password if they are empty
    if (!display_name || !email || !password) {
        return res.status(400).json({ success: false, message: 'display name, email and password are required' });
    }

    // Validate the display_name input
    const display_nameRegex = /^\S+$/;
    if (!display_nameRegex.test(display_name)) {
        return res.status(400).json({ success: false, message: 'Invalid display name' });
    }

    // Validate the email input
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    // Validate the password input
    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ success: false, message: 'Invalid password' });
    }
    
    if (key !== process.env.REGISTRATION_KEY) {
        return res.status(401).json({ success: false, message: 'Invalid key' });
    }

    try {
        // Check if the admin already exists
        const existingUser = await User.findOne({ where: { display_name } });

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // Created
        // Hash the password and create a new admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ display_name, email, password: hashedPassword, photo_url, provider });

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
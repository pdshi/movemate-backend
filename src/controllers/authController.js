const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {

    const { email, password, key } = req.body;
    const { role } = req.body || 'user';

    //check email and password if they are empty
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and Password are required' });
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

    if (key !== process.env.API_KEY) {
        return res.status(401).json({ success: false, message: 'Invalid key' });
    }

    try {
        // Check if the admin already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // Create provider and key
        const provider = 'movemate.com';

        // Hash the password and create a new admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ display_name, email, password: hashedPassword, provider, role });

        res.status(201).json({ success: true, message: 'User created successfully ' + newUser.display_name });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const login = async (req, res) => {

    const { email, password } = req.body;

    // Check if the email and password are empty
    if (!email || !password) {

        return res.status(400).json({ success: false, message: 'Email and Password are required' });

    }

    // Validate the email input
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {

        return res.status(400).json({ success: false, message: 'Invalid email' });

    }

    try {

        // Check if the admin already exists
        const user = await User.findOne({ where: { email } });

        if (!user) {

            return res.status(404).json({ success: false, message: 'User not found' });

        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {

            return res.status(400).json({ success: false, message: 'Invalid password' });

        }

        // Create and assign a token
        const token = jwt.sign({ user_id: user.user_id, display_name: user.display_name, email: user.email, photo_url: user.photo_url, role: user.role }, process.env.JWT_SECRET, { expiresIn: '365d' });

        // Set cookies in the response
        res.cookie('token', `Bearer ${token}`, {
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });

        res.status(200).json({ success: true, message: 'Logged in successfully' });

    } catch (err) {

        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });

    }
}

const firebaseLogin = async (req, res) => {
    try {

        const uid = req.decodedToken.sub;
        const display_name = req.decodedToken?.name || null;
        const email = req.decodedToken?.email || null;
        const photo_url = req.decodedToken?.picture || null;
        const provider = req.decodedToken?.firebase.sign_in_provider;

        let user = await User.findOne({ where: { email } });
        if (user) {

            return res.status(409).json({ success: false, message: 'User already exists' });

        } else {

            user = await User.create({ user_id: uid, display_name, email, photo_url, provider });

        }

        user.last_login = new Date();
        user.display_name = display_name;
        user.email = email;
        user.photo_url = photo_url;
        await user.save();

        const token = jwt.sign({ user_id: user.user_id, display_name: user.display_name, email: user.email, photo_url: user.photo_url, role: user.role }, process.env.JWT_SECRET, { expiresIn: '365d' });

        // Set cookies in the response
        res.cookie('token', `Bearer ${token}`, {
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Set expiration to one year from now
        });

        return res.status(200).json({ token, status: true, message: 'Login successful' });

    } catch (err) {

        console.error('Error verifying Firebase ID token or accessing database:', err);

        return res.status(500).send({ status: false, message: 'Error verifying ID token or accessing database' });

    }
}

module.exports = {
    register,
    login,
    firebaseLogin,
};
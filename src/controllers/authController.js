const User = require('../models/userModel');
const UserData = require('../models/userDataModel');
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
        const newUser = await User.create({ email, password: hashedPassword, provider, role });

        res.status(201).json({ success: true, message: 'User created successfully ' + newUser.display_name });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
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
        const token = jwt.sign({
            user_id: user.user_id,
            display_name: user.display_name,
            email: user.email,
            photo_url: user.photo_url,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '365d' });

        // Set cookies in the response
        res.cookie('token', `Bearer ${token}`, {
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });

        res.status(200).json({ success: true, message: 'Logged in successfully', token });

    } catch (error) {

        console.log(err);
        res.status(500).json({ success: false, message: error.message });

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
        if (!user) {

            user = await User.create({ user_id: uid, display_name, email, photo_url, provider });

        }

        if (user.provider !== provider) {

            return res.status(401).json({
                success: false,
                message: 'You are already registered with basic email, try login with email and password instead'
            })

        }

        user.last_login = new Date();
        user.email = email;
        await user.save();

        let userData = await UserData.findOne({ where: { user_id: user.user_id } });
        if (userData) {

            userData.photo_url = photo_url;
            await userData.save();

        }

        const token = jwt.sign({
            user_id: user.user_id,
            display_name: user.display_name,
            email: user.email,
            photo_url: userData.photo_url,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '365d' });

        // Set cookies in the response
        res.cookie('token', `Bearer ${token}`, {
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Set expiration to one year from now
        });

        return res.status(201).json({ success: true, message: 'Login successful', token });

    } catch (error) {

        console.error('Error verifying Firebase ID token or accessing database:', err);

        return res.status(500).send({ success: false, message: error.message });

    }
}

module.exports = {
    register,
    login,
    firebaseLogin,
};
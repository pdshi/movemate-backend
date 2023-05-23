const User = require('../models/User');

const register = async (req, res) => {

    username = req.body.username
    password = req.body.password

};

const login = async (req, res) => {

};

const firebaseLogin = async (req, res) => {
    try {

        const uid = req.decodedToken.sub;

        const display_name = req.decodedToken.name || null;
        const email = req.decodedToken.email || null;
        const provider = req.decodedToken.firebase.sign_in_provider;

        let user = await User.findOne({ where: { user_id: uid } });
        if (!user) {

            user = await User.create({ user_id: uid, display_name, email, provider });

        }

        user.last_login = new Date();
        user.display_name = display_name;
        user.email = email;
        await user.save();

        const token = jwt.sign({ user_id: user.user_id, display_name: user.display_name, email: user.email }, process.env.JWTSECRET, { expiresIn: '365d' });

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
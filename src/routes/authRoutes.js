const express = require('express');

const { verifyFirebaseToken } = require('../middleware/firebaseMiddleware');
const { login, register, firebaseLogin } = require('../controllers/authController');

const router = express.Router();

// TODO: Implement firebase LOGIN method
router.post('/firebase', verifyFirebaseToken, firebaseLogin);
// router.post('/login', login);

// TODO: implement register method
router.post('/register', register);

module.exports = router;
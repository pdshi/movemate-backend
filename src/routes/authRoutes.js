const express = require('express');

const { verifyFirebaseToken } = require('../middleware/firebaseMiddleware');
const { login, register, firebaseLogin } = require('../controllers/authController');

const router = express.Router();

router.post('/firebase', verifyFirebaseToken, firebaseLogin);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
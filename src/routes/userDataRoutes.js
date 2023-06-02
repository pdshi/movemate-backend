const express = require('express');

const { verifyToken } = require('../middleware/verifyTokenMiddleware');
const { inputUserData, getUserData, editUserData } = require('../controllers/userDataController');

const router = express.Router();

router.post('/input', verifyToken, inputUserData);
router.get('/get', verifyToken, getUserData);
router.put('/edit', verifyToken, editUserData);

module.exports = router;
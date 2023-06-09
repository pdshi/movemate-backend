const express = require('express');

const { verifyToken } = require('../middleware/verifyTokenMiddleware');
const { inputUserHistory, getUserHistory, editUserHistory } = require('../controllers/userHistoryController');

const router = express.Router();

router.post('/input', verifyToken, inputUserHistory);
router.post('/get', verifyToken, getUserHistory);

module.exports = router;
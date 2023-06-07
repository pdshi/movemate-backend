const express = require('express');

const { verifyToken } = require('../middleware/verifyTokenMiddleware');
const { inputUserReps, getUserReps } = require('../controllers/userRepsController');

const router = express.Router();

router.post('/input', verifyToken, inputUserReps);
router.get('/get', verifyToken, getUserReps);
//router.put('/edit', verifyToken, editUserReps);

module.exports = router;
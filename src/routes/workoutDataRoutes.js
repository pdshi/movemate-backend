const express = require('express');

const { verifyToken } = require('../middleware/verifyTokenMiddleware');
const { inputWorkoutData, getWorkoutData, editWorkoutData, deleteWorkoutData } = require('../controllers/workoutDataController');

const router = express.Router();

router.post('/input', verifyToken, inputWorkoutData);
router.get('/get', verifyToken, getWorkoutData);
router.put('/edit', verifyToken, editWorkoutData);
router.delete('/delete', verifyToken, deleteWorkoutData);

module.exports = router;
const express = require('express');

const { verifyToken } = require('../middleware/verifyTokenMiddleware');
const { inputWorkoutData, getWorkoutData, getAllWorkoutDataType, editWorkoutData, deleteWorkoutData } = require('../controllers/workoutDataController');

const router = express.Router();

router.post('/input', verifyToken, inputWorkoutData);
router.post('/get', verifyToken, getWorkoutData);
router.get('/getalltype', verifyToken, getAllWorkoutDataType);
router.put('/edit', verifyToken, editWorkoutData);
router.delete('/delete', verifyToken, deleteWorkoutData);

module.exports = router;
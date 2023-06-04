const WorkoutData = require('../models/workoutDataModel');

const inputWorkoutData = async (req, res) => {

    const { type, calories_per_reps, bicep, tricep, shoulder, chest, abs, thigh, butt, leg } = req.body;
    const { role } = req.decodedToken;

    if (role !== 'admin') {

        return res.status(403).json({ success: false, message: 'Forbidden' });

    }

    try {

        let workoutData = await WorkoutData.findOne({ where: { type } });
        if (workoutData) {

            return res.status(409).json({ success: false, message: 'Workout data already exists' });

        } else {

            workoutData = await WorkoutData.create({ type, calories_per_reps, bicep, tricep, shoulder, chest, abs, thigh, butt, leg });

        }

        return res.status(200).json({ status: true, message: 'Workout data created successfully' });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
}

const getWorkoutData = async (req, res) => {

    const { type } = req.body;

    try {

        const workoutData = await WorkoutData.findOne({ where: { type } });

        if (!workoutData) {

            return res.status(404).json({ success: false, message: 'Workout data not found' });

        }

        return res.status(200).json({ status: true, message: 'Workout data found', data: workoutData });

    }
    catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
};

const editWorkoutData = async (req, res) => {

    const { type, calories_per_reps, bicep, tricep, shoulder, chest, abs, thigh, butt, leg } = req.body;
    const { role } = req.decodedToken;

    if (role !== 'admin') {

        return res.status(403).json({ success: false, message: 'You are not authorized to perform this action' });

    }

    try {

        let workoutData = await WorkoutData.findOne({ where: { type } });
        if (!workoutData) {

            return res.status(404).json({ success: false, message: 'Workout data not found' });

        }

        workoutData.calories_per_reps = calories_per_reps || workoutData.calories_per_reps;
        workoutData.bicep = bicep || workoutData.bicep;
        workoutData.tricep = tricep || workoutData.tricep;
        workoutData.shoulder = shoulder || workoutData.shoulder;
        workoutData.chest = chest || workoutData.chest;
        workoutData.abs = abs || workoutData.abs;
        workoutData.thigh = thigh || workoutData.thigh;
        workoutData.butt = butt || workoutData.butt;
        workoutData.leg = leg || workoutData.leg;

        await workoutData.save();

        return res.status(200).json({ status: true, message: 'Workout data updated successfully' });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
};

const deleteWorkoutData = async (req, res) => {

    const { type } = req.body;
    const { role } = req.decodedToken;

    if (role !== 'admin') {

        return res.status(403).json({ success: false, message: 'You are not authorized to perform this action' });

    }

    try {

        let workoutData = await WorkoutData.findOne({ where: { type } });
        if (!workoutData) {

            return res.status(404).json({ success: false, message: 'Workout data not found' });

        }

        await workoutData.destroy();

        return res.status(200).json({ status: true, message: 'Workout data deleted successfully' });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
};

module.exports = {
    inputWorkoutData,
    getWorkoutData,
    editWorkoutData,
    deleteWorkoutData
};
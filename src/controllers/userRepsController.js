const UserReps = require('../models/userRepsModel');

const inputUserReps = async (req, res) => {

    const { type, reps } = req.body;
    const user_id = req.decodedToken;

    try {

        let userReps = await UserReps.findOne({ where: { user_id, type } });
        if (userReps) {

            return res.status(409).json({ success: false, message: 'User reps data already exists' });

        } else {

            userReps = await UserData.create({ user_id, type, reps });

        }

        return res.status(200).json({ status: true, message: 'User reps created successfully' });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
}

const getUserReps = async (req, res) => {

    const { user_id } = req.decodedToken;

    try {

        const userReps = await UserReps.findAll({ where: { user_id } });
        if (!userReps) {

            return res.status(404).json({ success: false, message: 'User reps not found' });

        }

        return res.status(200).json({ status: true, message: 'User reps found', data: userReps });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
};

const editUserReps = async (req, res) => {

    const { type, reps } = req.body;
    const user_id = req.decodedToken;

    if (!type || !reps) {

        return res.status(400).json({ success: false, message: 'Please provide all required fields' });

    };

    try {

        let userReps = await UserReps.findOne({ where: { user_id, type } });
        if (!userReps) {

            return res.status(404).json({ success: false, message: 'User reps data not found' });

        }

        userReps.reps = reps || userReps.reps;

        await userReps.save();

        return res.status(200).json({ status: true, message: 'User reps data updated successfully' });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
};

module.exports = {
    inputUserReps,
    getUserReps,
    editUserReps
};
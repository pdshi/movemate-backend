const UserData = require('../models/userDataModel');

const inputUserData = async (req, res) => {

    const { gender, age, height, weight, goal, goal_weight, spare_days } = req.body;

    const user_id = req.decodedToken.user_id;

    let userData = await UserData.findOne({ where: { user_id } });
    if (userData) {

        return res.status(409).json({ success: false, message: 'User data already exists' });

    } else {

        userData = await UserData.create({ user_id, gender, age, height, weight, goal, goal_weight, spare_days });

    }

    return res.status(200).json({ status: true, message: 'User data created successfully' });

}

const getUserData = async (req, res) => {

    const user_id = req.decodedToken.user_id;

    // find user data 
    let userData = await UserData.findOne({ where: { user_id } });
    if (!userData) {

        return res.status(404).json({ success: false, message: 'User data not found' });

    }

    return res.status(200).json({ status: true, message: 'User data found', data: userData });

}
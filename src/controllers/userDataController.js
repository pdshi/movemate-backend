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

const editUserData = async (req, res) => {

    const { gender, age, height, weight, goal, goal_weight, spare_days } = req.body;
    const user_id = req.decodedToken.user_id;

    try {
        let userData = await UserData.findOne({ where: { user_id } });

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User data not found' });
        }

        userData.gender = gender ?? userData.gender;
        userData.age = age ?? userData.age;
        userData.height = height ?? userData.height;
        userData.weight = weight ?? userData.weight;
        userData.goal = goal ?? userData.goal;
        userData.goal_weight = goal_weight ?? userData.goal_weight;
        userData.spare_days = spare_days ?? userData.spare_days;

        await userData.save();

        return res.status(200).json({ status: true, message: 'User data updated successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const UserData = require('../models/userDataModel');

const inputUserData = async (req, res) => {

    const { display_name, photo_url, gender, age, height, weight, goal, goal_weight, frequency, day_start, wo_time } = req.body;
    const { user_id } = req.decodedToken;

    try {

        let userData = await UserData.findOne({ where: { user_id } });
        if (!userData) {

            userData = await UserData.create({ user_id });

        }

        userData.display_name = display_name || userData.display_name;
        userData.photo_url = photo_url || userData.photo_url;
        userData.gender = gender || userData.gender;
        userData.age = age || userData.age;
        userData.height = height || userData.height;
        userData.weight = weight || userData.weight;
        userData.goal = goal || userData.goal;
        userData.goal_weight = goal_weight || userData.goal_weight;
        userData.frequency = frequency || userData.frequency;
        userData.day_start = day_start || userData.day_start;
        userData.wo_time = wo_time || userData.wo_time;

        if (userData.height && userData.weight) {

            const heightInMeters = userData.height / 100;
            userData.bmi = userData.weight / (heightInMeters * heightInMeters);

            if (userData.bmi < 18.75) {

                userData.bmi_status = 'Underweight';

            } else if (userData.bmi < 25) {

                userData.bmi_status = 'Normal';

            } else if (userData.bmi < 30) {

                userData.bmi_status = 'Overweight';

            } else if (userData.bmi < 40) {

                userData.bmi_status = 'Obesity';

            } else {

                userData.bmi_status = 'Severe Obesity';

            }
        }

        await userData.save();

        return res.status(200).json({ success: true, message: 'User data input successfully', data: userData });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
}

const getUserData = async (req, res) => {

    const { user_id } = req.decodedToken;

    try {

        const userData = await UserData.findOne({ where: { user_id } });

        if (!userData) {

            return res.status(404).json({ success: false, message: 'User data not found' });

        }

        if (!userData.height && !userData.weight && !userData.goal && !userData.goal_weight && !userData.frequency && !userData.day_start && !userData.wo_time) {

            return res.status(400).json({ success: false, message: 'Required user data is not present' });

        }

        return res.status(200).json({ success: true, message: 'User data found', data: userData });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
};


// const editUserData = async (req, res) => {

//     const { gender, age, height, weight, goal, goal_weight, spare_days } = req.body;
//     const { user_id } = req.decodedToken;

//     try {

//         let userData = await UserData.findOne({ where: { user_id } });

//         if (!userData) {

//             return res.status(404).json({ success: false, message: 'User data not found' });

//         }

//         userData.gender = gender || userData.gender;
//         userData.age = age || userData.age;
//         userData.height = height || userData.height;
//         userData.weight = weight || userData.weight;
//         userData.goal = goal || userData.goal;
//         userData.goal_weight = goal_weight || userData.goal_weight;
//         userData.spare_days = spare_days || userData.spare_days;

//         const heightInMeters = userData.height / 100;
//         userData.bmi = userData.weight / (heightInMeters * heightInMeters);

//         await userData.save();

//         return res.status(200).json({ success: true, message: 'User data updated successfully' });

//     } catch (error) {

//         // Handle any errors that occur during the process
//         console.error(error);
//         return res.status(500).json({ success: false, message: error.message });

//     }
// };

module.exports = {
    inputUserData,
    getUserData,
    // editUserData
};
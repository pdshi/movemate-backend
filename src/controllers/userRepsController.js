const UserReps = require('../models/userRepsModel');
const WorkoutData = require('../models/workoutDataModel');

const inputUserReps = async (req, res) => {

    const { type, reps, sets, date, start, end } = req.body;
    const { user_id } = req.decodedToken;

    try {

        let workoutData = await WorkoutData.findOne({ where: { type } });
        if (!workoutData) {

            return res.status(404).json({ success: false, message: 'Workout data not found' });

        }

        await UserReps.create({ user_id, type, reps, sets, date, start, end });

        return res.status(200).json({ success: true, message: 'User reps inserted successfully' });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
}

const getUserReps = async (req, res) => {

    const { current_date } = req.body;
    const { user_id } = req.decodedToken;

    try {

        let userReps = await UserReps.findOne({ where: { user_id, date: current_date } });
        if (!userReps) {

            return res.status(404).json({ success: false, message: 'User reps not found' });

        }

        userReps = await UserReps.findAll({ where: { user_id, created_at: userReps.created_at } });


        // let addDate = 1;
        // // infinite while loop, exit with break
        // while (true) {

        //     // new date and + addDate
        //     let newDate = new Date(current_date);
        //     newDate.setDate(newDate.getDate() + addDate);

        //     let nextUserReps = await UserReps.findAll({ where: { user_id, date: newDate } });
        //     if (!nextUserReps) break;

        //     // add nextUserReps to userReps
        //     userReps = [...userReps, ...nextUserReps];

        //     addDate++;

        // }



        return res.status(200).json({ success: true, message: 'User reps found', data: userReps });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
};

// const editUserReps = async (req, res) => {

//     const { type, reps } = req.body;
//     const user_id = req.decodedToken;

//     if (!type || !reps) {

//         return res.status(400).json({ success: false, message: 'Please provide all required fields' });

//     };

//     try {

//         let userReps = await UserReps.findOne({ where: { user_id, type } });
//         if (!userReps) {

//             return res.status(404).json({ success: false, message: 'User reps data not found' });

//         }

//         userReps.reps = reps || userReps.reps;

//         await userReps.save();

//         return res.status(200).json({ success: true, message: 'User reps data updated successfully' });

//     } catch (error) {

//         // Handle any errors that occur during the process
//         console.error(error);
//         return res.status(500).json({ success: false, message: error.message });

//     }
// };

module.exports = {
    inputUserReps,
    getUserReps,
    //editUserReps
};
const UserHistory = require('../models/userHistoryModel');
const User = require('../models/userModel');
const { Op } = require('sequelize');

const inputUserHistory = async (req, res) => {

    const { type, time, calories } = req.body;
    const user_id = req.decodedToken.user_id;

    try {

        let user = await User.findOne({ where: { user_id } });
        if (user) {

            await UserHistory.create({ user_id, type, time, calories });

        }

        return res.status(200).json({ success: true, message: 'User history added successfully' });

    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
}

const getUserHistory = async (req, res) => {

    const { user_id } = req.decodedToken;
    const { date_from, date_to } = req.body;

    try {

        const startDate = new Date(date_from);
        const endDate = new Date(date_to);

        UserHistory.findAll({
            where: {
                user_id,
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
        }).then((results) => {
            return res.status(200).json({ success: true, message: 'User history found', data: results });
        }).catch((error) => {
            return res.status(404).json({ success: false, message: error.message });
        });


    } catch (error) {

        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
};

module.exports = {
    inputUserHistory,
    getUserHistory
};
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserHistory extends Model { }

UserHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        calories: {
            type: DataTypes.DOUBLE(8, 2),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserHistory',
        tableName: 'user_history',
        timestamps: false,
        underscored: true,
    }
);

module.exports = UserHistory;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserData extends Model { }

UserData.init(
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
        display_name: {
            type: DataTypes.STRING(150),
        },
        photo_url: {
            type: DataTypes.STRING(255),
        },
        gender: {
            // enum of male or female only, 
            type: DataTypes.ENUM('male', 'female'),
        },
        age: {
            type: DataTypes.INTEGER,
        },
        height: {
            type: DataTypes.DECIMAL(5, 2),
        },
        weight: {
            type: DataTypes.DECIMAL(5, 2),
        },
        bmi: {
            type: DataTypes.DECIMAL(5, 2),
        },
        bmi_status: {
            type: DataTypes.ENUM('underweight', 'normal', 'overweight', 'obesity', 'severe_obesity'),
        },
        goal: {
            type: DataTypes.ENUM('lose_weight', 'healthy', 'muscle_gain'),
        },
        goal_weight: {
            type: DataTypes.DECIMAL(5, 2),
        },
        frequency: {
            type: DataTypes.INTEGER,
        },
        day_start: {
            type: DataTypes.ENUM('today', 'tomorrow'),
        },
        wo_time: {
            type: DataTypes.ENUM('morning', 'afternoon', 'night'),
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserData',
        tableName: 'user_data',
        timestamps: true,
        underscored: true,
    }
);

module.exports = UserData;
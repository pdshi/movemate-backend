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
        gender: {
            // enum of male or female only, 
            type: DataTypes.ENUM('male', 'female'),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        height: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        weight: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        goal: {
            type: DataTypes.ENUM('lose_weight', 'healthy', 'muscle_gain'),
            allowNull: false,
        },
        goal_weight: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        spare_days: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
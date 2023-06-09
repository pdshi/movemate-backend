const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserReps extends Model { }

UserReps.init(
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
        reps: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sets: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        start: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end: {
            type: DataTypes.TIME,
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
        modelName: 'UserReps',
        tableName: 'user_reps',
        timestamps: true,
        underscored: true,
    }
);

module.exports = UserReps;
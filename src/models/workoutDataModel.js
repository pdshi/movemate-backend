const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class WorkoutData extends Model { }

WorkoutData.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        calories_per_reps: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bicep: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        tricep: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        shoulder: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        chest: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        abs: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        thigh: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        butt: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        leg: {
            type: DataTypes.BOOLEAN,
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
        modelName: 'WorkoutData',
        tableName: 'workout_data',
        timestamps: true,
        underscored: true,
    }
);

module.exports = WorkoutData;
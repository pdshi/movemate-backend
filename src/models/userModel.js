const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');

class User extends Model { }

User.init(
    {
        user_id: {
            type: DataTypes.STRING(100),
            defaultValue: () => uuidv4(),
            primaryKey: true,
        },
        display_name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        photo_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        last_login: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
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
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        underscored: true,
    }
);

module.exports = User;
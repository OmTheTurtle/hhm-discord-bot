const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

module.exports = sequelize.define('user', {
    discordId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    messageCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    simpCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    covidBet: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
    oldView: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

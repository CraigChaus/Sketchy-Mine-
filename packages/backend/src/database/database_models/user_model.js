const Sequelize = require('sequelize');
const sequelize = require('../util/database_config');

const User = sequelize.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoincrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  total_emeralds: {
    type: Sequelize.INTEGER,
  },
});

module.exports = User;

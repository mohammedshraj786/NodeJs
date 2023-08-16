const Sequelize = require('sequelize');
const sequelize = require('../database');

const Department = sequelize.define('department', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  institution: Sequelize.STRING,
});

module.exports = Department;

const Sequelize = require('sequelize');
const sequelize = require('../database');
const Department = require('./Department'); 

const Student = sequelize.define('students_enrollment', 
{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone_no: Sequelize.STRING,
  address: Sequelize.STRING,
  dept_id: Sequelize.INTEGER,
});

Student.belongsTo(Department, { foreignKey: 'dept_id', targetKey: 'id' });

module.exports = Student;

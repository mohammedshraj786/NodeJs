const sequelize = require('./database');
const Department = require('./models/Department');
const Student = require('./models/Student');
const fs = require('fs');

async function createTable ()
 {
  await sequelize.sync({ force: true });
  console.log('Tables created!');
}
// createTable();


// for inserting the data

async function insertDataD()
{
  try {
    
    const departments = [
      { name: 'Computer Science', institution: 'ABC University' },
      { name: 'Physics', institution: 'XYZ College' },
    ];

    await Department.bulkCreate(departments);

    console.log('Data inserted into Department table successfully!');
  } catch (error) {
    console.error('Error inserting data into Department table:', error);
  }
}

async function insertData() {
  try {
    // Create a department
    const department = await Department.create({
      name: 'Computer Science',
      institution: 'ABC University',
    });

   
    const students = [
      {
        name: 'Mohammed Shraj',
        email: 'shraj@gmail.com',
        phone_no: '1234567890',
        address: '123 Main St, City',
        dept_id: department.id, 
      },

    ];

    await Student.bulkCreate(students);

    console.log('Data inserted into students_enrollments table successfully!');
  } catch (error) {
    console.error('Error inserting data into students_enrollments table:', error);
  }
}

async function main() {
  await createTable();
  await insertData();
  await insertDataD();
}

main();
const Sequelize = require("sequelize");

const sequelize= new Sequelize('student_list','mohammedshraj','root123',
{
    host:'localhost',
    dialect:'mysql'
});
sequelize.authenticate().then(()=>{
    console.log("Connection Done...");
})
.catch((error)=>
{
  console.log("Failed........",error);
})
module.exports=sequelize;





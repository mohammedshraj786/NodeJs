const mysql = require('mysql2');
const table =require('cli-table3');
const fs =require('fs');
const path=require('path');

const connection = mysql.createConnection({
    host: 'localhost',        
    user: 'mohammedshraj',     
    password: 'root123', 
    database: 'students_management'
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL as ID:', connection.threadId);
});


// database operations here

var table=
 "create table students_registration( id int unique auto_increment, name varchar(200) ,email varchar(200) ,phoneNo bigint(200) , address varchar(200) ,department varchar(200) ,institution varchar(200) )"
 connection.query(table,function(err,result)
 {
   if(err)
   throw err;
   console.log("table created");
 });

 var modify=
 "alter table students_registration add name varchar(200)"
 connection.query(modify,function(err,result)
 {
   if(err)throw err;
   console.log("Added done..");
 });

 var modify2=
 "alter table students_registration add values varchar(200)"
 connection.query(modify2,function(err,result)
 {
   if(err)throw err;
   console.log("Added done..");
 });

 var tableData=
 "insert into students_registration(name,email,phoneNo,address,department,institution)values('sethu' , 'sethu@786' , 9089788907 , 'bhavani' , 'IT' , 'GECE'),('suresh' , 'suresh@786' , 9089788907 , 'tiruvannamalai' , 'IT' , 'GECE'),('nidha' , 'nidha@786' , 9089788907 , 'Hosur' , 'IT' , 'GECE'),('jothi' , 'jothi@786' , 9089788907 , 'Andhra' , 'CIVIL' , 'EME'),('narmatha' , 'narmatha@786' , 9089788907 , 'Mtp' , 'MBA' , 'CMS')"
connection.query(tableData,function(err,result){
    if(err)throw err;
    console.log("added successfully");
})
//for get data in mysql table and give as json

var getData=
"select * from students_registration"
connection.query(getData,function(err,result)
{
   if(err)throw err;

   const jsonData= JSON.stringify(result,null,2);
   console.log("Succcess",jsonData);

   const btable=new table(
    {
        head:['Id','Email','PhoneNo','Address','Department','Institution','Name']
    
    });
    result.forEach((row)=>
    {
        btable.push([row.id,row.email,row.phonoNo,row.address,row.department,row.institution,row.name]);
    });
    console.log(btable.toString());
    // console.log(btable);
});

//for updating data into the database

var updateData="update students_registration set name='ManMohanLal' where id=3"
connection.query(updateData,function(err,result)
{
if(err)
{
console.error("Error updating data:", err);
throw err;
}
console.log("Updated done....");
});



var getData=
"select * from students_registration"
connection.query(getData,function(err,result)
{
   if(err)throw err;

   const jsonData= JSON.stringify(result,null,2);
   console.log("Succcess",jsonData);
   const homeDirectory = require('os').homedir();
    const filePath = path.join(homeDirectory, 'datalocal1.json');
    fs.writeFile(filePath, jsonData, 'utf8', err => {
        if (err) {
          console.error('Error writing JSON to file:', err);
          return;
        }
        console.log('JSON data written to file:', filePath);
    });

//    for writing data to json file 
fs.writeFile('data.json',jsonData,'utf-8',err=>{
    if(err)
    throw err;
    console.log("Added succesfully to json file.....");
})


});












// Close the connection when done
connection.end((err) => {
    if (err) {
        console.error('Error closing MySQL connection:', err.stack);
        return;
    }
    console.log('MySQL connection closed.');
});



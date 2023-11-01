const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 

const app = express();

app.use(cors()); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


const dataFilePath='data.json';

app.get('/students', (req, res) => 
{
  fs.readFile(dataFilePath, 'utf8', (err, data) =>
   {
    if (err)
     {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const students = JSON.parse(data);
    res.json(students);
  });
});

app.post('/students', (req, res) =>
 {
  const newStudent = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err)
     {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const students = JSON.parse(data);
    const newStudentId = Object.keys(students).length + 1;
    students[newStudentId] = newStudent;

    fs.writeFile(dataFilePath, JSON.stringify(students, null, 2), (err) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.status(200).json({ id: newStudentId, newStudent });
    });
  });
});


// for deleting 

app.delete('/students')

app.listen(3000, () => {
  console.log('Backend server is running on port 3000');
});

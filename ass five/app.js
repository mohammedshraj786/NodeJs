// const fs=require('fs');
// fs.readFile('./data.json','utf-8',(err,output)=>
// {
//     console.log(output);
// })


const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const PORT = 8080;

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Read the JSON data file
const jsonDataPath = './data.json';

function readData() 
{
  try 
  {
    const data = fs.readFileSync(jsonDataPath, 'utf8');
    return JSON.parse(data);
  } 
  catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(jsonDataPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/data', (req, res) => {
  const jsonData = readData();
  res.json(jsonData);
});

// app.post('/data', (req, res) =>
//  {
//   const jsonData = readData();
//   const newRecord = req.body;
//   newRecord.id = Date.now(); // Add a unique ID (for demo purposes; consider using a proper ID generation method in production)
//   jsonData.push(newRecord);
//   writeData(jsonData);
//   res.json(newRecord);
// }
// );

// app.put('/data/:id', (req, res) => {
//   const jsonData = readData();
//   const idToUpdate = parseInt(req.params.id);
//   const updatedRecord = req.body;
//   const updatedData = jsonData.map(record => (record.id === idToUpdate ? { ...record, ...updatedRecord } : record));
//   writeData(updatedData);
//   res.json(updatedRecord);
// });

app.delete('/data/:id', (req, res) => {
  const jsonData = readData();
  const idToDelete = parseInt(req.params.id);
  const updatedData = jsonData.filter(record => record.id !== idToDelete);
  writeData(updatedData);
  res.json({ message: 'Record deleted successfully.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});




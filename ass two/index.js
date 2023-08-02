const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 9000;
const filePath = './index.txt';

const server = http.createServer((req, res) => 

{
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading the file.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
              <title>Content Of Data</title>
          </head>
          <body style="color:red;background-color: aqua;">
              <pre>${data}</pre>
              <textarea id="textInput" rows="10" cols="50" placeholder="enter the text"></textarea><br>
              <button id="appendButton">Append to File</button>
              <button id="deleteButton">Delete File</button>
              <button id="createButton">Create File</button>
              <div id="fileContent"></div>
          </body>
          <script>
          const appendButton = document.getElementById('appendButton');
          const textInput = document.getElementById('textInput');
          const fileContentDiv = document.getElementById('fileContent');


          fetchFileContent();


          appendButton.addEventListener('click', appendToFile);


         
         

          
          
          function fetchFileContent() 
          {
            fetch('/read', { method: 'GET' })
              .then(response => response.text())
              .then(data => {
                fileContentDiv.textContent = data;
                console.log(data);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
          }
          function appendToFile() 
          {
            const content = textInput.value;
            console.log(content);
            fetch('/append', {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain' },
              body: content,
            })
              .then(fetchFileContent)
              .catch(error => {
                console.error('Error appending data:', error);
              });
          }
         
          
        
          </script>
          </html>
        `);
      }
    });
  } 
else if (req.url === '/read' && req.method === 'GET') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading the file.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } 
  else if (req.url === '/append' && req.method === 'POST') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      fs.appendFile(filePath, data, 'utf8', (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error appending data to the file.');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Data appended to the file.');
        }
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Error not found');
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

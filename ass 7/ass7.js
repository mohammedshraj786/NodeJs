const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;


const users = [
    { username: 'user1', password: 'pass1', name: 'x', age: 30 },
    { username: 'user2', password: 'pass2', name: 'y', age: 25 },
    { username: 'user3', password: 'pass3', name: 'z', age: 40 },
    { username: 'user4', password: 'pass4', name: 'xx', age: 28 },
    { username: 'user5', password: 'pass5', name: 'yy', age: 22 },
  ];


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'shraj', 
  resave: false,
  saveUninitialized: true,
}));



const isAuthenticated = (req, res, next) => 
{
  if (req.session && req.session.user) 
  {
    next();
  } 
  else 
  {
    res.redirect('/login');
  }
};

app.get('/', (req, res) =>
 {
  res.send(`
    <h1>Login Page</h1>
    <form method="post" action="/login">
      <label>Username:</label>
      <input type="text" name="username" required /><br />
      <label>Password:</label>
      <input type="password" name="password" required /><br />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    req.session.user = user;
    res.redirect('/user_info');
  } else {
    res.send('Invalid credentials. Please try again.');
  }
});

app.get('/user_info', isAuthenticated, (req, res) => 
{
  const user = req.session.user;
  res.send(`
    <h1>User Information</h1>
    <table>
      <tr><td>Username:</td><td>${user.username}</td></tr>
      <tr><td>Name:</td><td>${user.name}</td></tr>
      <tr><td>Age:</td><td>${user.age}</td></tr>
    </table>
    <a href="/logout">Logout</a>
  `);
});

app.get('/logout', (req, res) => 
{
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');

const bcrypt = require('bcrypt');

const mysql = require('mysql2');

const path = require('path');

const ejs = require("ejs");

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'mohammedshraj',
    password: 'root123',
    database: 'authentication'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
});

const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )
`;

db.query(createUserTableQuery, err => {
    if (err) throw err;
    console.log('Users table created or already exists');
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/', (req, res) => {
    res.send('Welcome to the authentication app');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], 
    async (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            res.send('User not found');
        } else {
            const match = await bcrypt.compare(password, result[0].password);
            if (match) {
                req.session.userId = result[0].id;
                res.redirect('/user');
            } else {
                res.send('Incorrect password');
            }
        }
    });
});

const requireLogin = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};



app.get('/user', requireLogin, (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.session.userId], (err, result) => {
        if (err) throw err;
        const user = result[0];
        res.render('user', { user }); 
        
    });
});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

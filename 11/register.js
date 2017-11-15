const express = require('express');
const database = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');

const db = database.createConnection({
    host: '10.0.2.2',
    user: 'root',
    password: 'teachphp',
    database: 'web2'
});

const http = express();
http.use(bodyParser.urlencoded({ extended: false }))
http.use(bodyParser.json())


http.set('view engine', 'ejs');
http.set('views', 'views');

http.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: true
}));

http.get('/', (req, res) => {
    res.render('login_register');
});

http.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const password_verify = req.body.password_verify;

    if (password == password_verify) {
        db.query('insert into users(username, password) values(?, sha1(?))', [username, password], function(err, results, fields) {
            res.redirect('/');
        });
    }
});

http.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('select * from users where username=? and password=sha1(?)', [username, password], function(err, results, fields) {
        if (results.length == 1)
            res.send('access granted');
        else
            res.send('access denied');
    });
});

http.listen(3000, () => {
    console.log('listen to 3000...');
});

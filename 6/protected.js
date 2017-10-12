const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const http = express();

http.set('view engine', 'ejs');
http.set('views', 'views');

http.use(session({
	secret: 'rahasia',
	resave: false,
	saveUninitialized: true
}));

http.use(bodyParser.urlencoded({extended: false}));
http.use(bodyParser.json());

http.get('/', (req, res) => {
    if (! req.session.user) {
        res.redirect('/login');
    } else {
        res.render('protected', {user: req.session.user})
    }
});

http.get('/login', (req, res) => {
    res.render('login', {message: null});
});

http.post('/login', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;

    if (password !== 'rahasia' || user === '')
        res.render('login', {message: 'Access denied!'});
    else {
        req.session.user = user; 
        res.redirect('/');
    }
});

http.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

http.listen(3000, () => {
    console.log('listening on 3000...');
});

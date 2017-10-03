const express = require('express');
const bodyParser = require('body-parser');
const http = express();

// konfigurasi template engine
http.set('views', './views'); // lokasi directory template engine
http.set('view engine', 'ejs'); // set template engine menggunakan pug

// konfigurasi body parser
http.use(bodyParser.urlencoded({extended: false}));
http.use(bodyParser.json());

// routing handlers
function index(req, res) {
	res.render('index', {nama: req.params.nama});
}

http.get('/form', (req, res) => {
    res.render('form');
});

http.post('/form', (req, res) => {
    var data = req.body;
    if (data.hobi !== undefined)
        data.hobi = Array.isArray(data.hobi) ? data.hobi : [data.hobi];
    else
        data.hobi = [];

    res.render('hasil_form', data);
});

http.get('/register', (req, res) => {
	res.render('register');
});

http.post('/register', (req, res) => {
    var user = req.body.user;
    var email = req.body.email;
    var password = req.body.password;

    //res.render('register_success', {username: user, email: email});
    res.redirect('/' + user);
});

http.get('/:nama', index);
http.get('/', (req, res) => { 
	//req.params['nama'] = 'world'; index(req, res);
	res.redirect('/world');
});

http.listen(3000, () => {
	console.log("Listening to port 3000");
});

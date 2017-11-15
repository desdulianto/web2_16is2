const express = require('express');
const database = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');

// membuka koneksi ke database/atau buat baru
// const db = new database('country.db');
const db = database.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'teachphp',
    database: 'web2'
});

const http = express();

http.set('view engine', 'ejs');
http.set('views', 'views');

http.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: true
}))

function dbQuery(db, query, params) {
    const promise = new Promise(function(resolve, reject) {
        db.query(query, params, function(err, results, fields) {
            if (err)
                reject(err);
            else
                resolve(results, fields);
        });
    });
    return promise;
}


http.use(bodyParser.urlencoded({ extended: false }))
http.use(bodyParser.json())

http.use((req, res, next) => {
    if (! req.session.flash)
        req.session.flash = [];

    next();
});

const n = 2;

http.get('/', (req, res) => {
    // pagination
    const page = parseInt(req.query.page ? req.query.page : 1);

    // hitung page
    var total = 0;

    dbQuery(db, 'select count(*) total from country').then((results, fields) => {
        total = results[0]['total'];
    });

    var rows = [];
    dbQuery(db, 'select * from country limit ? offset ?', [n, (page-1)*n])
    .then((results, fields) => {
            rows = results;
            res.render('country', {countries: rows, flash: req.session.flash, pagination: {page: page, total_pages: Math.floor(total/n, 1), prev_page: page > 1 ? page-1 : null, next_page: page < Math.floor(total/n, 1) ? page+1: null}});
    })
    .catch(err => {
        res.send('error');
        console.log(err);
    });
});

http.get('/saring', (req, res) => {
    var query = 'select * from country';
    var params = [];
    if (req.query.saring) {
        var query = 'select * from country where lower(name) like "%" || ? || "%" or lower(capital) like "%" || ? || "%"';
        var params = [req.query.saring.toLowerCase(), req.query.saring.toLowerCase()];
    }

    dbQuery(db, query, params).then((results, fields) => {
        res.render('country', {countries: results, flash: req.session.flash, pagination: null});
    });
});

http.post('/', (req, res) => {
    const name = req.body.name;
    const capital = req.body.capital;

    dbQuery(db, 'insert into country(name, capital) values(?, ?)', [name, capital])
	.then((results, fields) => {
	    req.session.flash.push({message: 'Data country berhasil ditambah',
				    class: 'success'});

	    res.redirect('/');
	});
});

http.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    dbQuery(db, 'delete from country where id=?', [id])
	.then((results, fields) => {
	    req.session.flash.push({message: 'Data country berhasil dihapus',
		    class: 'warning'});
	    res.redirect('/');
	});
});

http.get('/update/:id', (req, res) => {
    const id = req.params.id;

    dbQuery(db, 'select * from country where id=?', [id])
	.then((results, fields) => {
		if (results.length >= 1)
			res.render('update', {country: results[0]});
		else
			res.status(404).send('Country ' + id + ' not found');
	});
});

http.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const capital = req.body.capital;

    dbQuery(db, 'update country set name=?, capital=? where id=?', [name, capital, id])
	.then((results, fields) => {
	    req.session.flash.push({message: 'Data country berhasil diupdate',
				    class: 'success'});
	    res.redirect('/');

	});
});

http.listen(3000, () => {
    console.log('listening on 3000...');
});

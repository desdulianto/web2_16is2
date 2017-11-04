const express = require('express');
const database = require('better-sqlite3');
const bodyParser = require('body-parser');
const session = require('express-session');

// membuka koneksi ke database/atau buat baru
const db = new database('country.db');

const http = express();

http.set('view engine', 'ejs');
http.set('views', 'views');

http.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: true
}))


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
    const total = db.prepare('select count(*) total from country').get();

    const rows = db.prepare('select * from country limit ? offset ?')
        .all(n, (page-1)*n);

    res.render('country', {countries: rows, flash: req.session.flash,
        pagination: {page: page, total_pages: Math.floor(total.total/n, 1), prev_page: page > 1 ? page-1 : null,
        next_page: page < Math.floor(total.total/n, 1) ? page+1: null}});
});

http.get('/saring', (req, res) => {
    const rows = req.query.saring ? db.prepare('select * from country where lower(name) like "%" || ? || "%" or lower(capital) like "%" || ? || "%"').all(req.query.saring.toLowerCase(), req.query.saring.toLowerCase()) : db.prepare('select * from country').all();

    res.render('country', {countries: rows, flash: req.session.flash, pagination: null});
});

http.post('/', (req, res) => {
    const name = req.body.name;
    const capital = req.body.capital;

    db.prepare('insert into country(name, capital) values(:name,:capital)')
        .run({name: name, capital: capital});

    req.session.flash.push({message: 'Data country berhasil ditambah',
                            class: 'success'});

    res.redirect('/');
});

http.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.prepare('delete from country where id=?').run(id);

    req.session.flash.push({message: 'Data country berhasil dihapus',
            class: 'warning'});
    res.redirect('/');
});

http.get('/update/:id', (req, res) => {
    const id = req.params.id;
    const country = db.prepare('select * from country where id=?').get(id);

    if (country)
        res.render('update', {country: country});
    else
        res.status(404).send('Country ' + id + ' not found');
});

http.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const capital = req.body.capital;

    db.prepare('update country set name=?, capital=? where id=?')
        .run(name, capital, id);
    
    req.session.flash.push({message: 'Data country berhasil diupdate',
                            class: 'success'});
    res.redirect('/');
});

http.listen(3000, () => {
    console.log('listening on 3000...');
});

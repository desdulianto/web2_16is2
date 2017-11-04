const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const database = require('better-sqlite3');

const http = express();

http.use(bodyParser.urlencoded({ extended: false }))
http.use(bodyParser.json())

http.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: true
}))

http.set('view engine', 'ejs');
http.set('views', 'views');

// prepare db connection
const db = new database('todo.db');

// initialize flash message session storage
http.use((req, res, next) => {
    if (req.session.flash === undefined) {
        console.log('initialize flash storage');
        req.session.flash = [];
    }
    next();
});

http.get('/', (req, res) => {
    const rows = db.prepare('select * from todo').all();
    res.render('index', {rows: rows, session: req.session});
});

http.post('/', (req, res) => {
    if (req.body.todo !== undefined) {
        const todo = req.body.todo;

        const result = db.prepare('insert into todo(todo) values(?)').run(todo);

        req.session.flash.push({message: 'New to do added!'});

        res.redirect('/');
    }
});

http.get('/hapus/:id', (req, res) => {
    const id = req.params.id;

    const result = db.prepare('delete from todo where id=:id').run({id: id});

    req.session.flash.push({message: 'To do id ' + id + ' deleted!'});

    res.redirect('/');
});

http.get('/done/:id', (req, res) => {
    const id = req.params.id;

    const result = db.prepare('update todo set done = not done where id=:id')
                    .run({id: id});

    req.session.flash.push({message: 'To do id ' + id + ' done/undone!'});

    res.redirect('/');
});

http.listen(3000, () => {
    console.log('listening on 3000...');
});

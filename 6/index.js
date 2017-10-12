const express = require('express');
const session = require('express-session');

const http = express()

http.use(session({
	secret: 'rahasia',
	resave: false,
	saveUninitialized: true
}));

http.get('/', (req, res) => {
    var count = req.session.count ? req.session.count : 0;

    count++;
    req.session.count = count;
    res.send('You\'ve been visiting this site ' + count + ' time(s)');
});

http.get('/clear', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

http.listen(3000, () => {
	console.log('listening on 3000...');
});

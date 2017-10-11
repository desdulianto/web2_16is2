const express = require('express');
var cookieParser = require('cookie-parser');

const http = express();
http.use(cookieParser('secret'));

http.get('/', (req, res) => {
    var count = 0;
    if (req.cookies.count !== undefined) {
        count = req.cookies.count;
    }
    count++;

    // set cookie to client
    res.cookie('count', count, {maxAge: Date.now() + 60, signed: false});
    if (count === 1)
        res.send('Hello, this is your first visit');
    else
        res.send('Hello, this is you ' + count + ' visit');
});

http.get('/clear', (req, res) => {
    res.clearCookie('count');
    res.redirect('/')
});

http.listen(3000, () => {
    console.log('Listen on 3000...');
});

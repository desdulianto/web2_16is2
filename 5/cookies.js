const express = require('express');
const cookieParser = require('cookie-parser');
const http = express();

// daftarkan middleware cookie parser
http.use(cookieParser());

http.get('/', (req, res) => {
    var count = req.cookies.count;
    if (count === undefined)
        count = 1
    else
        count++

    res.cookie('count', count, {maxAge: Date.now() + 60})
    res.send('cookie.count = ' + count);
});

http.get('/clear', (req, res) => {
    res.clearCookie('count');
    res.redirect('/');
});

http.listen(3000, () => {
    console.log('listen to 3000...')
});

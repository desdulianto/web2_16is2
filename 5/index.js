const express = require('express');
const http = express();

http.set('view engine', 'ejs');
http.set('views', 'views');

const home = require('./routes/home');
const about = require('./routes/about');
const products = require('./routes/products');

// mount router
http.use('/', home);
http.use('/about', about);
http.use('/products', products);

// middleware untuk yang not found
http.use((req, res, next) => {
    console.log('Page 404: ' + req.baseUrl);
    res.status(404).send('<h1>404: Page not found</h1>');
});

// middleware untuk handle runtim exception/internal server error
http.use((err, req, res, next) => {
    console.error(err);
    if (err.hasOwnProperty('status') && err.status === 404) {
        res.status(404).send('<h1>' + err.message + '</h1>');
    } else {
        res.status(500).send('<h1>500: Internal Server Error</h1>');
    }
});

http.listen(3000, () => {
    console.log('Listening on :3000...');
});

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

http.listen(3000, () => {
    console.log('Listening on :3000...');
});

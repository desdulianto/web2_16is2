const express = require('express');

const http = express();


/** parsing authorization header
 * kembalikan object { user, password } jika berhasil
 * null jika gagal */
function parseAuthorizationHeader(header) {
    try {
        const userpass = new Buffer(header.split(' ')[1], 'base64')
            .toString('ascii');
        const user = userpass.split(':')[0];
        const password = userpass.split(':')[1];

        return {user: user, password: password};
    } catch (err) {
        console.error(err);
        return null;
    }
}

// paksa user untuk login, jika login gagal tampilan halaman
// forbidden
http.use((req, res, next) => {
    if (! req.get('Authorization')) {
        res.set('WWW-Authenticate', 'Basic realm="Protected Site"');
        res.status(401).send('Unauthorized');
    } else {
        const auth = parseAuthorizationHeader(req.get('Authorization'));
        if (auth === null)
            res.status(400).send('Bad Request!')
        else {
            if (auth.user === 'testing' && auth.password === 'rahasia')
                next();
            else
                res.status(403).send('Access Denied');
        }
    }
});

http.get('/', (req, res) => {
    res.send('protected content');
});

http.get('/profile', (req, res) => {
    res.send('profile page');
});

http.get('/gallery', (req, res) => {
    res.send('gallery page');
});

http.listen(3000, () => {
    console.log('Listening on 3000...');
});

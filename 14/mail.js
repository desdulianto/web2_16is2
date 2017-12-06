const express = require('express');
const mailer = require('express-mailer');
const bodyParser = require('body-parser');
const config = require('./config.js');

const http = express();
http.use(bodyParser.urlencoded({ extended: false }));

http.set('view engine', 'ejs');
http.set('views', 'views');

// configure mailer
mailer.extend(http, {
    from: config.EMAIL_FROM,
    host: config.EMAIL_HOST,
    secureConnection: true,
    port: config.EMAIL_PORT,
    transportMethod: 'SMTP',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD
    }
});


http.get('/', (req, res) => {
    res.render('index');
});

http.post('/', (req, res) => {
    const to = req.body.to;
    const subject = req.body.subject;
    const name = req.body.name;
    const message = req.body.message;

    http.mailer.send('email', {
        to: to,
        subject: subject,
        name: name,
        message: message,
    }, function (err) {
        if (err) {
            console.log(err)
            res.status(500).send(err);
        } else {
            res.send('Email sent to ' + to);
        }
    });
});

http.listen(3000, () => {
    console.log('listening on 3000...');
});

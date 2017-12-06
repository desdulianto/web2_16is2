const express = require('express');
const mailer = require('express-mailer');

const http = express();

mailer.extend(http, {
    from: 'descobacoba@gmail.com',
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    transportMethod: 'SMTP',
    auth: {
        user: 'descobacoba@gmail.com',
        pass: 'lagicobacoba1'
    }
});

http.set('view engine', 'ejs');
http.set('views', 'views');

http.mailer.send('email1', {
    to: 'desdulianto@gmail.com',
    subject: 'Test Email',
    otherProperty: 'other property'
    }, function(err) {
        console.log(err);
    });

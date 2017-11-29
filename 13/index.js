const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');

const http = express();

http.set('view engine', 'ejs');
http.set('views', 'views');
http.use(cookieParser());
http.use(bodyParser.urlencoded({ extended: false }));


const csrfToken = csrf({cookie: true});
http.use(csrfToken);

// connect to mongodb
const ObjectId = require('mongoose').Types.ObjectId;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/country', {useMongoClient: true});
const db = mongoose.connection;
const countrySchema = mongoose.Schema({
    name: String,
    capital: String
});

const Country = mongoose.model('Country', countrySchema);

http.get('/', csrfToken, (req, res) => {
	Country.find({}, (error, results) => {
		if (error)
			res.status(500).send(error);
		else {
			res.render('country', {countries: results, csrfToken: req.csrfToken()});
		}
	});
});

http.post('/', csrfToken, (req, res) => {
    const country = new Country({name: req.body.name, capital: req.body.capital});
    country.save(error => {
        if (error)
            res.status(500).send(error);
        else
            res.redirect('/');
    });
});

http.get('/edit/:id', (req, res) => {
    Country.findOne({_id: new ObjectId(req.params.id)}, (error, country) => {
        if (error) res.status(500).send(error);
        if (country === null) res.status(404).send('Not Found');
        res.render('edit', {country: country});
    });
});

http.post('/edit/:id', (req, res) => {
    Country.findByIdAndUpdate(ObjectId(req.params.id),
        {$set: {name: req.body.name, capital: req.body.capital}},
        (error, country) => {
        res.redirect('/');
    });
});

http.get('/hapus/:id', (req, res) => {
    Country.findOne({_id: new ObjectId(req.params.id)}, function (error, country) {
        if (error) res.status(500).send(error);
        else if (country === null) res.status(404).send('Not Found');
        else res.render('hapus', {country: country});
    });
});

http.post('/hapus/:id', (req, res) => {
    Country.findByIdAndRemove(req.params.id, function (error) {
        if (error) res.status(500).send(error);
        else res.redirect('/');
    });
});

http.listen(3000, () => {
	console.log('listening on 3000...');
});

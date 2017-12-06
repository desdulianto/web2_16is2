const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const http = express();

http.use(bodyParser.urlencoded({ extended: false }));


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

/*http.use('/api/', (req, res, next) => {
    if (not_valid(res.cookie.api_key))
        res.status(403).end({message: 'Not Authorized'})
    else next();
});*/

http.get('/api/', (req, res) => {
	Country.find({}, (error, results) => {
		if (error)
			res.status(500).send(error);
		else {
            res.send(results);
		}
	});
});

http.post('/api/', (req, res) => {
    const country = new Country({name: req.body.name, capital: req.body.capital});
    country.save(error => {
        if (error)
            res.status(500).send({message: error});
        else
            res.status(201).end();
    });
});

http.get('/api/:id', (req, res) => {
    Country.findOne({_id: new ObjectId(req.params.id)}, (error, country) => {
        if (error) res.status(500).send({message: error});
        if (country === null) res.status(404).send({message: 'Not Found'});
        res.send(country);
    });
});

http.put('/api/:id', (req, res) => {
    Country.findByIdAndUpdate(ObjectId(req.params.id),
        {$set: {name: req.body.name, capital: req.body.capital}},
        (error, country) => {
        if (error) res.status(500).send({message: error});
        else res.status(200).send(country);
    });
});

http.delete('/api/:id', (req, res) => {
    Country.findByIdAndRemove(req.params.id, function (error) {
        if (error) res.status(500).send({message: error});
        else res.status(204).end();
    });
});

http.use('/', express.static('static'));

http.listen(3000, () => {
	console.log('listening on 3000...');
});

const express = require('express');
const http = express();

http.set('view engine', 'ejs');
http.set('views', '');

const countries = [
    {name: 'Indonesia', capital: 'Jakarta', continent: 'Asia'},
    {name: 'Malaysia', capital: 'Kuala Lumpur', continent: 'Asia'},
    {name: 'Egypt', capital: 'Cairo', continent: 'Africa'},
    {name: 'England', capital: 'London', continent: 'Europe'},
    {name: 'South Africa', capital: 'Capetown', continent: 'Africa'},
    {name: 'France', capital: 'Paris', continent: 'Europe'},
    {name: 'Australia', capital: 'Canberra', continent: 'Australia'},
    {name: 'Brazil', capital: 'Brasilia', continent: 'America'}
];

http.get('/', (req, res) => {
    res.render('countries', {countries: countries});
});

http.get('/:continent', (req, res) => {
    res.render('countries', {countries: countries.filter(x => { 
        return x.continent === req.params.continent })
    })
});

http.listen(3000, () => {
    console.log('listening on 3000...');
});

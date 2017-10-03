const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const products = [ {label: "Computer", link: req.baseUrl + "/computer"},
                     {label: "HP", link: req.baseUrl + "/hp"}];
    res.render('products/index', {items: products});
});

router.get('/:category', (req, res) => {
    const category = req.params.category;
    const url = req.baseUrl + '/' + category + '/';
    const items = {computer: [ {label: 'Asus ROG', link: url + 'asus-rog'},
                                {label: 'Acer Aspire', link: url + 'acer-aspire'} ],
                   hp: [ {label: 'Apple', link: url + 'apple'},
                          {label: 'Xiaomi', link: url + 'xiaomi'} ]};
    res.render('products/index', {items: items[category]});
});

router.get('/:category/:product', (req, res) => {
    const category = req.params.category;
    const product = req.params.product;
    const items = {computer: {'asus-rog': {merek: 'ASUS', model: 'ROG', harga: 15000000},
                              'acer-aspire': {merek: 'ACER', model: 'Aspire', harga: 10000000}},
                   hp: {apple: {merek: 'APPLE', model: 'X', harga: 20000000},
                        xiaomi: {merek: 'XIAOMI', model: 'REDMI', harga: 2000000}}}
    res.render('products/product', {product: items[category][product]});
});

module.exports = router

const express = require('express');
const router = express.Router();

function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}

router.get('/', (req, res) => {
    const products = [ {label: "Computer", link: req.baseUrl + "/computer"},
                     {label: "HP", link: req.baseUrl + "/hp"}];
    res.render('products/index', {items: products});
});

router.get('/:category', (req, res, next) => {
    const category = req.params.category;
    const url = req.baseUrl + '/' + category + '/';
    const items = {computer: [ {label: 'Asus ROG', link: url + 'asus-rog'},
                                {label: 'Acer Aspire', link: url + 'acer-aspire'} ],
                   hp: [ {label: 'Apple', link: url + 'apple'},
                          {label: 'Xiaomi', link: url + 'xiaomi'} ]};
    if (! items.hasOwnProperty(category) )
        return next({message: 'Product category ' + category + ' not found', status: 404})
    else
        res.render('products/index', {items: items[category]});
});

router.get('/:category/:product', (req, res, next) => {
    const category = req.params.category;
    const product = req.params.product;
    const items = {computer: {'asus-rog': {merek: 'ASUS', model: 'ROG', harga: 15000000},
                              'acer-aspire': {merek: 'ACER', model: 'Aspire', harga: 10000000}},
                   hp: {apple: {merek: 'APPLE', model: 'X', harga: 20000000},
                        xiaomi: {merek: 'XIAOMI', model: 'REDMI', harga: 2000000}}}
    if (! items.hasOwnProperty(category) || ! items[category].hasOwnProperty(product))
        return next({message: 'Product ' + product + ' not found in category ' + category, status: 404})
    else {
        if (product === 'apple')
            return next({message: 'cannot process this product', status: 500})
        else
            res.render('products/product', {product: items[category][product]});
    }
});

module.exports = router

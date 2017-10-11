const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('about', {content: 'About us'});
});

router.get('/location', (req, res) => {
    res.render('about', {content: 'Our location'});
});

router.get('/history', (req, res) => {
    res.render('about', {content: 'Our history'});
});

module.exports = router

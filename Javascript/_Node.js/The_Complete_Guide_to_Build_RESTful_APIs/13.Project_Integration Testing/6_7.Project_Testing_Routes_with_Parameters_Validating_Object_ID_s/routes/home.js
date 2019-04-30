const express = require('express');
/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'My App', message: 'Home' });
});

module.exports = router;

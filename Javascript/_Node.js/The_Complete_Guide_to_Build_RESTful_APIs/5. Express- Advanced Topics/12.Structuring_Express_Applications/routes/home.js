const express = require('express');
/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = express.Router();

// GET Requets
// --------------------------------
router.get('/', function(req, res) {
    // res.send('This is root page');
    // using pug ->
    res.render('index', { title: 'My Express App', message: 'Hello' });
});

module.exports = router;

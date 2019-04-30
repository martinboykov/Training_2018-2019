const express = require('express');
/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: 'My nodejs-restfull-apis application',
    message: 'Home Page',
  });
});

module.exports = router;

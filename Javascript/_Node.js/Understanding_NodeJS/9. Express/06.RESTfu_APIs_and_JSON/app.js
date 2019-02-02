const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
// MIDDLEWARE
// use static files for all requests
app.use('/assets', express.static(__dirname + '/public'));

// use functionality for all requests
app.use('/', function(req, res, next) {
    console.log('Request Url: ' + req.url);
    next();
});

// TEMPLATES ENGINES
app.set('view engine', 'ejs');

// RESTFul API
app.get('/api/person/:id', function(req, res) {
    // get that data from db
    // res.json({ firstname: 'John', lastname: 'Doe' });
});

app.post('/api/person', jsonParser, function(req, res) {
    //save to db
});

app.delete('api/person/:id', function(req, res) {
    // delete from db
});

app.listen(port);

// NOT TO BE RUNNED

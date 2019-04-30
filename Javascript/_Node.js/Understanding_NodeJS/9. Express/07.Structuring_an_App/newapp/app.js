const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const apiController = require('./controllers/apiController');


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
apiController(app);

app.listen(port);

// NOT TO BE RUNNED!!!!

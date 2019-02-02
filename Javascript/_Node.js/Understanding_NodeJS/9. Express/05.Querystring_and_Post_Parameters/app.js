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


//QUERRY STRINGS AND POST PARAMS
//using get (retrieving the data ydirectley from url)
app.get('/animal/:name', function(req, res) {

    res.render('animal', { NAME: req.params.name, Qstr: req.query.qstr }); // it looks inside "view" folder by default
    // and searches the type of template engine (hier it is ejs)
});

//using post (and middleware body-parser to parse the body of the post)
app.post('/dog', urlencodedParser, function(req, res) {
    // urlencodedParser is the first callback (middleware), then
    // comes the func(req,res), same as middleware with use

    res.send('This is ' + req.body.age + ' years old ' + req.body.type + '.')
    console.log(req.body.age, req.body.type);
});
app.post('/dogjson', jsonParser, function(req, res) {

    res.send('This is ' + req.body.age + ' years old ' + req.body.type + '.')
    console.log(req.body.age, req.body.type);
});

// BASICS
app.get('/', function(req, res) {
    res.render('index'); // it looks inside "view" folder by default
    // and searches the type of template engine (hier it is ejs)
});

app.get('/main', function(req, res) {
    let dataStream = [];
    fs.createReadStream(__dirname + '/index.html', 'utf8')
        .on('data', (chunk) => {
            dataStream.push(chunk);
        }).on('end', () => {
            res.send(dataStream.toString().replace('{Message}', 'Hello'));
        });
});

app.get('/api', function(req, res) {
    const obj = {
        firstname: 'John',
        secondname: 'Doe',
    };
    res.json(obj);
});

app.get('/person/:id', function(req, res) {
    let dataStream = [];
    fs.createReadStream(__dirname + '/person.html', 'utf8')
        .on('data', (chunk) => {
            dataStream.push(chunk);
        }).on('end', () => {
            res.send(dataStream.toString().replace('{Message}', req.params.id));
        });
});


app.listen(port);

/* global __dirname */
/* eslint-disable no-console */
const express = require('express');

const app = express(); // create an app

// add midleware
app.use(express.static(__dirname + '/public')); // '/public

// express.static() - takes the absolute path to the folder you want to serve up


// set http rout handlers
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.send({
        name: 'Andrew',
        likes: [
            'Biking',
            'Camoing',
        ],
    });
});

app.get('/about', (req, res) => {// second variable is optional (function callback)
    res.send('About Page!');
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to handle the Request',
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});


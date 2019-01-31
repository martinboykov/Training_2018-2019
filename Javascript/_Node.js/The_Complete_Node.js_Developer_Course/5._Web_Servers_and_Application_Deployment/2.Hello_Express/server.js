const express = require('express');

const app = express(); // create an app

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

app.get('/about', (req, res) => {
    res.send('About Page!');
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to handle the Request',
    });
});

app.listen(3001);


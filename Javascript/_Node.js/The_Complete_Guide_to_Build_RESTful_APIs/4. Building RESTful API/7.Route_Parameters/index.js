const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('This is root page');
});

app.get('/api/courses', function(req, res) {
    // res.send(`This is ${req.url} page`);
    res.send([1, 2, 3]);
});

// Reading Params
// exmpl.1
app.get('/api/posts/:id', function(req, res) {
    res.send(`This is page of post №${req.params.id}`);
});
// exmpl.2
app.get('/api/posts/:year/:month', function(req, res) {
    // res.send(req.params)
    res.send(`This is page for posts from ${req.params.month} ${req.params.year}`);
});
// exmpl.3 query string
app.get('/api/posts/:year/:month/:day', function(req, res) {
    res.send(req.query);
});


// PORT
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});

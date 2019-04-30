const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('This is root page');
});

app.get('/api/courses', function(req, res) {
    // res.send(`This is ${req.url} page`);
    res.send([1, 2, 3]);
});


// PORT
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});

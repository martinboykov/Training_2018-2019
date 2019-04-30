const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('This is root pagess');
});

app.get('/api/courses', function(req, res) {
    // res.send(`This is ${req.url} page`);
    res.send([1, 2, 3]);
});

app.listen(3000, function() {
    console.log('Listening on posdasrt 3000...');
});

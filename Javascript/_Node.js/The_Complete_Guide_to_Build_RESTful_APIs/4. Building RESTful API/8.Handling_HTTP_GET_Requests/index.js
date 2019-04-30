const express = require('express');
const app = express();
const courses = [
    { id: 1, name: 'course#1' },
    { id: 2, name: 'course#2' },
    { id: 3, name: 'course#3' },
];
app.get('/', function(req, res) {
    res.send('This is root page');
});

app.get('/api/courses', function(req, res) {
    res.send(courses);
});

app.get('/api/courses/:id', function(req, res) {
    console.log(parseInt(req.params.id, 10));
    const course = courses[parseInt(req.params.id, 10) - 1];
    if (!course) {
        res.status(404);
        res.send(`The course with the given
        id=${req.params.id} was not found!`);
    } else {
        res.send(course);
    }
});

// PORT
/* eslint-disable no-process-env */
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});

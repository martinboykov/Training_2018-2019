
const express = require('express');
const app = express();
const Joi = require('joi'); // Joi, as it returns Class

// adding middleware
app.use(express.json());


const courses = [
    { id: 1, name: 'course#1' },
    { id: 2, name: 'course#2' },
    { id: 3, name: 'course#3' },
];

// GET Requets
// ----------------------------------------------------
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

// POST Requets
// ----------------------------------------------------
app.post('/api/courses', function(req, res) {
    // if (!req.body.name || req.body.name.length < 3) {
    //     // as convention -> 400 status Bad request
    //     res.status(400);
    //     res.send('Name is required and should be minimum 3 characters');
    //     return; // return , so the rest of func is not executed
    // }

    // USING JOI package for validation:
    const shema = {
        name: Joi.string().min(3).required(),
    };
    const validation = Joi.validate(req.body, shema);
    // console.log(validation);
    if (validation.error) {
        res.status(400);
        // res.send(validation.error);
        res.send(validation.error.details[0].message);
        return; // return , so the rest of func is not executed
    }
    // --------------------------------
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    console.log(req.body.name);
    courses.push(course);
    res.send(course);
});

// PUT Requets
// ----------------------------------------------------
app.put('/api/courses/:id', function(req, res) {
    // 1. Look up the course
    const idRequested = parseInt(req.params.id, 10);
    const course = courses.find(function(c) {
        return c.id === idRequested;
    });
    // 1.1. If not valid -> 404
    if (!course) {
        res.status(404);
        res.send(`The course with the given
        id=${req.params.id} was not found!`);
        return; // return , so the rest of func is not executed
    }

    // 2. Validate
    // here we use function validateCourseWithJoi() for a change
    const { error } = validateCourseWithJoi(req.body);
    // 2.1. If invalid, return 400 - Bad request
    // USING JOI package for validation:
    if (error) {
        res.status(400);
        // res.send(validation.error);
        res.send(error.details[0].message);
        return; // return , so the rest of func is not executed
    }

    // 3. Update the course
    course.name = req.body.name;
    // 3.1. Return the updated course
    res.send(course);
});

// PORT
/* eslint-disable no-process-env */
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});


function validateCourseWithJoi(course) {
    const shema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(course, shema);
}

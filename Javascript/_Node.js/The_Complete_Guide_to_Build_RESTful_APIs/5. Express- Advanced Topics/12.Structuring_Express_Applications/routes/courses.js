const express = require('express');
const router = express.Router();
const Joi = require('joi'); // Joi, as it returns Class
const courses = [
    { id: 1, name: 'course#1' },
    { id: 2, name: 'course#2' },
    { id: 3, name: 'course#3' },
];

router.get('/', function(req, res) {
    res.send(courses);
});

router.get('/:id', function(req, res) {
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
// --------------------------------
router.post('/', function(req, res) {
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

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

// PUT Requets
// --------------------------------
router.put('/api/courses/:id', function(req, res) {
    // 1. Look up the course
    const idRequested = parseInt(req.params.id, 10);
    const course = courses.find(function(c) {
        return c.id === idRequested;
    });
    // 1.1. If not valid -> 404
    if (!course) {
        res.status(404);
        res.send(`The course with the given id=${req.params.id} was not
        found!`);
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

// DELETE Requets
// --------------------------------
router.delete('/api/courses/:id', function(req, res) {
    // 1. Look up the courses data
    const idRequested = parseInt(req.params.id, 10);
    const course = courses.find(function(c) {
        return c.id === idRequested;
    });
    console.log(course);
    // 1.1. If not existing, return 404
    if (!course) {
        res.status(404);
        res.send(`The course with the given
        id = ${ req.params.id} was not found!`);
        return; // return , so the rest of func is not executed
    }
    // 2. Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    // 3. Return deleted course
    res.send(course);
});

function validateCourseWithJoi(course) {
    const shema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(course, shema);
}


module.exports = router;

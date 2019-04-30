const express = require('express');
/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = express.Router();
const Joi = require('joi'); // returns class Joi

// DATABASE
// -------------------------------------
// -------------------------------------
const genres = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Romans' }];

// GET
// -------------------------------------
router.get('/', function(req, res) {
    res.send(genres);
});

router.get('/:id', function(req, res) {
    const index = genres.findIndex(function(g) {
        return parseInt(req.params.id, 10) === g.id;
    });
    if (index < 0) {
        return res.status(404).send('No such genre!');
    }
    return res.send(genres[index]);
});

// POST
// -------------------------------------
router.post('/', function(req, res) {
    const body = req.body;
    const { error } = validateDataWithJoi(body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }
    body.id = genres.length + 1;
    genres.push(body);
    return res.send(body);
});

// PUT
// -------------------------------------
router.put('/:id', function(req, res) {
    // checking if such id (genre) exist
    const index = genres.findIndex(function(g) {
        return parseInt(req.params.id, 10) === g.id;
    });
    if (index < 0) {
        return res.status(404).send('No such genre!');
    }
    // validate update
    const body = req.body;
    const { error } = validateDataWithJoi(body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }
    genres[index].name = body.name;
    return res.send(genres[index]);
});

// DELETE
// -------------------------------------
router.delete('/:id', function(req, res) {
    const index = genres.findIndex(function(g) {
        return parseInt(req.params.id, 10) === g.id;
    });
    if (index < 0) {
        return res.status(404).send('No such genre!');
    }
    const deleted = (genres.splice(index, 1))[0];
    return res.send(`${JSON.stringify(deleted)} was deleted from Database!`);
});


// CUSTOM FUNCTIONS
// -------------------------------------
function validateDataWithJoi(newGenre) {
    const schema = Joi.object().keys({
        name: Joi.string().required().min(3),
    });
    return Joi.validate(newGenre, schema);
}

module.exports = { genres: router, db: genres };

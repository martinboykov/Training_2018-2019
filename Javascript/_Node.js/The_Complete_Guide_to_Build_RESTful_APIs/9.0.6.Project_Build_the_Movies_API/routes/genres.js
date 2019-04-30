const express = require('express');
/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = express.Router();

// DATABASE/ CUSTOM FUNCTIONS
// -------------------------------------
// -------------------------------------
const { Genre } = require('../models/genre');
const { validateWithJoi } = require('../helpers/joi_validation');


// GET
// -------------------------------------
router.get('/', async (req, res) => {
    let genres;
    try {
        genres = await Genre.find().sort('name');
    } catch (error) {
        console.log(error.message);
    }
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    let genre;
    try {
        genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404)
                .send('The genre with the given ID was not found.');
        }
    } catch (error) {
        console.log(error.message);
    }
    return res.send(genre);
});

// POST
// -------------------------------------
router.post('/', async (req, res) => {
    let genre;
    try {
        const { error } = validateWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        genre = new Genre({ name: req.body.name });
        genre = await genre.save();
    } catch (error) {
        console.log(error.message);
    }
    return res.send(genre);
});


// PUT
// -------------------------------------
router.put('/:id', async (req, res) => {
    let genre;
    try {
        const { error } = validateWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        genre = await Genre.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true });
        if (!genre) {
            return res.status(404)
                .send('The genre with the given ID was not found.');
        }
    } catch (error) {
        console.log(error.message);
    }
    return res.send(genre);
});

// DELETE
// -------------------------------------
router.delete('/:id', async (req, res) => {
    let genre;
    try {
        genre = await Genre.findByIdAndRemove(req.params.id);
        if (!genre) {
            return res.status(404)
                .send('The genre with the given ID was not found.');
        }
    } catch (error) {
        console.log(error.message);
    }
    return res.send(genre);
});

module.exports = { genres: router };

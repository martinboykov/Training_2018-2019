const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const { Movie } = require('../models/movie');
const { Genre } = require('../models/genre');
const { validateMovieWithJoi } = require('../helpers/joi_validation');

router.get('/', async function(req, res) {
    let movies;
    try {
        movies = await Movie.find().sort({ name: 1 });
    } catch (error) {
        console.log(error.message);
    }
    return res.send(movies);
});

router.get('/:id', async function(req, res) {
    let movie;
    try {
        movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(400).send('No such movie.');
    } catch (error) {
        console.log(error.message);
    }
    return res.send(movie);
});

router.post('/', async function(req, res) {
    let movie;
    try {
        const { error } = validateMovieWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findOne({ name: req.body.genre.name });
        if (!genre) return res.status(400).send('No such genre.');

        const genreId = genre._id;
        movie = new Movie({
            title: req.body.title,
            genre: {
                name: req.body.genre.name,
                _id: genreId,
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        });
        movie = await movie.save();
    } catch (error) {
        console.log(error.message);
    }
    return res.send(movie);
});

router.put('/:id', async function(req, res) {
    let movie;
    try {
        const { error } = validateMovieWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(400).send('No such movie.');
        // direct approach
        // await Movie.update({ _id: req.params.id },
        // { $set: { title: req.body.title } });
        // movie = await Movie.findById(req.params.id);
        movie.title = req.body.title;
        movie = await movie.save();
    } catch (error) {
        console.log(error.message);
    }
    return res.send(movie);
});

router.delete('/:id', async function(req, res) {
    let movie;
    try {
        movie = await Movie.findByIdAndRemove(req.params.id);
        if (!movie) return res.status(400).send('No such movie.');
    } catch (error) {
        console.log(error.message);
    }
    return res.send(movie);
});


module.exports = { movies: router };

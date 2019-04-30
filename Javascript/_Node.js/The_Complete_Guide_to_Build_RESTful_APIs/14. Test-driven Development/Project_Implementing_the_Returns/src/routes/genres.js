const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const { Genre } = require('../models/genre');
const { validateWithJoi } = require('../helpers/joi_validation');
const validateObjectId = require('../middleware/validate.ObjectId');


// GET
// -------------------------------------
router.get('/', async function(req, res, next) {
  // next is for error middleware
  try {
    const genres = await Genre.find().sort('name');
    return res.send(genres);
  } catch (ex) {
    return next(ex);
  }
});

router.get('/:id', validateObjectId, async function(req, res, next) {
  // next is for error middleware
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404)
          .send('The genre with the given ID was not found.');
    }
    return res.send(genre);
  } catch (ex) {
    return next(ex);
  }
});

// POST
// -------------------------------------
router.post('/', auth, async function(req, res, next) {
  // next is for error middleware
  let genre;
  try {
    const { error } = validateWithJoi(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    genre = new Genre({ name: req.body.name });
    genre = await genre.save();
  } catch (ex) {
    return next(ex);
  }
  return res.send(genre);
});


// PUT
// -------------------------------------
router.put('/:id', auth, async function(req, res, next) {
  // next is for error middleware
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
  } catch (ex) {
    return next(ex);
  }
  return res.send(genre);
});

// DELETE
// -------------------------------------
// router.delete('/:id', auth, admin, async (req, res) => {
// same as [auth, admin]
router.delete('/:id', [auth, admin], async function(req, res, next) {
  // next is for error middleware
  let genre;
  try {
    genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) {
      return res.status(404)
          .send('The genre with the given ID was not found.');
    }
  } catch (ex) {
    return next(ex);
  }
  return res.send(genre);
});

module.exports = { genres: router };

/* eslint-disable no-process-env*/

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const path = require('path');

const mongoose = require('mongoose');

const Post = require('./models/post');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://martinboykov:abcd995511@cluster0-vqnid.mongodb.net/test', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB database...'))
  .catch(() => console.log('Connection to MongoDB failed!'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token');
  next();
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form> // not needed here

app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;

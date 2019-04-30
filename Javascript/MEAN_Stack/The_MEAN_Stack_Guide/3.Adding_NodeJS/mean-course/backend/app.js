/* eslint-disable no-process-env*/

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

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

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'fasdadasd1e3e31',
      title: 'First Post',
      content: 'Some text coming from the server!',
    },
    {
      id: 'fasdadasd1e3e32',
      title: 'Second Post',
      content: 'Some text coming from the server!',
    },
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts,
  });
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully', // not neccessary
  });
});

module.exports = app;

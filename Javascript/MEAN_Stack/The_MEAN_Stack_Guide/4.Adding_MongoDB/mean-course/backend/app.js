/* eslint-disable no-process-env*/

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Post = require('./models/post');

mongoose.connect('mongodb+srv://martinboykov:abcd995511@cluster0-vqnid.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB database...'))
  .catch(() => console.log('Connection to MongoDB failed!'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form> // not needed here

app.get('/api/posts', async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts,
  });
});

app.post('/api/posts', async (req, res, next) => {
  const post = new Post({ // mongo driver adds _id behind the scene,  before it is saved to MongoDB
    title: req.body.title,
    content: req.body.content,
  });
  await post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully', // not neccessary
    postId: post._id,
  });
});

app.delete('/api/posts/:id', async (req, res, next) => {
  console.log(req.params);
  const postId = req.params.id;
  const post = await Post.deleteOne({ _id: postId });
  // const post = await Post.findByIdAndDelete(postId); // same
  if (!post) res.status(400).send('No such post.');
  else res.status(200).json({ message: 'Post deleted successfully', post: post });
});

module.exports = app;

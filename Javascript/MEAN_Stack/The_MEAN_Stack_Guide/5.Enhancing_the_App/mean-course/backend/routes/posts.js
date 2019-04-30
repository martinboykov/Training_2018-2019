/* eslint new-cap: ["error", { "capIsNew": false }]*/
const express = require('express');

const router = express.Router();

const Post = require('../models/post');

router.get('/', async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts,
  });
});

router.get('/:id', async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) res.status(404).json({ message: 'Post not found!' });
  else {
    res.status(200).json({
      message: 'Post found!',
      post: post,
    });
  }
});

router.post('/', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
  const post = new Post({
    _id: req.body.id, // we must specify the _id, so it doent get overwritten with new one (cant-> error)
    title: req.body.title,
    content: req.body.content,
  });
  const updatedPost = await Post.updateOne(
    { _id: req.params.id }, post);

  // const updatedPost = await Post.updateOne( // same as above
  //   { _id: req.params.id },
  //   {
  //     $set: {
  //       title: req.body.title,
  //       content: req.body.content,
  //     },
  //   });
  res.status(201).json({
    message: 'Post updated successfully', // not neccessary
    updatedPost: updatedPost,
  });
});

router.delete('/:id', async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.deleteOne({ _id: postId });
  // const post = await Post.findByIdAndDelete(postId); // same
  if (!post) res.status(400).send('No such post.');

  else res.status(200).json({ message: 'Post deleted successfully', post: post });
});

module.exports = router;

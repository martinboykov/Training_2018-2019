/* eslint new-cap: ["error", { "capIsNew": false }]*/
const express = require('express');

const router = express.Router();

const Post = require('../models/post');

const deleteFile = require('../util/file').deleteFile;

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};
const multer = require('multer');
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) error = null;
    cb(error, 'backend/images'); // the path is relative to the path where server.js file is stored
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extension);
    // cb(null, new Date().toJSON().slice(0, 23).replace(/[-:./]/g, '_') + '_' + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });

// 'image' is the same name as the name of input field name="image" in edit(add)-product.ejs


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


// with upload image middleware
router.post('/', upload.single('image'), async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({ // mongo driver adds _id behind the scene,  before it is saved to MongoDB
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename, // req.file.filename is provided by multer
  });
  const createdPost = await post.save();
  console.log(createdPost);
  res.status(201).json({
    message: 'Post added successfully', // not neccessary
    post: {
      ...post, // next gen js
      id: post._id,
    },
    // post: {
    //   id: post._id,
    //   title: post.title,
    //   content: post.content,
    //   imagePath: post.imagePath,
    // },
  });
});

router.put('/:id', upload.single('image'), async (req, res, next) => {
  let imagePath;
  let updatedPost;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
    const product = await Post.findById(req.params.id);
    console.log(product);
    // console.log(product.imagePath.split(url)[1]);
    deleteFile(__dirname + '../' + '../' + product.imagePath.split(url)[1]);
    console.log('Old image succesfully deleted!');
  } else {
    imagePath = req.body.imagePath;
  }

  try {
    // const post = new Post({ // mongo driver adds _id behind the scene,  before it is saved to MongoDB
    //   title: req.body.title,
    //   content: req.body.content,
    //   imagePath: imagePath, // req.file.filename is provided by multer
    // });
    // updatedPost = await Post.updateOne(
    //   { _id: req.params.id }, post);
    updatedPost = await Post.updateOne( // same as above
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          imagePath: imagePath,
        },
      });
  } catch (error) {
    console.log(error);
  }

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

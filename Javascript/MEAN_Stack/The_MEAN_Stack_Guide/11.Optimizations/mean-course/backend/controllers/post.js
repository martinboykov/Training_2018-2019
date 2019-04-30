const Post = require('../models/post');

const deleteImage = require('../middleware/file').deleteImage;

const getPosts = async (req, res, next) => {
  console.log(req.query);
  const pageSize = parseInt(req.query.pageSize, 10);
  const currentPage = parseInt(req.query.page, 10);
  const postQuery = Post.find();
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  const posts = await postQuery;
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts,
  });
};

const getPostsTotalCount = async (req, res, next) => {
  const postsCount = await Post.countDocuments();
  console.log(postsCount);
  res.status(200).json({
    message: 'Total posts count fetched successfully',
    postsCount: postsCount,
  });
};

const getPostById = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) res.status(404).json({ message: 'Post not found!' });
  else {
    res.status(200).json({
      message: 'Post found!',
      post: post,
    });
  }
};

const postPost = async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({ // mongo driver adds _id behind the scene,  before it is saved to MongoDB
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename, // req.file.filename is provided by multer
    creator: req.user._id,
  });
  try {
    const createdPost = await post.save();
    console.log(createdPost);
    res.status(201).json({
      message: 'Post added successfully', // not neccessary
      post: {
        ...post, // next gen js
        id: post._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Creating a post failed!',
    });
  }
};

const putPost = async (req, res, next) => {
  let imagePath;
  let updatedPost;
  try {
    // throw Error; // --> for Error handling in front end (teting)

    if (req.file) { // if we change the img
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename;
      // const post = await Post.findById(req.params.id);
      // console.log(post);
      // console.log(post.imagePath.split(url)[1]);
      deleteImage(__dirname + '../' + '../' + req.post.imagePath.split(url)[1]);
      console.log('Old image succesfully deleted!');
    } else { // if img stays the same
      imagePath = req.body.imagePath;
    }

    updatedPost = await Post.updateOne( // same as above
      { _id: req.params.id, creator: req.user._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          imagePath: imagePath,
        },
      });
    res.status(201).json({
      message: 'Post updated successfully', // not neccessary
      updatedPost: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: 'The update of the post failed!',
    });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const url = req.protocol + '://' + req.get('host');
    // throw Error; // --> for Error handling in front end (teting)
    const post = await Post.deleteOne({ _id: postId });
    // const post = await Post.findByIdAndDelete(postId); // same
    if (!post) {
      res.status(400).json({ messge: 'No such post.' });
    } else {
      // console.log(imagePath.split(url)[1]);
      deleteImage(__dirname + '../' + '../' + req.post.imagePath.split(url)[1]);
      res.status(200).json({ message: 'Post deleted successfully', post: post });
    }
  } catch (error) {
    res.status(500).json({
      message: 'The deletion of the post failed!',
    });
  }
};


module.exports = {
  getPosts,
  getPostsTotalCount,
  getPostById,
  postPost,
  putPost,
  deletePost,
};

const Post = require('../models/post');
// AUTHORIZATION DELETE UPDATE POST
async function authUD(req, res, next) {
  try {
    console.log(req.params.id);
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    console.log('----post-----');
    console.log(post);
    console.log('---------');
    console.log('----post.creatorId ?== userId-----');
    console.log(post.creator.toString() === userId.toString());
    if (post.creator.toString() !== userId.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Access denied. Unouthorized actions!' });
    }
    return next();
  } catch (error) {
    return res.status(400).send('Access denied!');
  }
}

module.exports = authUD;

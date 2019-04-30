/* eslint new-cap: ["error", { "capIsNew": false }]*/
const express = require('express');

const router = express.Router();

const postController = require('../controllers/post');

const auth = require('../middleware/auth');

const authUD = require('../middleware/authUD');

// const uploadImage = require('../middleware/file').uploadImage;
const uploadImg = require('../middleware/image').uploadImg;


// 'image' is the same name as the name of input field name="image" in edit(add)-product.ejs
router.get('/', postController.getPosts);

router.get('/totalCount', postController.getPostsTotalCount);

router.get('/:id', postController.getPostById);

// img upload on aws s3 bucket
router.post('/', auth, uploadImg, postController.postPost);
router.put('/:id', auth, authUD, uploadImg, postController.putPost);
router.delete('/:id', auth, authUD, postController.deletePost);

module.exports = router;

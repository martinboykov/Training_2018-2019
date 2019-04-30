const posts = [];

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: posts,
    });
};

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const id = new Date().toISOString();
    const newPost = { id: id, title: title, content: content };
    posts.push(newPost);
    // Create post in db
    res.status(201).json({ // 201 - Success! Recourse was created!
        message: 'Post created successfully!',
        post: newPost,
    });
};

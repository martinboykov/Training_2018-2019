const User = require('../models/user').User;
const bcrypt = require('bcrypt');

const postSignup = async (req, res, next) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
  });
  console.log(user);
  // Encrypting the password bofore saving to db
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user = await user.save();
    res.status(201).json({
      message: 'User created',
      data: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    // res.status(500).json({
    //   error: error,
    // });

    // if we use our own error messages
    res.status(500).json({
      message: 'Invalid authentication credentials',
    });
    console.log(error);
  }
};

const postLogin = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status('404').json({
      message: 'Authentication failed',
    });
  }
  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password);
  if (!validPassword) {
    return res.status(400).json({
      message: 'Invalid email or password.',
    });
  }
  const token = user.generateAuthToken();
  console.log(`${user.name} logged in successfuly`);
  return res.status(200).json({
    message: 'Login was successful.',
    token: token,
    expiresIn: 3600,
    userId: user._id,
  });
};

module.exports = {
  postSignup,
  postLogin,
};

// Checks if authorized before any CRUD operation, requiring auth.
const jwt = require('jsonwebtoken');
const config = require('config');

// AUTHORIZATION
function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  // checking if token is valid
  try {
    // https://www.npmjs.com/package/jsonwebtoken
    // jwt.verify(token, secretOrPublicKey, [options, callback])
    // decoded payload -> gives us the object we send when
    // registering/signing-in -> with generateAuthToken() in models/user.js
    // in our case only the _id
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(400).send('Invalid token.');
  }
}

module.exports = auth;

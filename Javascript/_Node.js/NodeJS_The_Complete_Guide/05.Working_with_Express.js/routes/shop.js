const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

// app.use([path,] callback [, callback...])
router.get('/', (req, res, next) => {
  console.log('/ middleware');
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;

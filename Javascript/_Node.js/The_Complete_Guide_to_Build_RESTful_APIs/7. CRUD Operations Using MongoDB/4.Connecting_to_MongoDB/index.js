const mongoose = require('mongoose');


// path(url) should come from config file
// same as with express
const path = 'mongodb://localhost/playground';

// returns a promise
mongoose.connect(`${path}`)
  .then(function() {
    console.log('Connected to ModgoDB...');
    // here we can use debug(), the same as with express server
  })
  .catch((err) => console.log('Could not connect to MongoDB'));

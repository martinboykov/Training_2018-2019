const path = require('path');
const express = require('express');
const app = express(); // express() === http.createServer(...);
const bodyParser = require('body-parser');
const port = 3000;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error.controller');

const mongoConnect = require('./util/database').mongoConnect;
const getDb = require('./util/database').getDb;
const User = require('./models/user.model');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const user = await User.findById('5bf5c7f0a298a3362c80a74a');
  req.user = new User(user.username, user.email, user.cart, user._id); // storing user to every request
  next();
});

// routes
app.use('/admin', adminRoutes); // if starts with /admin, trigger adminRoutes

app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(async () => {
  const users = await User.getAll();
  if (users.length === 0) {
    const user = new User('test', 'test@test');
    user.save();
  }
  app.listen(port, () => console.log(`Server listening on port ${port}!`));
});


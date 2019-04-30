const path = require('path');
const express = require('express');
const app = express(); // express() === http.createServer(...);
const bodyParser = require('body-parser');
const port = 3000;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error.controller');

const mongoose = require('mongoose');

const User = require('./models/user.model').User;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    const user = await User.findOne();
    req.user = user; // storing user to every request
    next();
});

// routes
app.use('/admin', adminRoutes); // if starts with /admin, trigger adminRoutes

app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://martinboykov:abcd995511@nodejsmongotest-h6qbj.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(async (connection) => {
        // console.log(connection);
        const users = await User.find();
        if (users.length === 0) {
            const user = new User({
                username: 'Martin',
                email: 'test@tets',
                cart: {
                    items: [],
                    totalPrice: 0.000000000001,
                },
            });
            user.save();
            console.log(user);
        }
        console.log('Connected to MongoDB...');
        app.listen(port, () => console.log(`Server listening on port ${port}!`));
    })
    .catch((err) => console.log(err));

// mongoConnect(async () => {
//   const users = await User.getAll();
//   if (users.length === 0) {
//     const user = new User('test', 'test@test');
//     user.save();
//   }
//   app.listen(port, () => console.log(`Server listening on port ${port}!`));
// });


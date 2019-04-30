const path = require('path');
const express = require('express');
const app = express(); // express() === http.createServer(...);
const bodyParser = require('body-parser');
const port = 3000;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error.controller');

const sequelize = require('./util/database');
const Product = require('./models/product.model');
const User = require('./models/user.model');
const Cart = require('./models/cart.model');
const CartItem = require('./models/cart-item.model');
const Order = require('./models/order.model');
const OrderItem = require('./models/order-item.model');


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const user = await User.findByPk(1);
  req.user = user; // storing user to every request
  next();
});

// routes
app.use('/admin', adminRoutes); // if starts with /admin, trigger adminRoutes

app.use(shopRoutes);

app.use(errorController.get404);

// Associations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // not nessesary as one connection - User.hasOne(Cart); is enough
User.hasOne(Cart);
Cart.belongsTo(User); // not nessesary as one connection - User.hasOne(Cart); is enough
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem }); // through -> where to store it
User.hasMany(Order);
Order.belongsTo(User); // not nessesary as one connection - User.hasOne(Cart); is enough
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem }); // through -> where to store it

sequelize.sync() // in Production
//  sequelize.sync({ force: true }) // in Development only (when huge changes => want to overwrite all)
  .then(
    (result) => {
      return User.findByPk(1);
      // console.log(result);
    })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Martin', email: 'test@test.com' });
    }
    return Promise.resolve(user);
  })
  .then(async (user) => {
    // console.log(user);
    let cart = await Cart.findAll({ where: { userId: user.id } });
    if (cart.length === 0) {
      cart = await user.createCart();
    }
    app.listen(port, () => console.log(`Server listening on port ${port}!`));
  })
  .catch(
    (err) => {
      console.log(err);
    }
  );

// app.listen(port, () => console.log(`Server listening on port ${port}!`));

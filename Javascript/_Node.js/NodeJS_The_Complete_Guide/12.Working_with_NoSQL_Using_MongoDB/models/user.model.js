const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;
class User {
  constructor(username, email, cart, _id) {
    this.username = username;
    this.email = email;
    this.cart = cart || { 'items': [], 'totalPrice': 0.00000000000001 };
    this._id = _id || new ObjectID();
  }

  async save() {
    const db = getDb();
    const user = await db.collection('users').insertOne(this);
    console.log('Created new User!');
    console.log(user);
  }

  static async getAll() {
    const db = getDb();
    const users = await db.collection('users').find().sort({ username: 1 }).toArray();
    // console.log(users);
    return users;
  }

  static async findById(id) {
    const db = getDb();
    const objectID = new mongodb.ObjectID(id);
    const user = await db.collection('users').findOne({ '_id': objectID });
    // console.log(user);
    return user;
  }
  async getCart() {
    const db = getDb();
    const user = await db.collection('users').findOne({ '_id': (new ObjectID(this._id)) });
    const cart = user.cart;
    return cart;
  }
  async addToCart(prodId) {
    console.log(prodId);
    const db = getDb();
    const objectIDProduct = new ObjectID(prodId);
    const product = await db.collection('products').findOne({ '_id': (new ObjectID(prodId)) });
    let index;
    const sameProductInCart = this.cart.items.find((item, i) => {
      index = i;
      console.log((item.prodId).toString(), prodId);
      return (item.prodId).toString() === prodId;
    });

    if (sameProductInCart) {
      this.cart.items[index].qty += 1;
    } else {
      this.cart.items.push({ prodId: objectIDProduct, price: product.price, title: product.title, qty: 1 });
    }
    this.cart.totalPrice = Math.round(this.cart.totalPrice + product.price * 100) / 100;

    const updatedUser = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectID(this._id) },
      {
        $set: { cart: this.cart },
      }
    );
    // console.log(updatedUser);
    console.log('User updated!');
  }

  async deleteFromCart(prodId) {
    console.log(prodId);
    const db = getDb();
    const objectIDProduct = new ObjectID(prodId);
    let index;
    const productToDelete = this.cart.items.find((item, i) => {
      index = i;
      console.log((item.prodId).toString(), prodId);
      return (item.prodId).toString() === prodId;
    });
    if (productToDelete) {
      this.cart.totalPrice -= productToDelete.price * productToDelete.qty;
      this.cart.items.splice(index, 1);
      const updatedUser = await db.collection('users').findOneAndUpdate(
        { _id: new ObjectID(this._id) },
        {
          $set: { cart: this.cart },
        }
      );
      // console.log(updatedUser);
      console.log('Product Deleted From Cart!');
    }
  }

  async addOrder() {
    const db = getDb();
    const cart = await this.getCart();
    const order = await db.collection('orders')
      .insertOne({
        items: cart.items,
        totalPrice: cart.totalPrice,
        user: {
          _id: new ObjectID(this._id),
          name: this.name,
          email: this.email,
        },
      });
    this.cart = { 'items': [], 'totalPrice': 0 };
    const updatedUser = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectID(this._id) },
      {
        $set: { cart: { items: [], totalPrice: 0 } },
      }
    );
  }

  async getOrders() {
    const db = getDb();
    let orders;
    orders = await db.collection('orders').find({ 'user._id': new ObjectID(this._id) }).toArray();
    if (orders.length === 0) {
      orders = [];
    }
    console.log(orders);
    return orders;
  }
}

module.exports = User;

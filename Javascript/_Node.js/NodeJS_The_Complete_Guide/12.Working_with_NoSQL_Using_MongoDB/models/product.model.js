const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl || '../img/book-1228040_640.png';
    this.userId = userId;
  }

  async save() {
    const db = getDb();
    const product = await db.collection('products').insertOne(this);
    console.log('Created new Product!');
    // console.log(product);
  }

  static async getAll() {
    const db = getDb();
    const products = await db.collection('products').find().sort({ title: 1 }).toArray();
    console.log('Products recieved!');
    // console.log(products);
    return products;
  }

  static async findById(id) {
    const db = getDb();
    const objectID = new mongodb.ObjectID(id);
    const product = await db.collection('products').findOne({ '_id': objectID });
    // console.log(product);
    console.log('Product found');
    return product;
  }

  static async updateOne(id, updatedData) {
    const db = getDb();
    const objectID = new mongodb.ObjectID(id);
    const updatedProduct = await db.collection('products').findOneAndUpdate(
      { '_id': objectID },
      {
        $set: { ...updatedData },
      }
    );
    console.log('Product updated!');
    // console.log(updatedProduct);
  }

  static async deleteOne(id, user) {
    const db = getDb();
    const objectID = new mongodb.ObjectID(id);
    const deletedProduct = await db.collection('products')
      .findOneAndDelete(
        { '_id': objectID }
      );
    await user.deleteFromCart(id);
    console.log('Product deleted!');
    // console.log(deletedProduct);
  }
}

module.exports = Product;


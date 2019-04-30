const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;


// const fs = require('fs');

// const path = require('path');

// const rootDir = require('../util/path');

// const cartsPath = path.join(rootDir, 'db', 'cart.json');

// function getAll() {
//   return new Promise((resolve) => {
//     fs.readFile(cartsPath, (err, fileContent) => {
//       if (fileContent.toJSON().data[0]) {
//         resolve(JSON.parse(fileContent));
//       } else {
//         resolve({ products: [], totalPrice: 0 });
//       }
//     });
//   });
// }

// class Cart {
//   static getAllProdudcts() {
//     return getAll();
//   }

//   static getProductById(id) {
//     return new Promise((resolve) => {
//       getAll().then((data) => {
//         if (data.products.length > 0) {
//           const products = data.products;
//           let index;
//           const productFound = products.find((product, i) => {
//             index = i;
//             return product.id === id;
//           });
//           if (productFound) {
//             resolve({ productFound, index });
//           } else {
//             resolve(null);
//           }
//         } else {
//           resolve(null);
//         }
//       });
//     });
//   }

//   static deleteProduct(index, price) {
//     getAll()
//       .then((cart) => {
//         console.log(index);
//         const deleteProductTotalPrice = cart.products[index].qty * price;
//         cart.totalPrice -= deleteProductTotalPrice;
//         cart.products.splice(index, 1);
//         return new Promise((resolve) => {
//           fs.writeFile(cartsPath, JSON.stringify(cart), (error) => {
//             resolve();
//           });
//         });
//       });
//   }

//   static addProduct(id, productPrice) {
//     // fetch the previous cart
//     const promiseReadFile = new Promise((resolve) => {
//       fs.readFile(cartsPath, (err, fileContent) => {
//         if (fileContent.toJSON().data[0]) {
//           resolve(JSON.parse(fileContent));
//         } else {
//           resolve({ products: [], totalPrice: 0 });
//         }
//       });
//     });
//     promiseReadFile.then((cart) => {
//       // analyze the cart => find existing
//       const existingProductIndex = cart.products.findIndex((p) => p.id === id);
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = existingProduct.qty + 1;
//         updatedProduct.price = productPrice;
//         updatedProduct.totalPrice = productPrice * updatedProduct.qty;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = {
//           id: id, qty: 1,
//           price: productPrice,
//           totalPrice: productPrice,
//         };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice = cart.totalPrice + +productPrice;

//       const promiseWriteFile = new Promise((resolve) => {
//         fs.writeFile(cartsPath, JSON.stringify(cart), (err) => {
//           console.log(err);
//           resolve();
//         });
//       });
//       promiseWriteFile.then(() => {
//         console.log('done');
//       });
//     });
//   }
// }

// module.exports = Cart;

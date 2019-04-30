const fs = require('fs');

const path = require('path');

const rootDir = require('../util/path');

const productsPath = path.join(rootDir, 'db', 'products.json');

const db = require('../util/database');


const getAll = () => {
  return new Promise((resolve) => {
    db.execute('SELECT * FROM products')
      .then((data) => {
        const products = data[0];
        if (products) {
          resolve(products);
        } else {
          resolve([]);
        }
      });
  });
};

const getById = async (_id) => {
  const id = parseInt(_id, 10);
  return new Promise((resolve) => {
    db.execute('SELECT * FROM products WHERE products.id = ?', [id])
      .then((data) => {
        const product = data[0][0];
        if (product) {
          resolve(product);
        } else {
          resolve(null);
        }
      });
  });

  // try {
  //   const products = await getAll();
  //   return new Promise((resolve) => {
  //     if (products) {
  //       console.log(products[0]);
  //       console.log(products[0].id);
  //       let index;
  //       const productFound = products.find((product, i) => {
  //         index = i;
  //         return product.id === id;
  //       });
  //       console.log(productFound);
  //       if (productFound) {
  //         resolve({ productFound, index });
  //       } else {
  //         resolve(null);
  //       }
  //     } else {
  //       resolve(null);
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return error;
  // }
};

const add = async (newProduct) => {
  try {
    const products = await getAll();
    products.push(newProduct);
    return new Promise((resolve) => {
      db.execute(
        'INSERT INTO products (title, price, description, imageUrl) VALUES (?,?,?,?)',
        [
          newProduct.title,
          newProduct.price,
          newProduct.description,
          newProduct.imageUrl,
        ]
      );
      resolve();
      // fs.writeFile(productsPath, JSON.stringify(products), (error) => {
      //   resolve();
      // });
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const edit = async (index, newProduct) => {
  try {
    const products = await getAll();
    products.splice(index, 1, newProduct);
    return new Promise((resolve) => {
      fs.writeFile(productsPath, JSON.stringify(products), (error) => {
        resolve();
      });
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteProduct = async (index) => {
  try {
    const products = await getAll();
    products.splice(index, 1);
    return new Promise((resolve) => {
      fs.writeFile(productsPath, JSON.stringify(products), (error) => {
        resolve();
      });
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { getAll, getById, add, edit, deleteProduct };

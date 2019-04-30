const fs = require('fs');

const path = require('path');

const rootDir = require('../util/path');

const productsPath = path.join(rootDir, 'db', 'products.json');

const getAll = () => {
  // products = JSON.parse(fs.readFileSync(productsPath));
  return new Promise((resolve) => {
    fs.readFile(productsPath, 'utf8', (err, fileContent) => {
      if (fileContent) {
        resolve(JSON.parse(fileContent));
      } else {
        resolve([]);
      }
    });
  });
};

const getById = (id) => {
  // products = JSON.parse(fs.readFileSync(productsPath));
  return new Promise((resolve) => {
    fs.readFile(productsPath, 'utf8', (err, fileContent) => {
      if (fileContent) {
        let index;
        const productFound = JSON.parse(fileContent).find((product, i) => {
          index = i;
          return product.id === id;
        });
        console.log(productFound);
        if (productFound) {
          resolve({ productFound, index });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
};

const add = async (newProduct) => {
  try {
    const products = await getAll();
    products.push(newProduct);
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

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

module.exports = { getAll, add };

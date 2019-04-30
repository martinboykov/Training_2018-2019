// const mysql = require('mysql2');

// // creatin connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejs-complete',
//   password: '995511',
// });

// module.exports = pool.promise();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'nodejs_sequalize',
  'root',
  '995511',
  {
    dialect: 'mysql',
    host: 'localhost',
    operatorsAliases: Sequelize.Op,
  });

module.exports = sequelize;

const mysql = require('mysql2');

// creatin connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejs-complete',
  password: '995511',
});

module.exports = pool.promise();

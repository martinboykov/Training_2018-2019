const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://martinboykov:abcd995511@nodejsmongotest-h6qbj.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
  )
    .then((client) => {
      console.log('MongoDb connected...');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error('No database found');
};

module.exports = { mongoConnect, getDb };

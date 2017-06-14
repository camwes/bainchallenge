let API         = require('./lib/API.js');
let MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://admin:bainchallenge@ds111882.mlab.com:11882/bain', (err, db) => {
  console.log('connected to database.')
  return new API(db);
});

let express     = require('express');
let bodyParser  = require('body-parser');
let http        = require('http');
let immutable   = require('immutable');
let parse       = require('csv-parse');
let MongoClient = require('mongodb').MongoClient
let fs          = require('fs');
let path        = require('path');
let csvPath     = path.join(__dirname, './bain.csv')
let app         = express();
let database;

app.use(express['static'](path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017/bain', (err, db) => {
  database = db;
  let server = http.createServer(app);
  server.listen(8000);
})

app.get('/providers', (req, res) => {
  let filters = {
    $and: []
  };
  for (var queryKey in req.query) {
    let queryValue = req.query[queryKey];
    let newFilter = {};
    switch (queryKey) {
      case "max_discharges":
        newFilter['Total Discharges'] = {
          $lte: ++queryValue
        }

        break;
      case "min_discharges":
        newFilter['Total Discharges'] = {
          $gte: ++queryValue
        }

        break;
      case "max_average_covered_charges":
        newFilter['Average Covered Charges'] = {
          $lte: ++queryValue
        }

        break;
      case "min_average_covered_charges":
        newFilter['Average Covered Charges'] = {
          $gte: ++queryValue
        }

        break;
      case "min_average_medicare_payments":
        newFilter['Average Medicare Payments'] = {
          $gt: ++queryValue
        }

        break;
      case "max_average_medicare_payments":
        newFilter['Average Medicare Payments'] = {
          $lte: ++queryValue
        }

        break;
      case "state":
        newFilter['Provider State'] = {
          $eq: queryValue
        }

        break;
      default:

    }
    if (Object.keys(newFilter).length > 0) {
      filters.$and.push(newFilter);
    }
  }

  let providers = database.collection('providers').find(filters).toArray((err, results) => {
    console.log(results);
    res.send(results)
    // send HTML file populated with quotes here
  })
})

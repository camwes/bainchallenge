let express     = require('express');
let bodyParser  = require('body-parser');
let http        = require('http');
let app         = express();
let server      = http.createServer(app);
let cache       = {}

function API(database) {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/providers', (req, res) => {
    if (cache[req.originalUrl]) {
      return res.json(cache[req.originalUrl])
    }
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

    if (filters.$and.length > 0) {
      return database.collection('providers').find(filters).toArray((err, results) => {
        cache[req.originalUrl] = results;
        res.json(results)
      })
    } else {
      return database.collection('providers').find().toArray((err, results) => {
        cache[req.originalUrl] = results;
        res.json(results)
      })
    }
  });

  console.log('server started.');
  return server.listen(8000);
}

module.exports = API;

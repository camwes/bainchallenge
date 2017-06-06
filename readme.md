# Import [csv data](https://docs.mongodb.com/manual/reference/program/mongoimport/#csv-import) to mongodb
`mongoimport --db bain --collection providers --type csv --headerline --file ./static/bain.csv`
# Convert strings to numbers for dollar values
```js
database.collection('providers').find().forEach((data) => {
  if (typeof data['Average Total Payments'] === 'string') {
    database.collection('providers').update({
      "_id": data._id,
    }, {
      "$set": {
        "Average Total Payments": Number(data['Average Total Payments'].replace(/[^0-9\.]+/g, ""))
      }
    });
  }
})
````

# Visit http://localhost:8000/providers?max_average_covered_charges=50000&min_average_covered_charges=40000&min_average_medicare_payments=6000&max_average_medicare_payments=10000&state=GA
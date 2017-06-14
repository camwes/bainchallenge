# [Bain Queryable API](https://bain-test.herokuapp.com/providers)
In approaching this project I knew that returning JSON would be easiest if being retrieved from a JSON database. Since the data was provided in csv, I would also need to do some conversion. Both of these factors quickly lead me to mongodb.
So, I implemented the API in node.js w/ mongodb as a datastore. I [imported](https://docs.mongodb.com/manual/reference/program/mongoimport/#csv-import) the csv to mongo like this:

`mongoimport --db bain --collection providers --type csv --headerline --file ./static/bain.csv`

I also needed to update the original data because the total payments were in strings like "$100.00". In order to properly compare I needed to update the entries  to be numbers:

```
// Convert strings to numbers for dollar values
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
```
I did extensive testing to insure that the query params worked and wrote a few test cases that just hit the deployed app and determines if the results match what's expected. The tests can be executed in the repo with `npm test`.

I also assume that when querying this database speed was important. I soon found that returning all the providers took a while, especially the first time around. As a result, I implemented a simple cache on the URLs to try and help performance. With more time I would certainly focus on optimizing this performance and probably switch to something like Redis. For the sake of speed and given the simplicity of this APIs requirements Redis could probably suffice as the lone datastore.

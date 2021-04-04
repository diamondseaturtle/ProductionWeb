const ReadPreference = require("mongodb").ReadPreference;
const ListItem = require("./mongoModel");
var SiteViewUp = require("./mongoVisitIncre");
const siteCounter = require("./mongoModelVisits");

require("./mongoConnect").connect();

// Find all list items from the nearest instance of Cosmos MongoDB
function get(req, res, next) {
  const docquery = ListItem.find({})
    .sort({ time: -1 })
    .read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(listItems => {
      res.json(listItems);
    })
    .catch(next);
}

// Post a new listItem to the ListItem collection in Cosmos MongoDB
function create(req, res, next) {
  var ts = Date.now();
  const listItem = new ListItem({ text: req.body.text, time: ts, author: req.body.author });
  listItem
    .save()
    .then(() => {
      res.json(listItem);
    })
    .catch(next);
}

// Remove a listItem from the ListItem collection in Cosmos MongoDB
function destroy(req, res, next) {
  const { _id } = req.params;

  ListItem.findByIdAndDelete(_id)
    .then(listItem => {
      res.json(listItem);
    })
    .catch(next);
}

function getAndUpdateCounter(req, res, next) {
  SiteViewUp.siteViewup();
  siteCounter.findById('603c7ee41f065d34dc94bb58')
  .then(data => {
    console.log(data.counter);
    res.json(data)
  })
  .catch(next);
}
module.exports = { get, create, destroy, getAndUpdateCounter};

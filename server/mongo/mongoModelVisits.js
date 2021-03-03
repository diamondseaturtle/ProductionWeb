const mongoose = require("mongoose");
const schema = mongoose.Schema;
const CONSTANTS = require("../constants");

// TODO Web Template Studio: The Cosmos Mongo Database is set up to hold a collection called ListItems which contains documents
// with the following schema. Define your own schema for the Cosmos MongoDB using mongoose (https://mongoosejs.com/docs/index.html).
const visitSchema = new schema({counter: {type: Number, required: true}});
const Visits = mongoose.model('VisitCounter', visitSchema, 'Visits');
module.exports = Visits;

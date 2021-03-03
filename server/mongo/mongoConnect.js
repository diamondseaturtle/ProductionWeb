const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

// Connects the back end to the Cosmos Mongo Database (https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-mongoose)
function connect() {
  mongoose
    .connect('mongodb://diamondseaturtlemdb:sUuQr05S3DvsVXlzvz4Lqx6ehSr1FE2KZXpMTkTfk2swKRdMePQ8M7UUCPJzzMzK0132zKqB9pwS1LB40AlKXw==@diamondseaturtlemdb.documents.azure.com:10255/diamondseaturtlemdb?ssl=true&replicaSet=globaldb',
    {useNewUrlParser: true})
    .then(() => console.log("Connection to CosmosDB successful"))
    .catch(err => console.error(err));
}
module.exports = { connect, mongoose };

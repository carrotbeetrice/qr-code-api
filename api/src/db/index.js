const mongoose = require("mongoose");
const { mongo } = require("../config");

const connectToDB = () => {
  mongoose.connect(mongo.conString, {
    dbName: mongo.name,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "Error connecting to MongoDB"));
  db.once("open", function () {
    console.log("Connected to MongoDB successfully");
  });
};

module.exports = connectToDB;

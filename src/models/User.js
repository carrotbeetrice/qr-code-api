const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  uuid: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const customers = model("User", userSchema, "User");

module.exports = customers;

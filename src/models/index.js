const { Schema, SchemaTypes, model } = require("mongoose");

const UserSchema = new Schema({
  // firstName: String,
  // lastName: String,
  email: String,
  password: String,
});

const QRDataSchema = new Schema({
  title: { type: String, required: true, unique: true },
  data: { type: String, required: true },
  uploadedBy: { type: SchemaTypes.ObjectId, required: true },
});

const UserModel = model("User", UserSchema, "User");
const QRDataModel = model("QRData", QRDataSchema, "QRData");

module.exports = {
  UserModel,
  QRDataModel,
};

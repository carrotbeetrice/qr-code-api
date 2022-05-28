const { Schema, SchemaTypes, model } = require("mongoose");

const UserSchema = new Schema({
  email: String,
  password: String,
});

const QRDataSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    data: { type: SchemaTypes.Mixed, required: true },
    uploadedBy: { type: SchemaTypes.ObjectId, ref: "User", required: true },
    updatedBy: { type: SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema, "User");
const QRDataModel = model("QRData", QRDataSchema, "QRData");

module.exports = {
  UserModel,
  QRDataModel,
};

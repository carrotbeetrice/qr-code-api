const { UserModel, QRDataModel } = require("../models");
const { Types } = require("mongoose");

module.exports = {
  userQueries: {
    login: async (email, password) => {
      const result = await UserModel.findOne({ email, password }).exec();
      return result;
    },
    exists: async (id) => {
      const userIdObject = Types.ObjectId(id);
      const result = await UserModel.exists({ _id: userIdObject });
      return result;
    },
  },
  qrDataQueries: {
    exists: async (title) => {
      const exists = await QRDataModel.exists({ title });
      return exists;
    },
    create: async (title, data, userId) => {
      const uploadedBy = Types.ObjectId(userId);
      return await QRDataModel.create({
        title,
        data,
        uploadedBy,
      });
    },
    update: async (title, data, userId) => {
      const updatedBy = Types.ObjectId(userId);
      return await QRDataModel.findOneAndUpdate(
        { title },
        { data, updatedBy },
        { new: true, upsert: true }
      );
    },
    delete: async (title) => {
      const result = await QRDataModel.findOneAndDelete(
        { title },
        { maxTimeMS: 1000 }
      );
      return result;
    },
    findOne: async (title) => {
      const result = await QRDataModel.findOne({ title })
        .populate("uploadedBy", "email")
        .exec();
      return result;
    },
    findAll: async () => {
      const result = await QRDataModel.find({})
        .populate("uploadedBy", "email")
        .exec();
      return result;
    },
  },
};

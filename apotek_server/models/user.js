"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: "UserID" });
    }
  }
  User.init(
    {
      FullName: DataTypes.STRING,
      Address: DataTypes.STRING,
      PhoneNumber: DataTypes.STRING,
      Role: DataTypes.STRING,
      Password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.Password = hashPassword(user.Password);
  });
  return User;
};

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
      FullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Full Name is Required",
          },
          notEmpty: {
            msg: "Full Name is Required",
          },
        },
      },
      Address: DataTypes.STRING,
      PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone Number is Required",
          },
          notEmpty: {
            msg: "Phone Number is Required",
          },
        },
      },
      Role: DataTypes.STRING,
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is Required",
          },
          notEmpty: {
            msg: "Password is Required",
          },
          len: {
            args: [5],
            msg: "Minimum Password 5 Characters",
          },
        },
      },
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

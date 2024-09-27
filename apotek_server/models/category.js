"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, { foreignKey: "CategoryID" });
    }
  }
  Category.init(
    {
      CategoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category Name is Required",
          },
          notEmpty: {
            msg: "Category Name is Required",
          },
        },
      },
      Description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};

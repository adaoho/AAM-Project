"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsTo(models.Product, { foreignKey: "CategoryID" });
    }
  }
  Category.init(
    {
      CategoryName: DataTypes.STRING,
      Description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};

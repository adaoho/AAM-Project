"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.OrderDetail, { foreignKey: "OrderID" });
      Product.hasMany(models.Category, { foreignKey: "CategoryID" });
    }
  }
  Product.init(
    {
      ProductName: DataTypes.STRING,
      Slug: DataTypes.STRING,
      Description: DataTypes.TEXT,
      Unit: DataTypes.STRING,
      CategoryID: DataTypes.INTEGER,
      Price: DataTypes.INTEGER,
      StockQuantity: DataTypes.INTEGER,
      Sales: DataTypes.INTEGER,
      ImageURL: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};

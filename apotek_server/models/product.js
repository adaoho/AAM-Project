"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "CategoryID" });
      Product.hasMany(models.OrderDetail, { foreignKey: "ProductID" });
    }
  }
  Product.init(
    {
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product Name is Required",
          },
          notEmpty: {
            msg: "Product Name Required",
          },
        },
      },
      Slug: DataTypes.STRING,
      Description: DataTypes.TEXT,
      Unit: DataTypes.STRING,
      CategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category ID is Required",
          },
          notEmpty: {
            msg: "Category ID is Required",
          },
        },
      },
      Price: DataTypes.INTEGER,
      StockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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

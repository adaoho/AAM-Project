"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, { foreignKey: "OrderID" });
      OrderDetail.belongsTo(models.Product, { foreignKey: "ProductID" });
    }
  }
  OrderDetail.init(
    {
      OrderID: DataTypes.INTEGER,
      ProductID: DataTypes.INTEGER,
      Quantity: DataTypes.INTEGER,
      Price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "UserID" });
      Order.hasMany(models.Category, { foreignKey: "OrderID" });
    }
  }
  Order.init(
    {
      UserID: DataTypes.INTEGER,
      OrderDate: DataTypes.DATE,
      TotalAmount: DataTypes.INTEGER,
      OrderStatus: DataTypes.STRING,
      PaymentToken: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};

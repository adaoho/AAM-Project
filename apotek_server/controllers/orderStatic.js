const { User, Order, Product, OrderDetail } = require("../models");

function generatePaymentToken() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

class OrderStatic {
  static async orderCreate(req, res, next) {
    try {
      const { totalAmount, cartItems } = req.body;
      const UserID = req.user.id;

      const newOrder = await Order.create({
        UserID,
        OrderDate: new Date(),
        TotalAmount: totalAmount,
        OrderStatus: "Pending",
        PaymentToken: generatePaymentToken(),
      });

      const orderDetails = cartItems.map((item) => ({
        OrderID: newOrder.id,
        ProductID: item.ProductID,
        Quantity: item.Quantity,
        Price: item.Price,
      }));

      await OrderDetail.bulkCreate(orderDetails);

      for (const item of cartItems) {
        const product = await Product.findOne({
          where: { id: item.ProductID },
          attributes: ["id", "StockQuantity"],
        });

        if (!product) {
          throw new Error(`Product with ID ${item.ProductID} not found`);
        }

        const newStockQuantity = Math.max(
          product.StockQuantity - item.Quantity,
          0
        );

        await Product.update(
          { StockQuantity: newStockQuantity },
          { where: { id: product.id } }
        );
      }

      const findOrder = await Order.findOne({
        where: { id: newOrder.id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(201).json({
        message: `Success Create Order`,
        data: findOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  static async orderGetAll(req, res, next) {
    try {
      const { page = 1, limit = 100, user_id = "", status = "" } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const offset = (pageNum - 1) * limitNum;

      const where = {
        ...(user_id && {
          UserID: user_id,
        }),
        ...(status && {
          OrderStatus: status,
        }),
      };

      const { rows, count } = await Order.findAndCountAll({
        where,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: User,
          attributes: {
            exclude: ["Password", "createdAt", "updatedAt"],
          },
        },
        order: [["createdAt", "ASC"]],
        limit: limitNum,
        offset,
      });

      const totalPages = Math.ceil(count / limitNum);

      res.status(200).json({
        message: "Success Get All Order",
        data: {
          items: rows,
          totalPages,
          currentPage: pageNum,
          totalUsers: count,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async orderGetDetail(req, res, next) {
    try {
      const { orderId } = req.params;

      const findOrder = await Order.findOne({
        where: { id: orderId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: User,
          attributes: {
            exclude: ["Password", "createdAt", "updatedAt"],
          },
        },
      });

      res.status(200).json({
        message: "Success Get Order by ID",
        data: findOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  static async orderApproved(req, res, next) {
    try {
      const { PaymentToken } = req.body;
      const { orderId } = req.params;

      const findOrder = await Order.findOne({
        where: { id: orderId, PaymentToken },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!findOrder) throw new Error("Error Finding Order");

      const currentDate = new Date();
      const orderDate = new Date(findOrder.OrderDate);
      const timeDiff = currentDate - orderDate;
      const oneDay = 24 * 60 * 60 * 1000;

      if (timeDiff > oneDay) {
        const getUpdateCanceled = await Order.update(
          { OrderStatus: "Canceled" },
          { where: { id: orderId } }
        );

        return res.status(200).json({
          message: `Order ${orderId} automatically canceled as it's more than one day old`,
          data: getUpdateCanceled,
        });
      }

      const getUpdateApproved = await Order.update(
        { OrderStatus: "Approved" },
        { where: { id: orderId } }
      );

      res.status(201).json({
        message: `Success Update ${orderId} Status`,
        data: getUpdateApproved,
      });
    } catch (error) {
      next(error);
    }
  }

  // Upcoming Dashboard Feature
  static async orderEdit(req, res, next) {
    try {
      const UserId = req.user.id;

      const findUser = await User.findOne({
        where: { id: UserId },
        attributes: {
          exclude: ["createdAt", "updatedAt", "Password"],
        },
      });

      const findOrder = await Order.findAll({
        where: { UserID: UserId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json({
        message: `Success Get User ${findUser.FullName}`,
        data: {
          User: findUser,
          Order: findOrder,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Upcoming Dashboard Feature
  static async orderDelete(req, res, next) {
    try {
      const UserId = req.user.id;

      const findUser = await User.findOne({
        where: { id: UserId },
        attributes: {
          exclude: ["createdAt", "updatedAt", "Password"],
        },
      });

      const findOrder = await Order.findAll({
        where: { UserID: UserId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json({
        message: `Success Get User ${findUser.FullName}`,
        data: {
          User: findUser,
          Order: findOrder,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderStatic;

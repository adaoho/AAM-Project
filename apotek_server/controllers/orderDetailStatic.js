const { User, Order, Product, OrderDetail } = require("../models");
const { Op, where } = require("sequelize");

class OrderDetailStatic {
  static async orderDetailGetAll(req, res, next) {
    try {
      const {
        page = 1,
        limit = 100,
        order_id = "",
        product_id = "",
      } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const offset = (pageNum - 1) * limitNum;

      // Define the filter condition
      const where = {
        ...(order_id && { OrderID: order_id }),
        ...(product_id && { ProductID: product_id }),
      };

      // Fetch the records with the necessary relationships
      const { rows, count } = await OrderDetail.findAndCountAll({
        where,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Order,
            attributes: {
              exclude: ["Password", "createdAt", "updatedAt"],
            },
            include: {
              model: User,
              attributes: {
                exclude: ["Password", "createdAt", "updatedAt", "Role"],
              },
            },
          },
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt", "Description"],
            },
          },
        ],
        order: [["createdAt", "ASC"]],
        limit: limitNum,
        offset,
      });

      const totalPages = Math.ceil(count / limitNum);

      // Return the paginated results
      res.status(200).json({
        message: "Success Get All Order",
        data: {
          items: rows,
          totalPages,
          currentPage: pageNum,
          totalItems: count,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async orderDetailGetDetail(req, res, next) {
    try {
      const { page = 1, limit = 100, search = "" } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const offset = (pageNum - 1) * limitNum;

      const where = search
        ? {
            full_name: {
              [Op.iLike]: `%${search}%`,
            },
          }
        : {};

      const { rows, count } = await User.findAndCountAll({
        where,
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
        order: [["createdAt", "ASC"]],
        limit: limitNum,
        offset,
      });

      const totalPages = Math.ceil(count / limitNum);

      res.status(200).json({
        message: "Success Get All User",
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

  static async orderDetailCreate(req, res, next) {
    try {
      const { FullName, PhoneNumber, Password } = req.body;

      if (!FullName) throw { name: `FullNameEmpty` };
      if (!PhoneNumber) throw { name: `PhoneNumberEmpty` };
      if (!Password) throw { name: `PasswordEmpty` };

      await User.create({
        FullName,
        PhoneNumber,
        Password,
        Role: "customer",
      });

      const newUser = await User.findOne({
        attributes: {
          exclude: ["Password", "createdAt", "updatedAt"],
        },
        where: { PhoneNumber },
      });

      res.status(201).json({
        message: `Success Login Account ${PhoneNumber}`,
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async orderDetailEdit(req, res, next) {
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

  static async orderDetailDelete(req, res, next) {
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

module.exports = OrderDetailStatic;

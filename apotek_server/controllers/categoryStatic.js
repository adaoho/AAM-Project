const { User, Order, Product, OrderDetail, Category } = require("../models");
const { Op, where } = require("sequelize");

class CategoryStatic {
  static async categoryGetAll(req, res, next) {
    try {
      const { page = 1, limit = 100, search = "" } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const offset = (pageNum - 1) * limitNum;

      const where = search
        ? {
            CategoryName: {
              [Op.iLike]: `%${search}%`,
            },
          }
        : {};

      const { rows, count } = await Category.findAndCountAll({
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
        message: "Success Get All Categories",
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

  static async categoryGetDetail(req, res, next) {
    try {
      const { categoryId } = req.params;

      const findCategory = await Category.findOne({
        where: { id: categoryId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json({
        message: "Success Get Category by ID",
        data: findCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  // Upcoming Dashboard Feature
  static async categoryCreate(req, res, next) {
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

  // Upcoming Dashboard Feature
  static async categoryEdit(req, res, next) {
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
  static async categoryDelete(req, res, next) {
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

module.exports = CategoryStatic;

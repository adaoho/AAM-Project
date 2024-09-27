const { User, Order, Product, Category } = require("../models");
const { Op } = require("sequelize");

class ProductStatic {
  static async productGetAll(req, res, next) {
    try {
      const {
        page = 1,
        limit = 100,
        search = "",
        category_id = "",
      } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const offset = (pageNum - 1) * limitNum;

      const where = {
        ...(search && {
          ProductName: {
            [Op.iLike]: `%${search}%`,
          },
        }),
        ...(category_id && {
          CategoryID: category_id,
        }),
      };

      const { rows, count } = await Product.findAndCountAll({
        where,
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        order: [["createdAt", "ASC"]],
        limit: limitNum,
        offset,
      });

      const totalPages = Math.ceil(count / limitNum);

      res.status(200).json({
        message: "Success Get All Products",
        data: {
          items: rows,
          totalPages,
          currentPage: pageNum,
          totalProduct: count,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async productGetDetail(req, res, next) {
    try {
      const { productId } = req.params;

      const findProduct = await Product.findOne({
        where: { id: productId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json({
        message: "Success Get Products by ID",
        data: findProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  // Upcoming Dashboard Feature
  static async productCreate(req, res, next) {
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
  static async productEdit(req, res, next) {
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
  static async productDelete(req, res, next) {
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

module.exports = ProductStatic;

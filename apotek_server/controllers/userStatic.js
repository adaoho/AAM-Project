const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Order } = require("../models");
const { Op, where } = require("sequelize");

class UserStatic {
  static async userRegister(req, res, next) {
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

  static async userLogin(req, res, next) {
    try {
      const { PhoneNumber, Password } = req.body;
      const findUser = await User.findOne({ where: { PhoneNumber } });
      if (!findUser) throw { name: "InvalidLogin" };

      const isValidPassword = comparePassword(Password, findUser.Password);
      if (!isValidPassword) throw { name: "InvalidLogin" };

      const access_token = createToken({
        id: findUser.id,
        Email: findUser.Email,
        Role: findUser.Role,
      });

      const userLogin = await User.findOne({
        attributes: {
          exclude: ["Password", "createdAt", "updatedAt"],
        },
        where: { PhoneNumber },
      });

      res.status(200).json({
        message: `Success Login Account ${userLogin.FullName}`,
        data: {
          access_token,
          Role: findUser.role,
          data: userLogin,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async userGetAll(req, res, next) {
    try {
      const { page = 1, limit = 100, search = "" } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const offset = (pageNum - 1) * limitNum;

      const where = search
        ? {
            [Op.or]: [
              {
                FullName: {
                  [Op.iLike]: `%${search}%`,
                },
              },
              {
                PhoneNumber: {
                  [Op.iLike]: `%${search}%`,
                },
              },
              {
                Address: {
                  [Op.iLike]: `%${search}%`,
                },
              },
            ],
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

  static async userGetById(req, res, next) {
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

module.exports = UserStatic;

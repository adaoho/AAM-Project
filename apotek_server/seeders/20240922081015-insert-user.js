"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../db/user.json");
    const { hashPassword } = require("../helpers/bcrypt");

    data.forEach((element) => {
      element.Password = hashPassword(element.Password);
      element.createdAt = element.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", null, {});
  },
};

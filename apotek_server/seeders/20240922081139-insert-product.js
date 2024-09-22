"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../db/product.json");

    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Products", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", null, {});
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProductName: {
        type: Sequelize.STRING,
      },
      Slug: {
        type: Sequelize.STRING,
      },
      Description: {
        type: Sequelize.TEXT,
      },
      Unit: {
        type: Sequelize.STRING,
      },
      CategoryID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      Price: {
        type: Sequelize.INTEGER,
      },
      StockQuantity: {
        type: Sequelize.INTEGER,
      },
      Sales: {
        type: Sequelize.INTEGER,
      },
      ImageURL: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};

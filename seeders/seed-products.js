"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        userId: "a8231d9b-b49a-425b-835f-4b027661eb45",
        name: "Producto 1",
        quantity: 10,
        price: 100.0,
        stock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "a8231d9b-b49a-425b-835f-4b027661eb46",
        name: "Producto 2",
        quantity: 5,
        price: 50.0,
        stock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "a8231d9b-b49a-425b-835f-4b027661eb47",
        name: "Producto 3",
        quantity: 0,
        price: 25.0,
        stock: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};

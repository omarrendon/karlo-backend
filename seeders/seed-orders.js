"use strict";

const { UUID, UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Orders", [
      {
        userId: "a8231d9b-b49a-425b-835f-4b027661eb45",
        status: "Por pagar",
        total: 150.0,
        subtotal: 125.0,
        iva: 25.0,
        products: JSON.stringify([
          { id: 1, cantidad: 1 },
          { id: 2, cantidad: 2 },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "a8231d9b-b49a-425b-835f-4b027661eb46",
        status: "Pagada",
        total: 200.0,
        subtotal: 170.0,
        iva: 30.0,
        products: JSON.stringify([{ id: 2, cantidad: 4 }]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "a8231d9b-b49a-425b-835f-4b027661eb47",
        status: "Cancelada",
        total: 0.0,
        subtotal: 0.0,
        iva: 0.0,
        products: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};

"use strict";
const bcrypt = require("bcrypt");
const Usuario = require("../src/models/Usuario");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        id: "a8231d9b-b49a-425b-835f-4b027661eb45",
        name: "Negocio Uno",
        email: "negocio@example.com",
        password: "12345678",
        rol: "Negocio",
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a8231d9b-b49a-425b-835f-4b027661eb46",
        name: "Cliente Uno",
        email: "cliente@example.com",
        password: "test1234",
        rol: "Cliente",
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a8231d9b-b49a-425b-835f-4b027661eb47",
        name: "Cliente Dos",
        email: "cliente2.1@example.com",
        password: "12345678",
        rol: "Cliente",
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

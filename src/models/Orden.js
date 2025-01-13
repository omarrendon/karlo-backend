const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Orden = sequelize.define("Orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  status: {
    type: DataTypes.ENUM("Por pagar", "Pagada", "Devuelta", "Cancelada"),
    allowNull: false,
    defaultValue: "Por pagar",
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  iva: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
    references: {
      model: "Products",
      key: "id",
    },
  },
});

module.exports = Orden;

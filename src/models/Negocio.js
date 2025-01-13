const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Negocio = sequelize.define("Bussinesses", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});
module.exports = Negocio;
// Negocio.associate = models => {
//   Negocio.hasMany(models.Producto, { foreignKey: "bussinessId" });
// };

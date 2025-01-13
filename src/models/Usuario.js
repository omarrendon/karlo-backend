const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define("Users", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: Sequelize.DataTypes.STRING,
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8],
    },
  },
  rol: Sequelize.DataTypes.ENUM("Negocio", "Cliente"),
  isVerified: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Usuario.beforeCreate(async user => {
  user.password = await bcrypt.hash(user.password, 10);
});
// Negocio.associate = models => {
//   Negocio.hasMany(models.Producto, { foreignKey: "bussinessId" });
// };

module.exports = Usuario;

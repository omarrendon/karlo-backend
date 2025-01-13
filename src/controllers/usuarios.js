const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, rol } = req.body;
    if (password.length <= 7) {
      return res.status(400).json({
        message: "El password debe ser de minimo 8 caracteres.",
        error: true,
        data: null,
      });
    }

    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "El correo ya está registrado.",
        error: true,
        data: null,
      });
    }
    const user = await Usuario.create({ name, email, password, rol });

    res.status(201).json({
      message: "Usuario creado correctamente.",
      error: false,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll();
    res.status(201).json({
      message: "Lista de usuarios.",
      error: false,
      data: users,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, isVerified, rol } = req.body;

    const user = await Usuario.findByPk(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado.", error: true, data: null });
    }

    if (email && email !== user.email) {
      const emailExists = await Usuario.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({
          message: "El correo ya está registrado.",
          error: true,
          data: null,
        });
      }
    }

    let hashedPassword = user.password;
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          message: "La password debe tener al menos 8 caracteres.",
          error: true,
          data: null,
        });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      password: hashedPassword,
      rol: rol || user.rol,
      isVerified: isVerified || user.isVerified,
    });

    res.json({
      message: "Usuario actualizado con éxito.",
      error: false,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Usuario.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado.", error: true, data: null });
    }

    await user.destroy();

    res.json({
      message: "Usuario eliminado con éxito.",
      error: false,
      data: null,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const user = await Usuario.findOne({ where: { correo } });
    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }
    if (!user.esVerificado) {
      return res.status(403).json({ error: "La cuenta no está verificada." });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get users
exports.getUsers = async (req, res) => {
  try {
    const { id, name, email } = req.query;
    const where = {};
    if (id) where.id = id;
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    const users = await Usuario.findAll({ where });
    res.json({ massage: "Usuario(s) encontrados", error: false, data: users });

    if (users.length === 0) {
      return res.status(404).json({
        message: "No se encontraron usuarios que coincidan con los criterios.",
        error: true,
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

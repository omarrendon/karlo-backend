const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado.", error: true, data: null });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res
    //     .status(401)
    //     .json({ message: "Credenciales inválidas.", erro: true, data: null });
    // }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "La cuenta no está verificada.",
        error: true,
        data: null,
      });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.json({
      message: "Inicio de sesión exitoso.",
      data: {
        token,
        id: user.id,
        name: user.name,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

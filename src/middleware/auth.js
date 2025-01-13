const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Acceso denegado. Token no proporcionado.",
      error: true,
      data: null,
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (error) {
    res
      .status(403)
      .json({ error: "Token inválido o expirado.", error: true, data: null });
  }
};

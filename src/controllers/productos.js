const Producto = require("../models/Productos");
const { Op } = require("sequelize");

// Crear un producto
exports.createProduct = async (req, res) => {
  try {
    console.log(req.user);

    const { id: userId } = req.user; // Obtener userId del token
    const { name, quantity, price } = req.body;
    const stock = quantity > 0;
    const product = await Producto.create({
      userId,
      name,
      quantity,
      price,
      stock,
    });
    res.status(201).json({
      message: "Producto creado exitosamente.",
      error: false,
      data: product,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id, name } = req.query;
    const where = { userId };
    if (id) where.id = id;
    if (name) where.name = { [Op.like]: `%${name}%` };

    const products = await Producto.findAll({ where });
    res.json({
      message: "Listado de productos.",
      error: false,
      data: products,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user; // Obtener userId del token
    const { quantity, price } = req.body;
    const stock = quantity > 0;

    const product = await Producto.findOne({ where: { id, userId } });
    if (!product) {
      return res.status(404).json({
        message:
          "Producto no encontrado o no pertenece al negocio autenticado.",
        error: true,
        data: null,
      });
    }

    await product.update({ quantity, price, stock });
    res.json({
      message: "Producto actualizado correctamente.",
      error: false,
      data: product,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get product
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const where = {};
    if (id) where.id = id;

    const product = await Producto.findAll({ where });
    res.json({
      massage: "Producto(s) encontrados",
      error: false,
      data: product,
    });

    if (product.length === 0) {
      return res.status(404).json({
        message: "No se encontraron productos que coincidan con los criterios.",
        error: true,
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user; // Obtener userId del token

    const product = await Producto.findOne({ where: { id, userId } });
    if (!product) {
      return res.status(404).json({
        message:
          "Producto no encontrado o no pertenece al negocio autenticado.",
        error: true,
        data: null,
      });
    }

    await product.destroy();
    res.json({ message: "Producto eliminado correctamente.", error: false });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

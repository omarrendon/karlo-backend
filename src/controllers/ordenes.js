const Orden = require("../models/Orden");
const Producto = require("../models/Productos");
const { Op } = require("sequelize");

exports.createOrder = async (req, res) => {
  try {
    const { id: userId, rol } = req.user;

    const { products } = req.body;

    console.log(req.boy);

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "La lista de products no puede estar vacía.",
        error: true,
        data: null,
      });
    }

    const subtotal = products.reduce(
      (sum, prod) => sum + prod.precio * prod.cantidad,
      0
    );
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    const orden = await Orden.create({
      userId,
      status: "Por pagar",
      subtotal,
      iva,
      total,
      products,
    });
    res.status(201).json(orden);
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user; // Obtener userId del token

    const order = await Orden.findOne({ where: { id, userId } });
    if (!order) {
      return res.status(404).json({
        message: "Orden no encontrada o no pertenece al negocio autenticado.",
        error: true,
        data: null,
      });
    }

    await order.destroy();
    res.json({ message: "Orden eliminada correctamente.", error: false });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { id: userId, rol } = req.user;
    const { id, status, total } = req.query;

    console.log(req.user);

    const where = {};
    if (id) where.id = id;
    if (status) where.status = status;
    if (total) where.total = { [Op.gte]: total };

    if (rol === "Negocio") {
      where["$productos.negocioId$"] = userId; // Filtro para el negocio autenticado
    } else if (rol === "Cliente") {
      where.userId = userId; // Filtro para el cliente autenticado
    } else {
      return res
        .status(403)
        .json({ message: "Acceso no autorizado.", error: true, data: null });
    }

    console.log({ where });

    const orders = await Orden.findAll({
      where,
    });

    res.json({ message: "Correctamente", error: false, data: orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchOrderById = async (req, res) => {
  try {
    const { id, name } = req.query;
    const where = {};
    if (id) where.id = id;
    if (name) where.name = { [Op.like]: `%${name}%` };

    const order = await Orden.findAll({ where });
    res.json({
      massage: "Orden encontrada",
      error: false,
      data: order,
    });

    if (order.length === 0) {
      return res.status(404).json({
        message: "No se encontraron ordenes que coincidan con los criterios.",
        error: true,
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar estado de una orden (restricciones de rol)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { id: userId, rol } = req.user;

    const orden = await Orden.findByPk(id);
    if (!orden) {
      return res.status(404).json({ error: "Orden no encontrada." });
    }

    if (rol === "Negocio" && status === "Devuelta") {
      // Solo el negocio puede devolver órdenes
      orden.status = "Por pagar";
    } else if (
      (rol === "Cliente" && status === "Cancelada") ||
      status === "Devuelta"
    ) {
      // Solo el cliente puede cancelar órdenes
      orden.status = "Cancelada";
    } else {
      return res.status(403).json({
        message: "No tiene permiso para cambiar este estado.",
        error: true,
        data: null,
      });
    }

    await orden.save();
    res.json({
      message: "Estado actualizado correctamente.",
      error: false,
      data: orden,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Pagar una orden
exports.payOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, rol } = req.user;

    const orden = await Orden.findByPk(id);
    if (!orden || orden.userId !== userId) {
      return res.status(404).json({
        message: "Orden no encontrada o no pertenece al usuario.",
        error: true,
        data: null,
      });
    }

    if (orden.status !== "Por pagar") {
      return res.status(400).json({
        message: 'Solo se pueden pagar órdenes con estado "Por pagar".',
        error: true,
        data: null,
      });
    }

    orden.status = "Pagada";
    await orden.save();
    res.json({
      message: "Orden pagada correctamente.",
      error: false,
      data: orden,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

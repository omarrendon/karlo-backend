const Negocio = require("../models/Negocio");
const { Op } = require("sequelize");

exports.createBussines = async (req, res) => {
  try {
    const { name } = req.body;

    const existingBussines = await Negocio.findOne({ where: { name } });

    if (existingBussines) {
      return res.status(400).json({
        message: "El negocio ya está registrado.",
        error: true,
        data: null,
      });
    }

    const bussiness = await Negocio.create({ name });
    res.status(201).json({
      message: "El negocio ha sido creado correctamente.",
      error: true,
      data: bussiness,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBussines = async (req, res) => {
  try {
    const bussiness = await Negocio.findAll();
    res.json({ message: "Lista de negocios", error: false, data: bussiness });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBussiness = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const bussiness = await Negocio.findByPk(id);

    if (!bussiness) {
      return res
        .status(404)
        .json({ message: "Negocio no encontrado.", error: true, data: null });
    }

    if (name && name !== bussiness.name) {
      const bussinessExists = await Negocio.findOne({ where: { name } });
      if (bussinessExists) {
        return res.status(400).json({
          message: "El negocio ya está registrado.",
          error: true,
          data: null,
        });
      }
    }

    await bussiness.update({
      name: name || bussiness.name,
    });

    res.json({
      message: "Negocio actualizado con éxito.",
      error: false,
      data: bussiness,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBussiness = async (req, res) => {
  try {
    const { id } = req.params;

    const bussiness = await Negocio.findByPk(id);
    if (!bussiness) {
      return res
        .status(404)
        .json({ message: "Negocio no encontrado.", error: true, data: null });
    }

    await bussiness.destroy();

    res.json({
      message: "Negocio eliminado con éxito.",
      error: false,
      data: null,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchBussiness = async (req, res) => {
  try {
    const { id, name } = req.query;
    const where = {};
    if (id) where.id = id;
    if (name) where.name = { [Op.like]: `%${name}%` };

    const bussiness = await Negocio.findAll({ where });
    res.json({
      massage: "Negocio(s) encontrados",
      error: false,
      data: bussiness,
    });

    if (bussiness.length === 0) {
      return res.status(404).json({
        message: "No se encontraron negocios que coincidan con los criterios.",
        error: true,
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

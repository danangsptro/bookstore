const { Book } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  findAvailable: () => Book.findAll({ where: { stock: { [Op.gt]: 0 } } }),
  findAll: () => Book.findAll(),
  findById: (id) => Book.findByPk(id),
  create: (payload) => Book.create(payload),
  updateStock: (id, stock) => Book.update({ stock }, { where: { id } }),
  destroy: (id) => Book.destroy({ where: { id } }),
};

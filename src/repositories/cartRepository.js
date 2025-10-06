const { CartItem } = require('../models');
module.exports = {
  findByUser: (userId) => CartItem.findAll({ where: { userId }, include: ['Book'] }),
  findItem: (userId, bookId) => CartItem.findOne({ where: { userId, bookId } }),
  create: (payload) => CartItem.create(payload),
  update: (id, payload) => CartItem.update(payload, { where: { id } }),
  remove: (id) => CartItem.destroy({ where: { id } }),
  removeByUser: (userId) => CartItem.destroy({ where: { userId } })
};

const { User } = require('../models');
module.exports = {
  create: (data) => User.create(data),
  findByEmail: (email) => User.findOne({ where: { email } }),
  findById: (id) => User.findByPk(id),
  updateTokenId: (id, tokenId) => User.update({ currentTokenId: tokenId }, { where: { id } }),
  invalidateToken: (id) => User.update({ currentTokenId: null }, { where: { id } })
};

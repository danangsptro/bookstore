const { ErrorLog } = require('../models');
module.exports = {
  create: (payload) => ErrorLog.create(payload),
  findAll: () => ErrorLog.findAll()
};

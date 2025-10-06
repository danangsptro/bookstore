const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize) => {
  return sequelize.define('ErrorLog', {
    id: { type: DataTypes.STRING, primaryKey: true, defaultValue: () => uuidv4() },
    message: { type: DataTypes.TEXT, allowNull: false },
    stack: { type: DataTypes.TEXT, allowNull: true },
    route: { type: DataTypes.STRING, allowNull: true },
    method: { type: DataTypes.STRING, allowNull: true },
    userId: { type: DataTypes.STRING, allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true }
  }, { timestamps: true });
};

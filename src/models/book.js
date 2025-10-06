const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize) => {
  return sequelize.define('Book', {
    id: { type: DataTypes.STRING, primaryKey: true, defaultValue: () => uuidv4() },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    description: { type: DataTypes.TEXT, allowNull: true }
  }, { timestamps: true });
};

const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize) => {
  return sequelize.define('OrderItem', {
    id: { type: DataTypes.STRING, primaryKey: true, defaultValue: () => uuidv4() },
    orderId: { type: DataTypes.STRING, allowNull: false },
    bookId: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
  }, { timestamps: true });
};

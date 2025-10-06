const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize) => {
  return sequelize.define('CartItem', {
    id: { type: DataTypes.STRING, primaryKey: true, defaultValue: () => uuidv4() },
    userId: { type: DataTypes.STRING, allowNull: false },
    bookId: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  }, { timestamps: true });
};

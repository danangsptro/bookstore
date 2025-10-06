const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize) => {
  return sequelize.define('Order', {
    id: { type: DataTypes.STRING, primaryKey: true, defaultValue: () => uuidv4() },
    userId: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('pending','success','failed'), defaultValue: 'pending' },
    totalAmount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    paymentProviderId: { type: DataTypes.STRING, allowNull: true },
    metadata: { type: DataTypes.JSON, allowNull: true }
  }, { timestamps: true });
};

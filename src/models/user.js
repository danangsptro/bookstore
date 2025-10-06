const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize) => {
  return sequelize.define('User', {
    id: { type: DataTypes.STRING, primaryKey: true, defaultValue: () => uuidv4() },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('customer','admin'), defaultValue: 'customer' },
    currentTokenId: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true }
  }, { timestamps: true });
};

const sequelize = require('../config/db');
const User = require('./user')(sequelize);
const Book = require('./book')(sequelize);
const CartItem = require('./cartItem')(sequelize);
const Order = require('./order')(sequelize);
const OrderItem = require('./orderItem')(sequelize);
const ErrorLog = require('./errorLog')(sequelize);

// associations
User.hasMany(CartItem, { foreignKey: 'userId', onDelete: 'CASCADE' });
CartItem.belongsTo(User, { foreignKey: 'userId' });
Book.hasMany(CartItem, { foreignKey: 'bookId' });
CartItem.belongsTo(Book, { foreignKey: 'bookId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
Book.hasMany(OrderItem, { foreignKey: 'bookId' });
OrderItem.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = {
  sequelize,
  User, Book, CartItem, Order, OrderItem, ErrorLog
};

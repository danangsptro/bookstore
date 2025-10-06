const { Order, OrderItem, Book } = require('../models');
module.exports = {
  createOrderWithItems: async (userId, items, t) => {
    const total = items.reduce((s, it) => s + (it.price * it.quantity), 0);
    const order = await Order.create({ userId, totalAmount: total }, { transaction: t });
    const orderItems = items.map(it => ({ orderId: order.id, bookId: it.bookId, price: it.price, quantity: it.quantity }));
    await OrderItem.bulkCreate(orderItems, { transaction: t });
    return order;
  },
  findAll: () => Order.findAll({ include: [OrderItem] }),
  findById: (id) => Order.findByPk(id, { include: [OrderItem] }),
  updateStatus: (id, status) => Order.update({ status }, { where: { id } }),
  salesReportForBook: async (bookId) => {
    const items = await OrderItem.findAll({ where: { bookId } });
    const sold = items.reduce((s, it) => s + it.quantity, 0);
    const revenue = items.reduce((s, it) => s + (it.quantity * it.price), 0);
    const book = await Book.findByPk(bookId);
    return { bookId, title: book?.title || null, sold, remainingStock: book?.stock ?? 0, revenue };
  }
};

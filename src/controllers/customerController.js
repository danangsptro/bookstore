const bookRepo = require('../repositories/bookRepository');
const cartRepo = require('../repositories/cartRepository');
const orderRepo = require('../repositories/orderRepository');
const { Book, CartItem, sequelize } = require('../models');

module.exports = {
  listBooks: async (req, res, next) => {
    try {
      const books = await bookRepo.findAvailable();
      res.json(books);
    } catch (err) { next(err); }
  },

  bookDetail: async (req, res, next) => {
    try {
      const book = await bookRepo.findById(req.params.id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      res.json(book);
    } catch (err) { next(err); }
  },

  addToCart: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { bookId, quantity } = req.body;
      const qty = parseInt(quantity || 1);
      const book = await bookRepo.findById(bookId);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      if (book.stock < qty) return res.status(400).json({ error: 'Insufficient stock' });

      const existing = await cartRepo.findItem(userId, bookId);
      if (existing) {
        existing.quantity += qty;
        await existing.save();
        return res.json(existing);
      }
      const created = await cartRepo.create({ userId, bookId, quantity: qty });
      res.json(created);
    } catch (err) { next(err); }
  },

  removeFromCart: async (req, res, next) => {
    try {
      const id = req.params.id;
      await cartRepo.remove(id);
      res.json({ ok: true });
    } catch (err) { next(err); }
  },

  checkout: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const userId = req.user.id;
      const cartItems = await CartItem.findAll({ where: { userId }, transaction: t, lock: t.LOCK.UPDATE, include: [Book] });

      if (!cartItems.length) { await t.rollback(); return res.status(400).json({ error: 'Cart empty' }); }

      const items = [];
      for (const ci of cartItems) {
        const book = await Book.findByPk(ci.bookId, { transaction: t, lock: t.LOCK.UPDATE });
        if (!book) { await t.rollback(); return res.status(400).json({ error: `Book ${ci.bookId} not found` }); }
        if (book.stock < ci.quantity) { await t.rollback(); return res.status(400).json({ error: `Insufficient stock for ${book.title}` }); }
        book.stock = book.stock - ci.quantity;
        await book.save({ transaction: t });
        items.push({ bookId: book.id, price: book.price, quantity: ci.quantity });
      }

      const order = await orderRepo.createOrderWithItems(userId, items, t);
      await CartItem.destroy({ where: { userId }, transaction: t });
      await t.commit();
      res.json({ orderId: order.id, status: order.status, totalAmount: order.totalAmount });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
};

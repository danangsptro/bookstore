const bookRepo = require("../repositories/bookRepository");
const orderRepo = require("../repositories/orderRepository");

module.exports = {
  listAllBooks: async (req, res, next) => {
    try {
      const books = await bookRepo.findAll();
      res.json(books);
    } catch (err) {
      next(err);
    }
  },

  getBook: async (req, res, next) => {
    try {
      const book = await bookRepo.findById(req.params.id);
      if (!book) return res.status(404).json({ error: "Book not found" });
      res.json(book);
    } catch (err) {
      next(err);
    }
  },

  createBook: async (req, res, next) => {
    try {
      const { title, author, price, stock, description } = req.body;
      if (!title || price == null)
        return res.status(400).json({ error: "title & price required" });
      const book = await bookRepo.create({
        title,
        author,
        price,
        stock: stock || 0,
        description,
      });
      res.json(book);
    } catch (err) {
      next(err);
    }
  },

  updateStock: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { stock } = req.body;
      await bookRepo.updateStock(id, stock);
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  },

  deleteBook: async (req, res, next) => {
    try {
      const id = req.params.id;
      await bookRepo.destroy(id);
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  },

  listOrders: async (req, res, next) => {
    try {
      const orders = await orderRepo.findAll();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  salesReport: async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const report = await orderRepo.salesReportForBook(bookId);
      res.json(report);
    } catch (err) {
      next(err);
    }
  },
};

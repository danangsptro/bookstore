const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { requireRole } = require('../middlewares/roles');
const ctrl = require('../controllers/adminController');
const { createBook, updateStock } = require('../validations/bookValidation');
const validator = require('../utils/validator');

router.use(auth);
router.use(requireRole('admin'));

router.get('/books', ctrl.listAllBooks);
router.get('/books/:id', ctrl.getBook);
router.post('/books', validator(createBook), ctrl.createBook);
router.put('/books/:id/stock', validator(updateStock), ctrl.updateStock);
router.delete('/books/:id', ctrl.deleteBook);

router.get('/orders', ctrl.listOrders);
router.get('/reports/book/:id', ctrl.salesReport);

module.exports = router;

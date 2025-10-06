const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { requireRole } = require('../middlewares/roles');
const ctrl = require('../controllers/customerController');
const { addToCart } = require('../validations/cartValidation');
const validator = require('../utils/validator');

router.use(auth);
router.use(requireRole('customer'));

router.get('/books', ctrl.listBooks);
router.get('/books/:id', ctrl.bookDetail);
router.post('/cart', validator(addToCart), ctrl.addToCart);
router.delete('/cart/:id', ctrl.removeFromCart);
router.post('/checkout', ctrl.checkout);

module.exports = router;

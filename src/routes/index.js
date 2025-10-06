const express = require('express');
const router = express.Router();
router.use('/auth', require('./auth'));
router.use('/customer', require('./customer'));
router.use('/admin', require('./admin'));
router.use('/payment', require('./payment'));
router.get('/', (req, res) => res.json({ ok: true, version: '1.0.0' }));
module.exports = router;

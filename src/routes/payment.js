const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/paymentController');
router.post('/callback', ctrl.callback);
module.exports = router;

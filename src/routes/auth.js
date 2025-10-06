const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validations/authValidation');
const validator = require('../utils/validator');

router.post('/register', validator(registerSchema), authCtrl.register);
router.post('/login', validator(loginSchema), authCtrl.login);
router.post('/logout', authCtrl.logout);

module.exports = router;

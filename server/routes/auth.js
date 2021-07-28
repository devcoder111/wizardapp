const express = require('express');
const router = express.Router();

const { register, login, forgot_password, reset_password, labRegister } = require('../controllers/auth');

router.route('/register').post(register)
router.route('/laboratory/register').post(labRegister)
router.route('/login').post(login)
router.route('/forgotpassword').post(forgot_password)
router.route('/resetpassword/:resetToken').put(reset_password)

module.exports = router;
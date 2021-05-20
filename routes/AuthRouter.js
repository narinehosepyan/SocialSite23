const express = require('express');
const { registerNewUser, loginUser } = require('../controllers/AuthController');
const { checkEmailUnique } = require('../middlewares/checkEmailUnique');
const { validateRegister, validateLogin } = require('../middlewares/validate');
const router = express.Router();

/* GET users listing. */
router.post('/register',validateRegister,checkEmailUnique,registerNewUser)

router.post('/login',validateLogin,loginUser)

module.exports = router;

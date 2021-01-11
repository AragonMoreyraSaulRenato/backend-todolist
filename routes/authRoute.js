//RUTAS PARA AUTENTICAR USUARIOS
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

//CREA USUARIOS
// api/usuarios
router.post('/',
   [
      check('email', 'Agrega un email valido').isEmail(),
      check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6, max: 12 })
   ],
   authController.authUser
)

module.exports = router;
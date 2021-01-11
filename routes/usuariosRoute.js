//RUTAS PARA CREAR USUARIOS
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');
const { check } = require('express-validator');

//CREA USUARIOS
// api/usuarios
router.post('/',
   [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'Agrega un email valido').isEmail(),
      check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6, max: 12 })
   ],
   usuarioController.create)

module.exports = router;
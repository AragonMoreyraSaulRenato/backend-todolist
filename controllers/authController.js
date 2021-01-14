const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
   //SI EXISTEN ERRORES
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   //EXTRAER EMAIL Y PASSWORD
   const { email, password } = req.body;

   try {
      //VALIDAR SI EL USUARIO EXISTE
      let usuario = await Usuario.findOne({ email });
      if (!usuario) {
         return res.status(400).json({ msg: 'El usuario no existe' });
      }

      //VALIDAR PASSWORD
      const isPassValid = await bcryptjs.compare(password, usuario.password);
      if (!isPassValid) {
         return res.status(401).json({ msg: 'Contrasena incorrecta' });
      }

      //SI TODO ES CORRECTO EXISTE
      const payload = {
         usuario: { id: usuario.id }
      }

      jwt.sign(payload, process.env.SECRET_WORD, {
         expiresIn: 18000// 5 HOURs
      }, (error, token) => {
         if (error) throw error;
         else {
            res.json({
               msg: "Inicio de sesion exitosamente!",
               token
            });
         }
      });

   } catch (error) {
      console.log(error);
   }
}
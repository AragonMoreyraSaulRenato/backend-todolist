const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {

   const errores = validationResult(req);
   if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
   }

   //EXTRAER EMAIL Y PASSWORD
   const { email, password } = req.body;

   try {
      //VERIFICA SI EL USUARIO YA EXISTE
      let usuario = await Usuario.findOne({ email });
      if (usuario) {
         return res.status(400).json({ msg: "El usuario ya existe" });
      }

      //CREAMSO EL OBJETO USUARIO
      usuario = new Usuario(req.body);

      //HASHEAR EL PASSWORD
      const salt = await bcryptjs.genSalt(10);
      usuario.password = await bcryptjs.hash(password, salt);

      //GUARDAMOS EL USUARIO
      await usuario.save();

      //CREAR Y FORMAR JWT
      const payload = {
         usuario: { id: usuario.id }
      }

      jwt.sign(payload, process.env.SECRET_WORD, {
         expiresIn: 3600// ONE HOUR
      }, (error, token) => {
         if (error) throw error;
         else {
            res.json({
               msg: "Usuario creado exitosamente!",
               token
            });
         }
      });



   } catch (error) {
      res.status(400).send("Hubo un error");
   }
}
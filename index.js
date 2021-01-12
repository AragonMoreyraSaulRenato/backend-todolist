const express = require('express');
const DBConection = require('./config/db');

//SE CREAL EL SERIVODR
const app = express();

//ESTABLECER CONEXION CON LA BASE DE DATOS
DBConection();

//HABILITAR EXPRESS.JSON
app.use(express.json({ extended: true }));

//PUERTO DE LA APP
const PORT = process.env.PORT || 4000;

//IMPORTAR USUARIOS
app.use('/api/usuarios', require('./routes/usuariosRoute'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/proyectos', require('./routes/proyectosRoute'));
app.use('/api/tareas', require('./routes/tareasRoute'));

//INICIAR LA APP
app.listen(PORT, () => {
   console.log(`Server is working in port ${PORT}`);
})
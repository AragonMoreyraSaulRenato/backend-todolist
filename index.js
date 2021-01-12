const express = require('express');
const path = require('path');
const DBConection = require('./config/db');

//SE CREAL EL SERIVODR
const app = express();

//ESTABLECER CONEXION CON LA BASE DE DATOS
DBConection();

//HABILITAR EXPRESS.JSON
app.use(express.json({ extended: true }));

//PUERTO DE LA APP
app.set('port', process.env.PORT || 4000);

//AGREGO VISTA PARA INCIO
app.use(express.static(path.join(__dirname, 'public')));

//IMPORTAR USUARIOS
app.use('/api/usuarios', require('./routes/usuariosRoute'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/proyectos', require('./routes/proyectosRoute'));
app.use('/api/tareas', require('./routes/tareasRoute'));

//INICIAR LA APP
app.listen(app.get('port'), '0.0.0.0', () => {
   console.log(`Server is working in port ${app.get('port')}`);
})
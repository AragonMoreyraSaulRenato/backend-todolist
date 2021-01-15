const express = require('express');
const path = require('path');

//SE CREAL EL SERIVODR
const app = express();

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

module.exports = app;
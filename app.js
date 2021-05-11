const express = require("express");
const path = require("path");
const cors = require("cors");
const { setQueues, BullAdapter, router } = require("bull-board");
const Queue = require("./lib/Queue");

//SE CREAL EL SERIVODR
const app = express();
setQueues(Queue.queues.map((queue) => new BullAdapter(queue.bull)));

//HABILITAR EXPRESS.JSON
app.use(express.json({ extended: true }));

//HABILITAR CORS
app.use(cors());

//PUERTO DE LA APP
app.set("port", process.env.PORT || 5000);

//AGREGO VISTA PARA INCIO
app.use(express.static(path.join(__dirname, "public")));

//WORKER DASHBOARD BULL
app.use("/admin/queues", router);

//IMPORTAR USUARIOSd
app.use("/api/usuarios", require("./routes/usuariosRoute"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/proyectos", require("./routes/proyectosRoute"));
app.use("/api/tareas", require("./routes/tareasRoute"));
app.use("/api/send-email", require("./routes/emailRoute"));

module.exports = app;

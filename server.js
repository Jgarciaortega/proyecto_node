const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Middlewares (es un paso intermedio antes de llegar a la ruta seleccionada desde el cliente)
// 1º convierte lo recibido a json
app.use(express.json());
// 2º cors
app.use(cors());

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, "public")));

//Require Users routes
app.use(require("./app/routes/routes.js"));

app.listen(3000, () => {
    console.log(" * Miniserver UP and Running en http://localhost:3000");
});


import express from "express";

import {migrarAlumnos} from "./migrar-alumnos.js"
import { crearEndpointsDeTabla } from "./endpoints-tabla.js";
import { materiasDef } from "./metadatos-materias.js";
import { ssPage } from "./html.js";
import { usarBaseDeDatos } from "./base-de-datos.js";

const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', function(_req, res){
    res.send(ssPage(`
        <h1>Sistema de Inscripciones</h1>
        <p>Menú</p>
        <ul>
            <li><a href='./materias'>Materias</li>
            <li><a href='./materia/agregar'>Agregar Materia</li>
        </ul>
    `))
})

crearEndpointsDeTabla(app, materiasDef);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// migrarAlumnos('./examples/alumnos.csv', client)
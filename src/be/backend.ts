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

app.get('/materia/agregar', async function(_req, res){
    res.end(ssPage(`<h1>Agregar Materia</h1>
        <form method=post>
        <table>
            <tr>
                <tr><td>mat    </td>  <td><input name=mat    ></td>    </tr>
                <tr><td>nombre </td>  <td><input name=nombre ></td>    </tr>
                <tr><td>area   </td>  <td><input name=area   ></td>    </tr>
                <tr><td>horas  </td>  <td><input name=horas  ></td>    </tr>
                <tr><td colspan=2><input type=submit name=agregar></td></tr>
            </tr>
        </table>
        </form>
    `));
})

app.post('/materia/agregar', async function(req, res){
    var client = await usarBaseDeDatos();
    var result = await client.query(`
        insert into materias (mat, nombre, area, horas)
            values ($1, $2, $3, $4) returning mat`,
            [req.body.mat, req.body.nombre, req.body.area, req.body.horas]
    );
    res.end(ssPage(`
        <p>Se agregó con éxito la materia ${result.rows[0].mat}</p>
        <a href=/>volver</a>
    `))
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// migrarAlumnos('./examples/alumnos.csv', client)
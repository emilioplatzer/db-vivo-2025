import express from "express";
import { Client, ClientConfig } from "pg";
import {promises as fs} from "fs";


import {migrarAlumnos} from "./migrar-alumnos.js"

const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function ssPage(content:string){
    return `<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <style>
* {font-family: Monoto, Bokoto, Arial}
        </style>
    </head>
    <body>
${content}
    </body>
</html>`
}

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

var connOptions = JSON.parse(await fs.readFile('local-config.json','utf-8')) as {db:ClientConfig}

async function usarBaseDeDatos(){
    const client = new Client(connOptions.db);
    await client.connect();
    await client.query('set search_path = insc;')
    return client;
}

app.get('/materias', async function(_req, res){
    var client = await usarBaseDeDatos();
    var result = await client.query(`
        select mat, nombre, area, horas
            from materias
            order by mat
    `)
    res.end(ssPage(`<h1>Materias</h1>
        <table>
            <thead>
                <tr>
                    <th>mat</th>
                    <th>nombre</th>
                    <th>area</th>
                    <th>horas</th>
                </tr>
            </thead>
            <tbody>
            ${result.rows.map(row => `
                <tr>
                    <td>${row.mat}</td>
                    <td>${row.nombre}</td>
                    <td>${row.area}</td>
                    <td>${row.horas}</td>
                </tr>
            `).join('')}
            </tbody>
        </table>
    `));
})

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
    console.log('por acá pasé', req.query);
    var client = await usarBaseDeDatos();
    var result = await client.query(`
        insert into materias (mat, nombre, area, horas)
            values (
            '${req.body.mat}',
            '${req.body.nombre}',
            '${req.body.area}',
            '${req.body.horas}')
            returning mat
    `);
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
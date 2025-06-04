import express from "express";
import { Client, ClientConfig } from "pg";
import {promises as fs} from "fs";

import {migrarAlumnos} from "./migrar-alumnos.js"

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/', function(_req, res){
    res.send(`
        <h1>Sistema de Inscripciones</h1>
        <p>Menú</p>
        <ul>
            <li><a href='./materias'>Materias</li>
        </ul>
    `)
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
    res.end(`<h1>Materias</h1>
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
    `);
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// migrarAlumnos('./examples/alumnos.csv', client)
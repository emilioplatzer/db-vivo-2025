import express from "express";
import { Client, ClientConfig } from "pg";
import {promises as fs} from "fs";

import {migrarAlumnos} from "./migrar-alumnos.js"

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/', function(_req, res){
    res.send(`
        <h1>Sistema de Inscripciones</h1>
        <p>Menú</p>
        <ul>
            <li><a href='./materias'>Materias</li>
        </ul>
    `)
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

var connOptions = JSON.parse(await fs.readFile('local-config.json','utf-8')) as {db:ClientConfig}

const client = new Client(connOptions.db);

await client.connect();

await client.query('set search_path = insc;')

// migrarAlumnos('./examples/alumnos.csv', client)
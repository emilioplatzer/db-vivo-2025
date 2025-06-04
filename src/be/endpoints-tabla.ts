import {Express} from "express";

import {MetadatosTabla} from "./metadatos-materias.js";
import { usarBaseDeDatos } from "./base-de-datos.js";
import { ssPage } from "./html.js";

export function crearEndpointsDeTabla(app: Express, metadatos: MetadatosTabla){
    app.get(`/${metadatos.tabla}`, async function(_req, res){
        var client = await usarBaseDeDatos();
        var result = await client.query(`
            select ${Object.keys(metadatos.campos).join(', ')}
                from ${metadatos.tabla}
                order by mat
        `)
        res.end(ssPage(`<h1>${metadatos.tabla}</h1>
            <table>
                <thead>
                    <tr>
                        ${Object.keys(metadatos.campos).map(campo => `<td>${campo}</td>`).join('\n')}
                    </tr>
                </thead>
                <tbody>
                ${result.rows.map(row => `
                    <tr>
                        ${Object.keys(metadatos.campos).map(campo => `<td>${row[campo]}</td>`).join('\n')}
                    </tr>
                `).join('')}
                </tbody>
            </table>
        `));
    })
}
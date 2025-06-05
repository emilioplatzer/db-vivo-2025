import {Express} from "express";

import { MetadatosTabla } from "./tipos.js";
import { usarBaseDeDatos } from "./base-de-datos.js";
import { ssPage } from "./html.js";

export function crearEndpointsDeTabla(app: Express, metadatos: MetadatosTabla){
    app.get(`/${metadatos.tabla}`, async function(_req, res){
        var client = await usarBaseDeDatos();
        var result = await client.query(`
            select ${Object.keys(metadatos.campos).join(', ')}
                from ${metadatos.tabla}
                order by ${metadatos.primaryKey}
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
    app.get(`/${metadatos.singular}/agregar`, async function(_req, res){
        res.end(ssPage(`<h1>Agregar ${metadatos.singular}</h1>
            <form method=post>
            <table>
                ${Object.keys(metadatos.campos).map(campo => `
                    <tr><td>${campo}</td><td><input name=${campo}></td></tr>
                `).join('\n')}
                <tr><td colspan=2><input type=submit name=agregar></td></tr>
            </table>
            </form>
        `));
    })
    app.post(`/${metadatos.singular}/agregar`, async function(req, res){
        var client = await usarBaseDeDatos();
        var result = await client.query(`
            insert into ${metadatos.tabla} (${Object.keys(metadatos.campos).join(', ')})
                values (${Object.keys(metadatos.campos).map((_, i)=>`\$${i+1}`).join(', ')}) returning ${metadatos.primaryKey}`,
                Object.keys(metadatos.campos).map(campo => req.body[campo])
        );
        res.end(ssPage(`
            <p>Se agregó con éxito ${metadatos.articuloSingular} ${metadatos.singular} ${result.rows[0][metadatos.primaryKey]}</p>
            <a href=/>volver</a>
        `))
    });

}
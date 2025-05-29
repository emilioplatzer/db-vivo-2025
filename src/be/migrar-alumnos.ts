import fs from "fs/promises";
import {Client} from "pg";


const campos = [
    {name: 'lu'},
    {name: 'nombres'},
    {name: 'apellido'},
    {name: 'annio_ingreso'},
]

export async function migrarAlumnos(rutaOrigen:string, client:Client){
    let content = await fs.readFile(rutaOrigen, 'utf8');
    let [encabezado, ...lineas] = content.split(/\r?\n/);
    let camposCsv = encabezado.split(',').map(campo => campo.replace(/\s+$/,'')).filter(c => c);
    for (const campo of camposCsv) {
        if (!campos.find(defCampo => defCampo.name == campo)) {
            throw "Error de migracion. El campo " + campo + " no esta en la tabla alumnos"
        }
    }
    for (const linea of lineas) {
        let valores = linea.split(',').map(campo => campo.replace(/\s+$/,'')).filter(c => c);
        const sql = `INSERT INTO alumnos (${camposCsv.join(', ')}) values (${valores.map(v=>`'${v}'`).join(",")});`
        var result = await client.query(sql);
        console.log(result);
    }
}
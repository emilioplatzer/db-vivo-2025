import { Client, ClientConfig } from "pg";
import {promises as fs} from "fs";
import { MetadatosTabla } from "./tipos.js";

var connOptions = JSON.parse(await fs.readFile('local-config.json','utf-8')) as {db:ClientConfig}

export async function usarBaseDeDatos(){
    const client = new Client(connOptions.db);
    await client.connect();
    await client.query('set search_path = insc;')
    return client;
}

export async function exportarEstructuraSql(metadatos: MetadatosTabla){
    await fs.writeFile(`./dist/${metadatos.tabla}.sql`,`
create table ${metadatos.tabla}(
    ${Object.keys(metadatos.campos).map(campo=>`
        ${campo} ${metadatos.campos[campo].tipo}`).join(',')}
        , primary key (${metadatos.primaryKey})
);
grant select, insert on ${metadatos.tabla} to inscriptos_user;        
`,'utf-8');
}

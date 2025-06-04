import { Client, ClientConfig } from "pg";
import {promises as fs} from "fs";

var connOptions = JSON.parse(await fs.readFile('local-config.json','utf-8')) as {db:ClientConfig}

export async function usarBaseDeDatos(){
    const client = new Client(connOptions.db);
    await client.connect();
    await client.query('set search_path = insc;')
    return client;
}

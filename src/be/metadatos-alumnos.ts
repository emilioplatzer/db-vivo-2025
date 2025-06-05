import { MetadatosTabla } from "./tipos.js";

export const alumnosDef = {
    tabla: 'alumnos',
    campos: {
        lu            : {tipo: 'varchar(10)'},
        nombres       : {tipo: 'text'},
        apellido      : {tipo: 'text'},
        mail          : {tipo: 'text'},
        annio_ingreso : {tipo: 'integer'},
    },
    primaryKey: 'lu',
    singular: 'alumno',
    articuloSingular: 'el'
} satisfies MetadatosTabla

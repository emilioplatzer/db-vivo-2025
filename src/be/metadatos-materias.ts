export const materiasDef = {
    tabla: 'materias',
    campos: {
        mat        : {tipo: 'varchar(10)'},
        nombre     : {tipo: 'text'},
        area       : {tipo: 'text'},
        horas      : {tipo: 'integer'},
    },
    primaryKey: 'mat',
    singular: 'materia',
    pronombreSingular: 'la'
}

export type MetadatosTabla = typeof materiasDef;
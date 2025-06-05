export type MetadatosTabla = {
    tabla: string
    campos: Record<string, {tipo:string}>
    primaryKey: string
    singular: string
    articuloSingular: string
}
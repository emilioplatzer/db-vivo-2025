import express from "express";

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/', function(_req, res){
    res.send("<h1>Sistema de Inscripciones</h1>en preparación")
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

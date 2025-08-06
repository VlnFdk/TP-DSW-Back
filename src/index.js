const express = require('express');
const inmuebleRoutes = require('./routes/inmueble.routes');

const app = express()

// Middleware de logger personalizado
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`)
    next();
};

// Middleware para parsear JSON
app.use(express.json());

// Middleware de logger
app.use(logger);

// Rutas de inmuebles
app.use('/inmuebles', inmuebleRoutes);

//Ruta de prueba en el index
app.get('/', (req, res) => {
   res.json({
    message: 'API de Inmuebles funcionando correctamente',
    endpoints: {
        inmuebles: 'GET /inmuebles',
        inmueble: 'GET /inmuebles/:id',
        createInmueble: 'POST /inmuebles',
        updateInmueble: 'PUT /inmuebles/:id',
        deleteInmueble: 'DELETE /inmuebles/:id'
    }
   });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
 
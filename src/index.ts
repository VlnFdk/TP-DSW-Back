import express from 'express';
import { Inmueble } from './inmueble.js';
import { dir } from 'console';

const app = express()
app.use(express.json())

const inmuebles = [
    new Inmueble(
        'Calle Falsa 123',
        4,
        'Norte',
        'Departamento luminoso con balcón',
        'c7dbc801-25c3-403c-9882-a852b4eb50fa'
    )
]


app.get('/api/inmuebles', (req, res) => {
    res.json(inmuebles)
})

app.get('/api/inmuebles/:id', (req, res) => {
    const inmueble = inmuebles.find((inmueble) => inmueble.id === req.params.id)
    if (!inmueble) {
        res.status(404).send({ message: 'Inmueble no encontrado' })
    }
    res.json(inmueble)
})

app.post('/api/inmuebles', express.json(), (req, res) => {
    const { direccion, cant_ambientes, orientacion, descripcion } = req.body;
    const nuevoInmueble = new Inmueble(direccion, cant_ambientes, orientacion, descripcion);
    inmuebles.push(nuevoInmueble);
    res.status(201).json(nuevoInmueble);
})

app.put('/api/inmuebles/:id', express.json(), (req, res) => {
    const inmuebleIndex = inmuebles.findIndex((inmueble) => inmueble.id === req.params.id)

    if (inmuebleIndex === -1) {
     res.status(404).send({ message: 'Inmueble no encontrado' })
    }
    const inputInmueble ={
        direccion: req.body.direccion,
        cant_ambientes: req.body.cant_ambientes,
        orientacion: req.body.orientacion,
        descripcion: req.body.descripcion,
    }
inmuebles[inmuebleIndex] = { ...inmuebles[inmuebleIndex], ...inputInmueble }

    res.status(200).send({ message: 'Inmueble actualizado', inmueble: inmuebles[inmuebleIndex] })
})


app.use('/', (req, res) => {
    res.json({ message: 'Hello World!'})
})


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})


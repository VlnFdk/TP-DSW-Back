import express from 'express';
import { Inmueble } from './inmueble.js';

const app = express()

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

app.use('/', (req, res) => {
    res.json({ message: 'Hello World!'})
})


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})


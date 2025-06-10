import express, { NextFunction, Request, Response } from 'express';
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

function sanitizeInmuebleInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizeInput = {
        direccion: req.body.direccion,
        cant_ambientes: req.body.cant_ambientes,
        orientacion: req.body.orientacion,  
        descripcion: req.body.descripcion,
    }
    
    Object.keys(req.body.sanitizeInput).forEach((key) => {
        if (req.body.sanitizeInput[key] === undefined) {
          delete req.body.sanitizeInput[key]
        }
      })
      next()
    }

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

app.post('/api/inmuebles', sanitizeInmuebleInput, (req, res) => {
    const input = req.body.sanitizeInput
    const nuevoInmueble = new Inmueble(
        input.direccion,
        input.cant_ambientes,
        input.orientacion,
        input.descripcion
    )

    inmuebles.push(nuevoInmueble)
    res.status(201).send({ message: 'Inmueble creado', data: nuevoInmueble })
})

app.put('/api/inmuebles/:id', sanitizeInmuebleInput, (req, res) => {
    const inmuebleIndex = inmuebles.findIndex((inmueble) => inmueble.id === req.params.id)

    if (inmuebleIndex === -1) {
     res.status(404).send({ message: 'Inmueble no encontrado' })
    }
   
inmuebles[inmuebleIndex] = { ...inmuebles[inmuebleIndex], ...req.body.sanitizeInput }

    res.status(200).send({ message: 'Inmueble actualizado', inmueble: inmuebles[inmuebleIndex] })
})

app.patch('/api/inmuebles/:id', sanitizeInmuebleInput, (req, res) => {
    const inmuebleIndex = inmuebles.findIndex((inmueble) => inmueble.id === req.params.id)

    if (inmuebleIndex === -1) {
     res.status(404).send({ message: 'Inmueble no encontrado' })
    }

    Object.assign(inmuebles[inmuebleIndex], req.body.sanitizeInput)

    res.status(200).send({ message: 'Inmueble actualizado', inmueble: inmuebles[inmuebleIndex] })
})

app.delete('/api/inmuebles/:id', (req, res) => {
    const inmuebleIndex = inmuebles.findIndex((inmueble) => inmueble.id === req.params.id)

    if (inmuebleIndex === -1) {
        res.status(404).send({ message: 'Inmueble no encontrado' })
    }      
    else {
        inmuebles.splice(inmuebleIndex, 1)
        res.status(200).send({ message: 'Inmueble eliminado' })
    }
})

app.use('/', (req, res) => {
    res.json({ message: 'Hello World!'})
})


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})

const express = require('express');
const router = express.Router();
const inmuebleController = require('../controllers/inmueble.controller');

// GET /inmuebles - Obtener todos los inmuebles
router.get('/', inmuebleController.getInmuebles);

// GET /inmuebles/:id - Obtener un inmueble por ID
router.get('/:id', inmuebleController.getInmueble);

// POST /inmuebles - Crear un nuevo inmueble
router.post('/', inmuebleController.createInmueble); 

// PUT /inmuebles/:id - Actualizar un inmueble existente
router.put('/:id', inmuebleController.updateInmueble); 

// DELETE /inmuebles/:id - Eliminar un inmueble
router.delete('/:id', inmuebleController.deleteInmueble);

module.exports = router;

const crypto = require('node:crypto');

class Inmueble {
    constructor(direccion, cant_ambientes, orientacion, descripcion, id) {
        this.id = id || crypto.randomUUID();
        this.direccion = direccion;
        this.cant_ambientes = cant_ambientes;
        this.orientacion = orientacion;
        this.descripcion = descripcion;
    }
}

let inmuebles = [
    new Inmueble(
        'Calle Falsa 123',
        4,
        'Norte',
        'Departamento luminoso con balcón'
    ),
    new Inmueble(
        'Avenida Siempre Viva 456',
        7,
        'Sur',
        'Casa amplia con jardín y piscina'
    )
];

const generateId = () => crypto.randomUUID();

const getAllInmuebles = () => {
    return inmuebles;
};

const getInmuebleById = (id) => {
    return inmuebles.find(inmueble => String(inmueble.id) === String(id));
};

const createInmueble = (inmuebleData) => {
    if (!inmuebleData.direccion || !inmuebleData.cant_ambientes || !inmuebleData.orientacion || !inmuebleData.descripcion) {
        throw new Error('Faltan datos obligatorios');
    }

    const existingInmueble = inmuebles.find(inmueble => inmueble.direccion === inmuebleData.direccion);
    if (existingInmueble) {
        throw new Error('Ya existe un inmueble con esa dirección');
    }

    const newInmueble = new Inmueble(
        inmuebleData.direccion,
        inmuebleData.cant_ambientes,
        inmuebleData.orientacion,
        inmuebleData.descripcion,
        generateId()
    );

    inmuebles.push(newInmueble);
    return newInmueble;
};

const updateInmueble = (id, inmuebleData) => {
    const inmuebleIndex = inmuebles.findIndex(inmueble => String(inmueble.id) === String(id));
    if (inmuebleIndex === -1) {
        throw new Error('Inmueble no encontrado');
    }

    inmuebles[inmuebleIndex] = { ...inmuebles[inmuebleIndex], ...inmuebleData };
    return inmuebles[inmuebleIndex];
};

const deleteInmueble = (id) => {
    const inmuebleIndex = inmuebles.findIndex(inmueble => String(inmueble.id) === String(id));
    if (inmuebleIndex === -1) {
        throw new Error('Inmueble no encontrado');
    }

    const deletedInmueble = inmuebles[inmuebleIndex];
    inmuebles.splice(inmuebleIndex, 1);
    return deletedInmueble;
};

module.exports = {
    getAllInmuebles,
    getInmuebleById,
    createInmueble,
    updateInmueble,
    deleteInmueble
};
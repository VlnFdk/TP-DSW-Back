const inmuebleService = require('../services/inmueble.services.js');

const getInmuebles = (req, res) => {
  try {
    const inmuebles = inmuebleService.getAllInmuebles();
    const response = {
      success: true,
      data: inmuebles,
      total: inmuebles.length
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
};


const getInmueble = (req, res) => {
  try {
    const inmueble = inmuebleService.getInmuebleById(req.params.id);
    if (!inmueble) {
      return res.status(404).json({
        success: false,
        error: "Inmueble no encontrado"
      });
    }

    res.json({
      success: true,
      data: inmueble
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
};

const createInmueble = (req, res) => { 
  try{
    const {direccion, cant_ambientes, orientacion, descripcion} = req.body;
    if(!direccion || !cant_ambientes || !orientacion || !descripcion){
      return res.status(400).json({
        success: false,
        error: "Faltan datos obligatorios"
      });
    }
    const nuevo = inmuebleService.createInmueble({direccion, cant_ambientes, orientacion, descripcion});
    return res.status(201).json({
      success: true,
      data: nuevo,
      message: "Inmueble creado correctamente"
    });
  }
  catch(error){
    return res.status(500).json({
      success: false,
      error: error.message || "Error interno del servidor"
    });
  }
};

const updateInmueble = (req, res) => {
  try {
    const updatedInmueble = inmuebleService.updateInmueble(req.params.id, req.body);
    if (!updatedInmueble) {
      return res.status(404).json({
        success: false,
        error: "Inmueble no encontrado"
      });
    }
    res.json({
      success: true,
      data: updatedInmueble,
      message: "Inmueble actualizado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
};

const deleteInmueble = (req, res) => {
  try {
    const deletedInmueble = inmuebleService.deleteInmueble(req.params.id);
    if (!deletedInmueble) {
      return res.status(404).json({
        success: false,
        error: "Inmueble no encontrado"
      });
    }
    res.json({
      success: true,
      data: deletedInmueble,
      message: "Inmueble eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
};

module.exports = {
  getInmuebles,
  getInmueble,
  createInmueble,
  updateInmueble,
  deleteInmueble
};
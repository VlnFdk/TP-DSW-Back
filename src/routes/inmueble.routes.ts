import express, {Router} from "express";
import * as inmuebleController from "../controllers/inmueble.controller";

const router: Router = express.Router();

//GET /inmuebles - Obtener todos los inmuebles
router.get("/", inmuebleController.getAllInmuebles);

//GET /inmuebles/:id - Obtener un inmueble por ID
router.get("/:id", inmuebleController.getInmueble);

//POST /inmuebles - Crear un nuevo inmueble
router.post("/", inmuebleController.createInmueble);

//PUT /inmuebles/:id - Actualizar un inmueble por existente por ID
router.put("/:id", inmuebleController.updateInmueble);

//DELETE /inmuebles/:id - Eliminar un inmueble por ID
router.delete("/:id", inmuebleController.deleteInmueble);

export default router;
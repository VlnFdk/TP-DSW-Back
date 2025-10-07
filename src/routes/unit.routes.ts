import express, { Router } from "express";
import { UnitController } from "../controllers/unit/unit.controller";

const router:Router = express.Router();

//GET /inmuebles - Obtener todos los inmuebles
router.get("/", (req, res) => new UnitController().getAllUnits(req, res));

//GET /inmuebles/:id - Obtener un inmueble por ID
router.get("/:id", (req, res) => new UnitController().getUnitById(req, res));

//POST /inmuebles - Crear un nuevo inmueble
router.post("/", (req, res) => new UnitController().createUnit(req, res));

//PUT /inmuebles/:id - Actualizar un inmueble por existente por ID
router.put("/:id", (req, res) => new UnitController().updateUnit(req, res));

//DELETE /inmuebles/:id - Eliminar un inmueble por ID
router.delete("/:id", (req, res) => new UnitController().deleteUnit(req, res));

export default router;
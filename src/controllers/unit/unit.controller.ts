import { unitService } from "../../services/unit.service";
import { Request, Response } from "express";

export class UnitController {

    unitService:unitService;

    constructor() {
        this.unitService = new unitService();
    }

    public async getAllUnits(_req:Request, res:Response) {

        try {
            const units = await this.unitService.getAllUnits();
            if (units.length > 0) {
                res.status(200).json(units);
            } else {
                res.status(404).json({ message: "No units found" });
            }
        } catch (error) {
            console.error("Error fetching units:", error);
        }
    }

    public async getUnitById(req:Request, res:Response) {

        const id = parseInt(req.params['id'] as string);

        try {
            const unit = await this.unitService.getUnitById(id);
            if (unit) {
                res.status(200).json(unit);
            } else {
                res.status(404).json({ message: "Unit not found" });
            }
        } catch (error) {
            console.error("Error fetching unit by ID:", error);
        }
    }

    public async createUnit(req:Request, res:Response) {

        const newUnit = req.body;

        try {
            const createdUnit = await this.unitService.createUnit(newUnit);
            res.status(200).json(createdUnit);
        } catch (error) {
            console.error("Error creating unit:", error);
        }
    }

    public async updateUnit(req:Request, res:Response) {

        const id = parseInt(req.params['id'] as string);
        const unitData = req.body;

        try {
            const updatedUnit = await this.unitService.updateUnit(id, unitData);
            if (updatedUnit) {
                res.status(200).json(updatedUnit);
            } else {
                res.status(404).json({ message: "Unit not found" });
            }
        } catch (error) {
                console.error("Error updating unit:", error);
        }
    }

    public async deleteUnit(req:Request, res:Response) {

        const id = parseInt(req.params['id'] as string);

        try {
            const deletedUnit = await this.unitService.deleteUnit(id);
            if (deletedUnit) {
                res.status(200).json({ message: "Unit deleted successfully" });
            } else {
                res.status(404).json({ message: "Unit not found" });
            }
        } catch (error) {
            console.error("Error deleting unit:", error);
        }
    }


}
import { Request, Response } from "express";
import * as inmuebleService from "../services/inmueble.service";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    total?: number;
}

export const getAllInmuebles = async (req: Request, res: Response): Promise<void> => {

    try {
        const inmuebles = await inmuebleService.getAllInmuebles();
        const response: ApiResponse<typeof inmuebles> = {
            success: true,
            data: inmuebles,
            total: inmuebles.length
        };
        res.json(response);

    } catch (error) {
        console.error("Error en getAllInmuebles", error);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor"
        });
    }
};

export const getInmueble = async (req: Request, res: Response): Promise<void> => {

    try {
        const inmueble = inmuebleService.getInmuebleById(parseInt(req.params['id'] as string));
        if (!inmueble) {
            res.status(404).json({
                success: false,
                error: "Inmueble no encontrado"
            });
            return;
        }
        res.json({
            success: true,
            data: inmueble
        });
    } catch (error) {
        console.error("Error en getInmueble", error);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor"
        });
    }    
}



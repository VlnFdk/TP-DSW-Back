import { Request, Response } from "express";
import * as inmuebleService from "../services/inmueble.service";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    total?: number;
}

export const getAllInmuebles = async (_req: Request, res: Response): Promise<void> => {
// se utiliza _req para evitar el error de variable no utilizada
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

export const createInmueble = async (req: Request, res: Response): Promise<void> => {
    try {
        const {direccion, cant_ambientes, orientacion} = req.body;

        if (!direccion) {
            res.status(400).json({
                success: false,
                error: "La dirección es requerida"
            });
            return;
        }
        if (typeof cant_ambientes !== 'number' || cant_ambientes <= 0 || !cant_ambientes) {
            res.status(400).json({
                success: false,
                error: "La cantidad de ambientes es requerida, debe ser un número positivo"
            });
            return;
        }
        if (!orientacion) {
            res.status(400).json({
                success: false,
                error: "La orientación es requerida"
            });
            return;
        }
    
    const newInmueble = await inmuebleService.createInmueble(req.body);
    res.status(201).json({
        success: true,
        data: newInmueble,
        message: "Inmueble creado exitosamente"
        });
    } catch (error: any) {
        console.error("Error en createInmueble", error);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor"
        });
    }
};

export const updateInmueble = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedInmueble = await inmuebleService.updateInmueble(parseInt(req.params['id'] as string), req.body);
        if (!updatedInmueble) {
            res.status(404).json({
                success: false,
                error: "Inmueble no encontrado"
            });
            return;
        }
        res.json({
            success: true,
            data: updatedInmueble,
            message: "Inmueble actualizado exitosamente"
        });
    } catch (error: any) {
        console.error("Error en updateInmueble", error);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor"
        });
    }
};

export const deleteInmueble = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedInmueble = await inmuebleService.deleteInmueble(parseInt(req.params['id'] as string));
        if (!deletedInmueble) {
            res.status(404).json({
                success: false,
                error: "Inmueble no encontrado"
            });
            return;
        }
        res.json({
            success: true,
            message: "Inmueble eliminado exitosamente"
        });
    } catch (error: any) {
        console.error("Error en deleteInmueble", error);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor"
        });
    }
};
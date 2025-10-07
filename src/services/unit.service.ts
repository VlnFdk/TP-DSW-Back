import { Unit } from '../models/unit.entity.js';   
import { UnitRepository } from '../repositories/unit.dao.js';


// REVISAR EL USO DE INTERFACES

/*interface CreateUnitData {
    id: number;
    unitNumber: string;
    sqm: number;
    description: string;
    coOnwership: number;
    rooms: number;
    capacity: number;
}

interface UpdateUnitData {
    unitNumber?: string;
    sqm?: number;
    description?: string;
    coOnwership?: number;
    rooms?: number;
    capacity?: number;
}
*/


export class unitService {
    unitRepo:UnitRepository = new UnitRepository();

    public async getAllUnits(): Promise<Unit[]> {
        return this.unitRepo.getAllUnits();
    }

    public async getUnitById(id: number): Promise<Unit | null> {
        return this.unitRepo.getUnitById(id);
    }

    public async createUnit(newUnitData:Unit): Promise<Unit> {
        return this.unitRepo.createUnit(newUnitData);
    }

    public async updateUnit(id:number, unitData:Partial<Unit>): Promise<Unit | null> {
        return this.unitRepo.updateUnit(id, unitData);
    }

    public async deleteUnit(id:number): Promise<Unit | null> {
        return this.unitRepo.deleteUnit(id);
    }


}
import DatabaseManager from '../database/DataBaseManager.js';
import { Repository,  } from 'typeorm';
import { Unit } from '../models/unit.entity.js';   

export class UnitRepository {
    private _unitRepo:Repository<Unit>;

    constructor() {
        const dbManager = DatabaseManager.getInstance();
        const db = dbManager.getDataSource();

        this._unitRepo = db.getRepository(Unit);
    }

    public async getUnitById(id: number): Promise<Unit | null> {
    return await this._unitRepo.findOneBy({ id });
    };

    public async getAllUnits(): Promise<Unit[]> {
    return this._unitRepo.find();
    };

    public async createUnit(newUnit:Unit): Promise<Unit>{
        try { return await this._unitRepo.save(newUnit);
        } catch (error) {
        throw new Error(`Error creating unit: ${error}`);
        };
    };

    public async updateUnit(id:number, Unit:Partial<Unit>): Promise<Unit | null> {
        try { const existingUnit = await this._unitRepo.findOneBy({ id });
        if (!existingUnit) {
            return null;
        }
        
        await this._unitRepo.update(id, Unit);

        return this._unitRepo.findOneBy({ id });

        } catch (error) {
            throw new Error(`Error finding unit: ${error}`);
        }
        
    }

    public async deleteUnit(id:number): Promise<Unit | null> {

        try { const existingUnit = await this._unitRepo.findOneBy({ id });
        if (!existingUnit) {
            return null;
        }

        await this._unitRepo.remove(existingUnit);

        return existingUnit;

        } catch (error) {
            throw new Error(`Error finding unit: ${error}`);
        }
    }

}
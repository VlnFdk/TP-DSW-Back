import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UnitType {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({type: 'varchar', length: 255})
    public name!: string;

    constructor(name: string) {
        this.name = name;
    }
}
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { usrUnit } from "./usr_unit.entity";


@Entity()
export class Unit {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public unitNumber!: string;

    @Column({type: 'float'})
    public sqm!: number;

    @Column({type: 'varchar', nullable: true})
    public description!: string;

    @Column({type: 'float', nullable: true})
    public coOnwership!: number;

    @Column({type : 'int', nullable: true})
    public rooms!: number;

    @Column({type: 'int', nullable: true})
    public capacity!: number;

    @OneToMany(() => usrUnit, (usrUnit) => usrUnit.unit)
    users!: usrUnit[];

    constructor(unitNumber: string, sqm: number, description: string, coOnwership: number, rooms: number, capacity: number) {
        this.unitNumber = unitNumber;
        this.sqm = sqm;
        this.description = description;
        this.coOnwership = coOnwership;
        this.rooms = rooms;
        this.capacity = capacity;
    }

}
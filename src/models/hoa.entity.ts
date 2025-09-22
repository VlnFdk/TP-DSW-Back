import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Hoa {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public cuit!: string;

    @Column({type: 'varchar', length: 255})
    public name!: string;

    @Column()
    public address!: string;

    @CreateDateColumn({type: 'timestamp'})
    public creationTimestamp!: Date;

    @DeleteDateColumn({type: 'timestamp', nullable: true})
    public deleteTimestamp!: Date | undefined;

    @OneToMany(() => Employee, (Employee) => Employee.hoa)
    users!: Employee[];

    constructor(cuit: string, name: string, address: string, creationTimestamp: Date, deleteTimestamp: Date | undefined) {
        this.cuit = cuit;
        this.name = name;
        this.address = address;
        this.creationTimestamp = creationTimestamp;
        this.deleteTimestamp = deleteTimestamp; 
    }

}
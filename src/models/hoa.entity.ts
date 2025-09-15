import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from "typeorm";


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

    @CreateDateColumn()
    public creation_timestamp!: Date;

    @DeleteDateColumn({type: 'timestamp', nullable: true})
    public delete_timestamp!: Date | undefined;

    constructor(cuit: string, name: string, address: string, creation_timestamp: Date, delete_timestamp: Date) {
        this.cuit = cuit;
        this.name = name;
        this.address = address;
        this.creation_timestamp = creation_timestamp;
        this.delete_timestamp = delete_timestamp; 
    }

}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Locality {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public province!: string;

    constructor(name: string, province: string) {
        this.name = name;
        this.province = province;
    }
}
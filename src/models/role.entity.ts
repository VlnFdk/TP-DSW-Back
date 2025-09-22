import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { usrRole } from "./usr_role.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({type: 'varchar', length: 255})
    public name!: string;

    @OneToMany(() => usrRole, (usrRole) => usrRole.role)
    users!: usrRole[];

    constructor(name: string) {
        this.name = name;
    }
}
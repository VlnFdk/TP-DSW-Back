import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { usrUnit } from "./usr_unit.entity";
import { Employee } from "./employee.entity";
import { usrRole } from "./usr_role.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({type: 'varchar'})
    public name!: string;

    @Column({type: 'varchar'})
    public surname!: string;

    @Column({type: 'varchar', length: 255})
    public email!: string;

    @Column({type: 'timestamp'})
    public birthDate!: Date;

    @CreateDateColumn({type: 'timestamp'})
    public creationTimestamp!: Date;

    @DeleteDateColumn({type: 'timestamp', nullable: true})
    public deleteTimestamp!: Date | undefined;

    @Column({type: 'boolean'})
    public status!: boolean;

    @OneToMany(() => usrUnit, (usrUnit) => usrUnit.user)
    units!: usrUnit[];

    @OneToMany(() => Employee, (employee) => employee.user)
    hoas!: Employee[];

    @OneToMany(() => usrRole, (usrRole) => usrRole.user)
    roles!: usrRole[];

    constructor(name: string, surname: string, email: string, birthDate: Date, creationTimestamp: Date, deleteTimestamp: Date, status: boolean) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.birthDate = birthDate;
        this.creationTimestamp = creationTimestamp;
        this.deleteTimestamp = deleteTimestamp; 
        this.status = status;
    }
}
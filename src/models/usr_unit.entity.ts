import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Unit } from "./unit.entity";



@Entity()
export class usrUnit {
    @PrimaryColumn({name: 'userId'})
    public userId!: number;

    @PrimaryColumn({name: 'unitId'})
    public unitId!: number;

    @PrimaryColumn({type: 'timestamp'})
    public beginTimestamp!: Date;

    @Column({type: 'timestamp', nullable: true})
    public endTimestamp!: Date | undefined;

    @ManyToOne(() => User, (user) => user.units, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    user!: User;

    @ManyToOne(() => Unit, (unit) => unit.users, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'unitId'})
    unit!: Unit;

    constructor(user: User, unit: Unit, beginTimestamp: Date, endTimestamp: Date | undefined) {
        this.user = user;
        this.unit = unit;
        this.beginTimestamp = beginTimestamp;
        this.endTimestamp = endTimestamp;
    }
}
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Hoa } from "./hoa.entity";

@Entity()
export class Employee {
    @PrimaryColumn({name: 'userId'})
    public userId!: number;

    @PrimaryColumn({name: 'hoaId'})
    public hoaId!: number;

    @PrimaryColumn({type: 'timestamp'})
    public beginTimestamp!: Date;

    @Column({type: 'timestamp', nullable: true})
    public endTimestamp!: Date | undefined;

    @ManyToOne(() => User, (user) => user.hoas, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    user!: User;

    @ManyToOne(() => Hoa, (hoa) => hoa.users, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'hoaId'})
    hoa!: Hoa;

    constructor(user: User, hoa: Hoa, beginTimestamp: Date, endTimestamp: Date | undefined) {
        this.user = user;
        this.hoa = hoa;
        this.beginTimestamp = beginTimestamp;
        this.endTimestamp = endTimestamp;
    }
}
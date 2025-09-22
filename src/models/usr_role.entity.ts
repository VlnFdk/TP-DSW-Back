import { Entity, ManyToOne, PrimaryColumn, JoinColumn} from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role.entity";


@Entity()
export class usrRole {
    @PrimaryColumn({name: 'userId'})
    public userId!: number;
    
    @PrimaryColumn({name: 'roleId'})
    public roleId!: number;

    @PrimaryColumn({type: 'timestamp'})
    public roleTimestamp!: Date;

    @ManyToOne(() => User, (user) => user.roles, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    user!: User;

    @ManyToOne(() => Role, (role) => role.users, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'roleId'})
    role!: Role;

    constructor(user: User, role: Role, roleTimestamp: Date) {
        this.user = user;
        this.role = role;
        this.roleTimestamp = roleTimestamp;
    }
}
import { DataSource } from "typeorm"
import { Unit } from "../models/unit.entity";
import { Employee } from "../models/employee.entity";
import { Hoa } from "../models/hoa.entity";
import { Locality } from "../models/locality.entity";
import { Role } from "../models/role.entity";
import { UnitType } from "../models/unitType.entity";
import { User } from "../models/user.entity";
import { usrRole } from "../models/usr_role.entity";
import { usrUnit } from "../models/usr_unit.entity";


require('dotenv').config({path: 'src/config/.env'}); 


const dbconfig = new DataSource({
    type: 'mysql',
    host: process.env['HOST_ENV'] as string,
    port: Number(process.env['PORT_ENV']),
    username: process.env['USER_ENV'] as string,
    password: process.env['PASSWORD_ENV'] as string,
    database: process.env['BDNAME_ENV'] as string,
    logging: true,
    entities: [
        Unit, 
        Employee, 
        Hoa, 
        Locality, 
        Role, 
        UnitType, 
        User, 
        usrRole, 
        usrUnit
    ],
    synchronize: true // SEGUN DOCUMENTACION, NO SE RECOMIENDA PARA PRODUCCION, SOLAMENTE DESARROLLO. PERMITE CREAR LA BD SI NO EXISTE.
});

export default dbconfig;
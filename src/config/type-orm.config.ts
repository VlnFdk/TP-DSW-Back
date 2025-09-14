import { DataSource } from "typeorm"
import { Inmueble } from "../models/Inmueble.js";


require('dotenv').config({path: 'src/config/.env'}); 


const dbconfig = new DataSource({
    type: 'mysql',
    host: process.env['HOST_ENV'] as string,
    port: Number(process.env['PORT_ENV']),
    username: process.env['USER_ENV'] as string,
    password: process.env['PASSWORD_ENV'] as string,
    database: process.env['BDNAME_ENV'] as string,
    logging: true,
    entities: [Inmueble],
    synchronize: true // SEGUN DOCUMENTACION, NO SE RECOMIENDA PARA PRODUCCION, SOLAMENTE DESARROLLO. PERMITE CREAR LA BD SI NO EXISTE.
});

export default dbconfig;
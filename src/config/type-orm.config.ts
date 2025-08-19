import { DataSource } from "typeorm"
import { Inmueble } from "../entities/Inmueble.js";

const dbconfig = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "api-express",
    entities: [Inmueble],
    synchronize: true // SEGUN DOCUMENTACION, NO SE RECOMIENDA PARA PRODUCCION, SOLAMENTE DESARROLLO. PERMITE CREAR LA BD SI NO EXISTE.
});

export default dbconfig;
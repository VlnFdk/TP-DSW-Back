import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Inmueble {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column()
    direccion!: string;
  
    @Column()
    cant_ambientes!: number;

    @Column()
    orientacion!: string;

    constructor(direccion: string, cant_ambientes: number, orientacion: string) {
        this.direccion = direccion;
        this.cant_ambientes = cant_ambientes;
        this.orientacion = orientacion;
    }

}

// REVISAR SI HAY QUE AGREAGAR UN CONSTRUCTOR. TAMBIEN REVISAR ATRIBUTOS DE LA CLASE.
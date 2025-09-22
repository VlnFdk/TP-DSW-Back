import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Inmueble {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column()
    direccion!: string;
  
    @Column()
    cantAmbientes!: number;

    @Column()
    orientacion!: string;

    constructor(direccion: string, cantAmbientes: number, orientacion: string) {
        this.direccion = direccion;
        this.cantAmbientes = cantAmbientes;
        this.orientacion = orientacion;
    }

}

// REVISAR SI HAY QUE AGREAGAR UN CONSTRUCTOR. TAMBIEN REVISAR ATRIBUTOS DE LA CLASE.
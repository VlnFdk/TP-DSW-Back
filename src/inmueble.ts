import crypto from 'node:crypto'

export class Inmueble {
  constructor(
    public direccion: string,
    public cant_ambientes: number,
    public orientacion: string,
    public descripcion: string,
    public id = crypto.randomUUID()
  ) {}
}
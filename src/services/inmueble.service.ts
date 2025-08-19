import DatabaseManager from "../database/DataBaseManager.js";
import { Inmueble } from "../entities/Inmueble.js";

interface CreateInmuebleData {
	direccion: string;
	cant_ambientes: number;
	orientacion: string;
  	descripcion: string;
}

interface UpdateInmuebleData {
  	direccion?: string;
  	cant_ambientes?: number;
  	orientacion?: string;
  	descripcion?: string;
}

const dbManager = DatabaseManager.getInstance();

export const getAllInmuebles = async (): Promise<Inmueble[]> => {
  	const db = dbManager.getDataSource();
  	return db.getRepository(Inmueble).find();
};

export const getInmuebleById = async (id: number): Promise<Inmueble | null> => {
  	const db = dbManager.getDataSource();
  	const inmuebleRepo = db.getRepository(Inmueble);
  	return await inmuebleRepo.findOneBy({ id });
};

export const createInmueble = async (inmuebleData: CreateInmuebleData): Promise<Inmueble> => {

	// Validación básica
  	if (!inmuebleData.direccion || !inmuebleData.cant_ambientes || !inmuebleData.orientacion) {
    	throw new Error('Direccion, cantidad de ambientes y orientacion son requeridos');
  	}

	const db = dbManager.getDataSource();
	const inmuebleRepo = db.getRepository(Inmueble);

	// AGREGAR VALIDACION DE QUE LA DIRECCION NO EXISTA. POSIBLEMENTE HAYA QUE MODIFICAR EL ATRIBUTO DE LA CLASE.


	// Crea nuevo inmueble
	const newInmueble = new Inmueble(inmuebleData.direccion, inmuebleData.cant_ambientes, inmuebleData.orientacion);

	// Persistir en base de datos
	await inmuebleRepo.save(newInmueble);

	return newInmueble;
};

export const updateInmueble = async (id: number, inmuebleData: UpdateInmuebleData): Promise<Inmueble | null> => {

	const db = dbManager.getDataSource();
	const inmuebleRepo = db.getRepository(Inmueble);

	const inmueble = await inmuebleRepo.findOneBy({ id });
	if (!inmueble) {
		return null; 
	}

	// Actualizamos los campos proporcionados
	if (inmuebleData.direccion !== undefined) {
		inmueble.direccion = inmuebleData.direccion;
	}

	if (inmuebleData.cant_ambientes !== undefined) {
		inmueble.cant_ambientes = inmuebleData.cant_ambientes;
	}

	if (inmuebleData.orientacion !== undefined) {
		inmueble.orientacion = inmuebleData.orientacion;
	}

	await inmuebleRepo.save(inmueble);
	
	return inmueble;
}


export const deleteInmueble = async (id: number): Promise<Inmueble | null> => {

	const db = dbManager.getDataSource();
	const inmuebleRepo = db.getRepository(Inmueble);

	const inmueble = await inmuebleRepo.findOneBy({ id });
	if (!inmueble) {
		return null; 
	}

	await inmuebleRepo.remove(inmueble);
	
	return inmueble;
}


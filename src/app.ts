import 'reflect-metadata';
import express , {Request, Response, NextFunction} from 'express';
import DatabaseManager from './database/DataBaseManager.js';
import inmuebleRoutes from './routes/inmueble.routes.js';

const app = express();
const dbManager = DatabaseManager.getInstance();

// Middleware de logger
const logger = (req: Request, _res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

// Middleware para parsear JSON
app.use(express.json());

// Middleware de logger
app.use(logger);

const PORT = 3000;

// Función para inicializar la aplicación
const initializeApp = async (): Promise<void> => {
    try {
        // Inicializar la base de datos
        const orm = await dbManager.initialize();

        // Middleware para hacer disponible la conexión a la BD en las rutas
        app.use((req: Request, _res: Response, next: NextFunction) => {
            (req.app.locals as { db: any }).db = orm;
            next();
        });

        // Configurar rutas después de inicializar la BD
        app.use('/inmuebles', inmuebleRoutes);

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
        } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        process.exit(1);
  }
};

// Manejar el cierre graceful de la aplicación
process.on('SIGINT', async () => {
  console.log('Cerrando la aplicación...');
  await dbManager.close();
  process.exit(0);
});

// Inicializar la aplicación
initializeApp();

export default app;
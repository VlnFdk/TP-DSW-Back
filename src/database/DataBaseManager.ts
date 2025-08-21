import { DataSource } from "typeorm";
import dbconfig from '../config/type-orm.config.js';

class DatabaseManager {
  private static instance: DatabaseManager;
  private dataSource: DataSource | null = null;

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async initialize(): Promise<DataSource> {
    if (!this.dataSource) {
      console.log("Conectando a la base de datos...");

      this.dataSource = dbconfig;
      await this.dataSource.initialize();

      console.log("Conexión a la base de datos establecida");
    }
    return this.dataSource;
  }

  public getDataSource(): DataSource {
    if (!this.dataSource) {
      throw new Error("Database not initialized. Call initialize() first.");
    }
    return this.dataSource;
  }

  public async close(): Promise<void> {
    if (this.dataSource && this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      this.dataSource = null;
    }
  }
}

export default DatabaseManager;

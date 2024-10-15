import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  private db: SQLiteDBConnection | undefined;

  constructor() {}

  // Abrir la base de datos
  async openDatabase() {
    try {
      this.db = await CapacitorSQLite.createConnection({
        database: 'Gestion_Proyecto',
        version: 1,
        encrypted: false,
        mode: 'no-encryption',
        readonly: false
      });
      await this.db.open();
    } catch (error) {
      console.error('Error abriendo la base de datos', error);
    }
  }

  // Crear todas las tablas
  async createTables() {
    if (this.db) {
      const queries = [
        // Tabla de usuarios
        `CREATE TABLE IF NOT EXISTS usuarios (
          id TEXT PRIMARY KEY,
          nombres TEXT NOT NULL,
          apellidos TEXT NOT NULL,
          correo TEXT NOT NULL,
          password TEXT,
          cliente_id INTEGER,
          FOREIGN KEY(cliente_id) REFERENCES clientes(id)
        );`,

        // Tabla de clientes
        `CREATE TABLE IF NOT EXISTS clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          direccion TEXT NOT NULL,
          telefono TEXT,
          correo TEXT NOT NULL,
          logo TEXT
        );`,

        // Tabla de proyectos
        `CREATE TABLE IF NOT EXISTS proyectos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre_proyecto TEXT NOT NULL,
          descripcion TEXT,
          fecha_inicio TEXT,
          fecha_fin TEXT,
          estado TEXT,
          responsable INTEGER NOT NULL,
          cliente_id INTEGER NOT NULL,
          FOREIGN KEY(cliente_id) REFERENCES clientes(id),
          FOREIGN KEY(responsable) REFERENCES usuarios(id)
        );`,

        // Tabla de tareas
        `CREATE TABLE IF NOT EXISTS tareas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          proyecto_id INTEGER NOT NULL,
          tarea TEXT NOT NULL,
          descripcion TEXT,
          responsable TEXT,
          fecha_inicio TEXT,
          fecha_fin TEXT,
          estado TEXT,
          FOREIGN KEY(proyecto_id) REFERENCES proyectos(id)
        );`,

        // Tabla de autorizaciones
        `CREATE TABLE IF NOT EXISTS autorizacion (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre_autorizacion TEXT NOT NULL,
          accion TEXT NOT NULL
        );`,

        // Tabla de relaciones entre usuarios y autorizaciones
        `CREATE TABLE IF NOT EXISTS usuario_autorizacion (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id TEXT NOT NULL,
          autorizacion_id INTEGER NOT NULL,
          FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
          FOREIGN KEY(autorizacion_id) REFERENCES autorizacion(id)
        );`
      ];

      try {
        for (const query of queries) {
          await this.db.execute(query);
        }
        console.log('Todas las tablas fueron creadas correctamente.');
      } catch (error) {
        console.error('Error creando las tablas', error);
      }
    }
  }

  // Insertar una nueva autorización
  async insertAutorizacion(nombre_autorizacion: string, accion: string) {
    if (this.db) {
      const query = `INSERT INTO autorizacion (nombre_autorizacion, accion) VALUES (?, ?)`;
      try {
        const result = await this.db.run(query, [nombre_autorizacion, accion]);
        console.log('Autorización insertada con ID:', result.changes.lastId);
      } catch (error) {
        console.error('Error insertando autorización', error);
      }
    }
  }

  // Obtener todas las autorizaciones
  async getAutorizaciones() {
    if (this.db) {
      const query = `SELECT * FROM autorizacion`;
      try {
        const result = await this.db.query(query);
        return result.values;
      } catch (error) {
        console.error('Error obteniendo autorizaciones', error);
        return [];
      }
    }
  }

  // Insertar nuevo usuario
  async insertUsuario(id: string, nombres: string, apellidos: string, correo: string, password: string, cliente_id: number) {
    if (this.db) {
      const query = `INSERT INTO usuarios (id, nombres, apellidos, correo, password, cliente_id) VALUES (?, ?, ?, ?, ?, ?)`;
      try {
        await this.db.run(query, [id, nombres, apellidos, correo, password, cliente_id]);
        console.log('Usuario insertado correctamente.');
      } catch (error) {
        console.error('Error insertando usuario', error);
      }
    }
  }

  // Obtener todos los usuarios
  async getUsuarios() {
    if (this.db) {
      const query = `SELECT * FROM usuarios`;
      try {
        const result = await this.db.query(query);
        return result.values;
      } catch (error) {
        console.error('Error obteniendo usuarios', error);
        return [];
      }
    }
  }

  // Eliminar autorización por ID
  async deleteAutorizacion(id: number) {
    if (this.db) {
      const query = `DELETE FROM autorizacion WHERE id = ?`;
      try {
        await this.db.run(query, [id]);
        console.log('Autorización eliminada');
      } catch (error) {
        console.error('Error eliminando autorización', error);
      }
    }
  }

  // Cerrar la conexión con la base de datos
  async closeConnection() {
    if (this.db) {
      await this.db.close();
      this.db = undefined;
    }
  }
}

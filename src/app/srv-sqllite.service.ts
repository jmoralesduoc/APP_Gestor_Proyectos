import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  private db: SQLiteObject | undefined;

  constructor(private sqlite: SQLite) {}

  // Abrir la base de datos
  openDatabase(): Observable<void> {
    return new Observable((observer) => {
      if (this.db) {
        console.warn('La base de datos ya está abierta.');
        observer.next();
        observer.complete();
        return;
      }

      this.sqlite.create({
        name: 'Gestion_Proyecto.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.db = db;
        console.log('Base de datos abierta correctamente');
        observer.next();
        observer.complete();
      }).catch((error) => {
        console.error('Error abriendo la base de datos:', error);
        observer.error(error);
      });
    });
  }

  // Crear todas las tablas
  createTables(): Observable<void> {
    return new Observable((observer) => {
      if (!this.db) {
        console.error('No hay conexión abierta a la base de datos.');
        observer.error('No hay conexión abierta a la base de datos.');
        return;
      }

      const queries = [
        `CREATE TABLE IF NOT EXISTS usuarios (
          id TEXT PRIMARY KEY, 
          nombres TEXT NOT NULL, 
          apellidos TEXT NOT NULL, 
          correo TEXT NOT NULL, 
          password TEXT, 
          cliente_id INTEGER, 
          FOREIGN KEY(cliente_id) REFERENCES clientes(id)
        );`,
        `CREATE TABLE IF NOT EXISTS clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          nombre TEXT NOT NULL, 
          direccion TEXT NOT NULL, 
          telefono TEXT, 
          correo TEXT NOT NULL, 
          logo TEXT
        );`,
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
        `CREATE TABLE IF NOT EXISTS autorizacion (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          nombre_autorizacion TEXT NOT NULL, 
          accion TEXT NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS usuario_autorizacion (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          usuario_id TEXT NOT NULL, 
          autorizacion_id INTEGER NOT NULL, 
          FOREIGN KEY(usuario_id) REFERENCES usuarios(id), 
          FOREIGN KEY(autorizacion_id) REFERENCES autorizacion(id)
        );`
      ];

      // Usamos el método `map` para crear un array de Observables y luego `forkJoin` para manejarlos
      const createTableObservables = queries.map(query => {
        return from(this.db!.executeSql(query, [])); // Añadido el operador `!` para garantizar que `this.db` no es undefined
      });

      Promise.all(createTableObservables)
        .then(() => {
          console.log('Todas las tablas fueron creadas correctamente.');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error creando las tablas:', error);
          observer.error(error);
        });
    });
  }

  // Insertar una nueva autorización
  insertAutorizacion(nombre_autorizacion: string, accion: string): Observable<void> {
    return new Observable((observer) => {
      if (!this.db) {
        console.error('No hay conexión abierta a la base de datos.');
        observer.error('No hay conexión abierta a la base de datos.');
        return;
      }

      const query = `INSERT INTO autorizacion (nombre_autorizacion, accion) VALUES (?, ?)`;
      this.db.executeSql(query, [nombre_autorizacion, accion]).then((result) => {
        if (result.rowsAffected > 0) {
          console.log('Autorización insertada con éxito.');
          observer.next();
        } else {
          console.warn('No se pudo insertar la autorización.');
          observer.error('No se pudo insertar la autorización.');
        }
        observer.complete();
      }).catch((error) => {
        console.error('Error insertando autorización:', error);
        observer.error(error);
      });
    });
  }

  // Obtener todas las autorizaciones
  getAutorizaciones(): Observable<any[]> {
    return new Observable((observer) => {
      if (!this.db) {
        console.error('No hay conexión abierta a la base de datos.');
        observer.error('No hay conexión abierta a la base de datos.');
        return;
      }

      const query = `SELECT * FROM autorizacion`;
      this.db.executeSql(query, []).then((result) => {
        const autorizaciones = [];
        for (let i = 0; i < result.rows.length; i++) {
          autorizaciones.push(result.rows.item(i));
        }
        observer.next(autorizaciones);
        observer.complete();
      }).catch((error) => {
        console.error('Error obteniendo autorizaciones:', error);
        observer.error(error);
      });
    });
  }

  // Insertar nuevo usuario
  insertUsuario(id: string, nombres: string, apellidos: string, correo: string, password: string, cliente_id: number): Observable<void> {
    return new Observable((observer) => {
      if (!this.db) {
        console.error('No hay conexión abierta a la base de datos.');
        observer.error('No hay conexión abierta a la base de datos.');
        return;
      }

      const query = `INSERT INTO usuarios (id, nombres, apellidos, correo, password, cliente_id) VALUES (?, ?, ?, ?, ?, ?)`;
      this.db.executeSql(query, [id, nombres, apellidos, correo, password, cliente_id]).then((result) => {
        if (result.rowsAffected > 0) {
          console.log('Usuario insertado con éxito.');
          observer.next();
        } else {
          console.warn('No se pudo insertar el usuario.');
          observer.error('No se pudo insertar el usuario.');
        }
        observer.complete();
      }).catch((error) => {
        console.error('Error insertando usuario:', error);
        observer.error(error);
      });
    });
  }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    return new Observable((observer) => {
      if (!this.db) {
        console.error('No hay conexión abierta a la base de datos.');
        observer.error('No hay conexión abierta a la base de datos.');
        return;
      }

      const query = `SELECT * FROM usuarios`;
      this.db.executeSql(query, []).then((result) => {
        const usuarios = [];
        for (let i = 0; i < result.rows.length; i++) {
          usuarios.push(result.rows.item(i));
        }
        observer.next(usuarios);
        observer.complete();
      }).catch((error) => {
        console.error('Error obteniendo usuarios:', error);
        observer.error(error);
      });
    });
  }

  // Eliminar autorización por ID
  deleteAutorizacion(id: number): Observable<void> {
    return new Observable((observer) => {
      if (!this.db) {
        console.error('No hay conexión abierta a la base de datos.');
        observer.error('No hay conexión abierta a la base de datos.');
        return;
      }

      const query = `DELETE FROM autorizacion WHERE id = ?`;
      this.db.executeSql(query, [id]).then((result) => {
        if (result.rowsAffected > 0) {
          console.log('Autorización eliminada');
          observer.next();
        } else {
          console.warn('No se encontró la autorización para eliminar.');
          observer.error('No se encontró la autorización para eliminar.');
        }
        observer.complete();
      }).catch((error) => {
        console.error('Error eliminando autorización:', error);
        observer.error(error);
      });
    });
  }

  // Cerrar la conexión con la base de datos
  closeConnection(): Observable<void> {
    return new Observable((observer) => {
      if (this.db) {
        this.db = undefined;
        console.log('Conexión cerrada.');
        observer.next();
      } else {
        console.warn('No hay conexión abierta para cerrar.');
        observer.error('No hay conexión abierta para cerrar.');
      }
      observer.complete();
    });
  }
}

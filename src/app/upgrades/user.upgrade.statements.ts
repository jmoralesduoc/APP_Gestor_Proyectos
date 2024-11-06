export class UserUpgradeStatements {
  userUpgrades = [
    {
      toVersion: 1,
      statements: [
      /*  `CREATE TABLE IF NOT EXISTS users(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          active INTEGER DEFAULT 1
        );`*/
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



      ]
    },
    /* add new statements below for next database version when required*/
    /*
    {
      toVersion: 2,
      statements: [
        `ALTER TABLE users ADD COLUMN email TEXT;`,
      ]
    }
    */
  ]
}

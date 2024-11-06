import { Injectable } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection, CapacitorSQLitePlugin,
  capSQLiteUpgradeOptions, capSQLiteResult, capSQLiteValues} from '@capacitor-community/sqlite';

const DB_USERS = 'GestionProyectodb';

export interface User{
  id: number ;
  name: string;
  active: number;

}

@Injectable()


export class DatabaseService {


  sqliteConnection!: SQLiteConnection;
  isService: boolean = false;
  platform!: string;
  sqlitePlugin!: CapacitorSQLitePlugin;
  native: boolean = false;

  private sqlite:  SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  //private users: WritableSignal<User[]> = signal<User[]>([]);

 

    constructor() {
  }
  /**
   * Plugin Initialization
   */
  async initializePlugin(): Promise<boolean> {
        this.platform = Capacitor.getPlatform();
        if(this.platform === 'ios' || this.platform === 'android') this.native = true;
        this.sqlitePlugin = CapacitorSQLite;
        this.sqliteConnection = new SQLiteConnection(this.sqlitePlugin);
        this.isService = true;
        return true;
  }

  async openDatabase(dbName:string, encrypted: boolean, mode: string, version: number, readonly: boolean): Promise<SQLiteDBConnection> {
    let db: SQLiteDBConnection;
    const retCC = (await this.sqliteConnection.checkConnectionsConsistency()).result;
    let isConn = (await this.sqliteConnection.isConnection(dbName, readonly)).result;
    if(retCC && isConn) {
      db = await this.sqliteConnection.retrieveConnection(dbName, readonly);
    } else {
      db = await this.sqliteConnection
                .createConnection(dbName, encrypted, mode, version, readonly);
    }
    await db.open();
    return db;
  }

   /**  await this.db.open();

    const schema =  `CREATE TABLE IF NOT EXISTS users (
          id  INTEGER PRIMARY KEY AUTOINCRREMENT,
          name  TEXT NOT NULL,
          active INTEGER DEFAULT 1 );`;

    await this.db.execute(schema);
    this.loadUser();
    return true;

  }
*/

async retrieveConnection(dbName:string, readonly: boolean): Promise<SQLiteDBConnection> {
  return await this.sqliteConnection.retrieveConnection(dbName, readonly);
}
async closeConnection(database:string, readonly?: boolean): Promise<void> {
  const readOnly = readonly ? readonly : false;
  return await this.sqliteConnection.closeConnection(database, readOnly);
}
async addUpgradeStatement(options:capSQLiteUpgradeOptions): Promise<void> {
  await this.sqlitePlugin.addUpgradeStatement(options);
  return;
}
async saveToStore(database:string) : Promise<void> {
  return await this.sqliteConnection.saveToStore(database);
}
/*
  getUsers(){
    return this.users;
  }



//CRUD
async loadUser(){
  const user = await this.db.query('SELECT * FROM users;');
  this.users.set(user.values || []);

}

async addUser(name:string){
  const query = `INSERT INTO users (name) VALUES ('${name}')`
  const result = await this.db.query(query);

  this.loadUser();

  return result;
}


async updateUserById(id: string,active : number){
  const query = `UPDATE users SET active=${active} WHERE  id=${id}`;
  const result = await this.db.query(query);

  this.loadUser();

  return result;

}

async deleteUserByID(id: string){
  const query = `DELETE FROMO users WHERE id=${id}`;
  const result = await this.db.query(query);

this.loadUser();

return result;

}
*/
}

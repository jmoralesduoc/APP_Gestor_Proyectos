import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SQLiteService } from './srv-sqllite.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private useSQLite: boolean = false; // Bandera para indicar si se usa SQLite
  private jsonServerUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private sqliteService: SQLiteService) {
    this.checkJsonServerAvailability();
  }

  // Chequear si el JSON Server está disponible
  async checkJsonServerAvailability() {
    try {
      await this.http.get(`${this.jsonServerUrl}/autorizacion`).toPromise();
      this.useSQLite = false; // Si se puede conectar al servidor JSON, usamos este
      console.log('Usando JSON Server');
    } catch (error) {
      this.useSQLite = true; // Si hay un error, usamos SQLite
      await this.sqliteService.openDatabase();
      await this.sqliteService.createTables(); // Crear tablas si es necesario
      console.log('Usando SQLite');
    }
  }

  // Obtener Autorizaciones
  async getAutorizaciones() {
    if (this.useSQLite) {
      // Si usamos SQLite
      return await this.sqliteService.getAutorizaciones();
    } else {
      // Si usamos JSON Server
      return this.http.get(`${this.jsonServerUrl}/autorizacion`).pipe(
        catchError((error) => {
          console.error('Error obteniendo autorizaciones del JSON Server', error);
          return of([]); // Devolver un arreglo vacío en caso de error
        })
      );
    }
  }

  // Insertar nueva Autorización
  async insertAutorizacion(nombre_autorizacion: string, accion: string) {
    if (this.useSQLite) {
      return await this.sqliteService.insertAutorizacion(nombre_autorizacion, accion);
    } else {
      return this.http.post(`${this.jsonServerUrl}/autorizacion`, { nombre_autorizacion, accion }).pipe(
        catchError((error) => {
          console.error('Error insertando autorización en el JSON Server', error);
          return of(null);
        })
      );
    }
  }

  // Eliminar Autorización
  async deleteAutorizacion(id: number) {
    if (this.useSQLite) {
      return await this.sqliteService.deleteAutorizacion(id);
    } else {
      return this.http.delete(`${this.jsonServerUrl}/autorizacion/${id}`).pipe(
        catchError((error) => {
          console.error('Error eliminando autorización en el JSON Server', error);
          return of(null);
        })
      );
    }
  }
}

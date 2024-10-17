// src/app/srv-autorizacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SrvAutorizacionService {
  private apiUrl = 'http://localhost:3000/autorizacion'; // Cambia la URL a tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las autorizaciones
  getAutorizaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear una nueva autorización
  crearAutorizacion(data: { nombre_autorizacion: string; accion: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Modificar una autorización existente
  modificarAutorizacion(id: string, data: { nombre_autorizacion: string; accion: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar una autorización
  eliminarAutorizacion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

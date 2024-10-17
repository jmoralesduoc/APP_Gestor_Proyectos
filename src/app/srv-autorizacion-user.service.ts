import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SrvAutorizacionUserService {
  private apiUrl = 'http://localhost:3000/usuario_autorizacion'; // Cambia la URL a tu API

  constructor(private http: HttpClient) {}

  // Método para obtener autorización de usuario
  obtenerAutorizacionUsuario(iduser: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?usuario_id=${iduser}`);
  }

  // Método para crear una nueva autorización de usuario
  crearAutorizacionUsuario(autorizacionData: any): Observable<any> {
    return this.http.post(this.apiUrl, autorizacionData);
  }

  // Método para modificar una autorización de usuario existente
  modificarAutorizacionUsuario(id: string, autorizacionData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, autorizacionData);
  }

  // Método para eliminar una autorización de usuario
  eliminarAutorizacionUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SrvAsignarRolService {
  private baseUrl = 'https://67119e9a4eca2acdb5f53f65.mockapi.io/Gestion_proyecto'; // Cambia esto por la URL base de tu API

  constructor(private http: HttpClient) {}

  // Obtener usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios`);
  }

  // Obtener autorizaciones asignadas a usuarios
  getUsuarioAutorizaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario_autorizacion`);
  }

  // Asignar un rol (autorización) a un usuario
  asignarAutorizacion(data: { usuario_id: string; autorizacion_id: number }): Observable<any> {
    console.log('Datos recibidos en el servicio:', data); // Agregar log para debug
    return this.http.post<any>(`${this.baseUrl}/usuario_autorizacion`, data);
  }
  
  // Obtener lista de autorizaciones
  getAutorizaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/autorizacion`);
  }

  eliminarAutorizacion(data: { usuario_id: string; autorizacion_id: number }): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/usuario_autorizacion/${data.usuario_id}`
    );
  }
  
  
}

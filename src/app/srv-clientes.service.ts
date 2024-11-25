import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SrvClientesService {

  private baseUrl = 'https://67119e9a4eca2acdb5f53f65.mockapi.io/Gestion_proyecto'; // Cambia por la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cliente`);
  }

  // Actualizar un cliente
  updateCliente(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/cliente/${id}`, data);
  }

  // Eliminar un cliente
  deleteCliente(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/cliente/${id}`);
  }

  // Actualizar el logo
  updateLogo(id: string, logo: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/cliente/${id}`, { logo });
  }
  createCliente(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cliente`, data);
  }
}

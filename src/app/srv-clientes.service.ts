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
  asignarUsuario(cliente: any, usuarioId: string): Observable<any> {
    // Validar si `id_cliente` ya existe y agregar el nuevo usuario si no está
    const idClienteArray = cliente.id_cliente || []; // Si no existe, inicializar como un array vacío
  
    // Verificar si el usuarioId ya está en el array, si no, agregarlo
    if (!idClienteArray.includes(usuarioId)) {
      idClienteArray.push(usuarioId);
    }
  
    // Construcción del payload con el formato actualizado
    const payload = {
      id: cliente.id, // ID del cliente
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      correo: cliente.correo,
      logo: cliente.logo, // Esto podría ser null o un string base64
      id_cliente: idClienteArray, // Array actualizado con el nuevo usuarioId
    };
  
    // Usar PUT en lugar de POST
    return this.http.put<any>(`${this.baseUrl}/cliente/${cliente.id}`, payload);
  }
  
  getUsuarios() {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios`);
    
  }
  


}

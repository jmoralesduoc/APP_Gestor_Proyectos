import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios'; // Cambia la URL a tu API

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  // Método para obtener un usuario por su correo electrónico
  obtenerUsuarioPorCorreo(correo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?correo=${correo}`);
  }

  // Método para obtener el máximo cliente_id
  obtenerMaxClienteId(): Observable<any> {
    return this.http.get(`${this.apiUrl}`); // Obtiene todos los usuarios
  }
}

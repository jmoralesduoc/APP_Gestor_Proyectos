import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SrvAutorizacionService {
  private apiUrl = 'http://localhost:3000/usuario_autorizacion'; // Cambia la URL a tu API

  constructor(private http: HttpClient) {}

   // Método para obtener autorización de usuario
   obtenerAutorizacionUsuario(iduser: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?usuario_id=${iduser}`);
   
  }
}

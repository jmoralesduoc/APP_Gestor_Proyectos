import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  private baseUrl = 'https://67119e9a4eca2acdb5f53f65.mockapi.io/Gestion_proyecto'; // Cambia por tu URL base

  constructor(private http: HttpClient) {}


  // Obtener clientes
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cliente`);
  }

  // Obtener proyectos
  getProyectos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/proyectos`);
  }

  // Combinar clientes con proyectos
  getClientesConProyectos(): Observable<any[]> {
    return forkJoin({
      clientes: this.getClientes(),
      proyectos: this.getProyectos(),
    }).pipe(
      map(({ clientes, proyectos }) => {
        return clientes.map((cliente) => {
          const proyectosAsignados = proyectos.filter(
            (proyecto) => proyecto.cliente_id === cliente.id
          );
          return { ...cliente, proyectos: proyectosAsignados };
        });
      })
    );
  }




  // Crear un proyecto
  createProyecto(data: {
    nombre_proyecto: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin?: string | null;
    estado: string;
    responsable: number;
    cliente_id: number;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/proyectos`, data);
  }
}

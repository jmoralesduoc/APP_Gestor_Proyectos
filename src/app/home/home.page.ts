import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../api/ubicacion.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  location: { latitude: number, longitude: number } | null = null;

  constructor(private ubicacionService: UbicacionService) {}

  async ngOnInit() {
    // Obtén la ubicación al cargar el componente o al hacer clic en el botón
    this.location = await this.ubicacionService.getCurrentLocation();
    if (this.location) {
      console.log(`Latitud: ${this.location.latitude}, Longitud: ${this.location.longitude}`);
    }
  }

  // Método opcional si deseas recargar la ubicación
  async obtenerUbicacion() {
    this.location = await this.ubicacionService.getCurrentLocation();
  }
}

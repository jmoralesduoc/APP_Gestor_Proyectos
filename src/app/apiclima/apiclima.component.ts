import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apiclima',
  templateUrl: './apiclima.component.html',
  styleUrls: ['./apiclima.component.scss']
})
export class ApiclimaComponent implements OnInit {
  clima: any;
  error: string | null = null;

  // Reemplaza esta clave con tu clave API de OpenWeatherMap
  private readonly apiKey = 'e218fcd8ce30f2e7fdc8f0469ac264d8';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerClima();
  }

  obtenerClima(): void {
    // Cambia a las coordenadas o ubicación deseadas
    const lat = 35.6895; // Latitud de Tokio como ejemplo
    const lon = 139.6917; // Longitud de Tokio como ejemplo

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${this.apiKey}`;

    this.http.get(url).subscribe({
      next: (data) => {
        this.clima = data;
        this.error = null;
      },
      error: (err) => {
        console.error('Error al obtener datos del clima:', err);
        this.error = 'No se pudo obtener el clima. Intenta nuevamente.';
      }
    });
  }
}


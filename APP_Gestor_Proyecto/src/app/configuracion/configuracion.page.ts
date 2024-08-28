import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
    settings = {
      notifications: true,
      darkTheme: false,
    };
  
    toggleTheme() {
      // Lógica para cambiar el tema
    }
  
    logout() {
      // Lógica para cerrar sesión
    }


}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  name: string;
  email: string;
  password: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  onSubmit() {
    // Implementar la lógica de envío del formulario de registro.
  }

  goToLogin() {
    // Implementar la navegación a la página de inicio de sesión.
  }
  
  ngOnInit() {
  }

}
